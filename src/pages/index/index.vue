<template>
	<view class="content">
		<!-- 个人角色模块 -->
		<section class="personal-index">		
			<pageTop :istop="istop"></pageTop><!-- 轮播图 -->
			<view class="modules row just_btw" v-if="!istop && roleType == 1" ><!-- 快捷搜索 -->
				<view class="module column center"  v-for="(item, index) in module" :key="index" @click="toNext(item.text, index + 1)">
					<image :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view :class="{mounting: istop}" @touchmove.stop.prevent="moveHandle" v-if="roleType == 1"
			:style="{top: statusBarHeight + 10 + 'px'}">
				<view class="tabs row" id="tabs">
					<text class="tab" id="1" @click="changeTabs" :class="{active:tabs==1}">全部职位</text>
					<text class="tab" id="2" @click="changeTabs" :class="{active:tabs==2}">只看全职</text>
					<text class="tab" id="3" @click="changeTabs" :class="{active:tabs==3}">只看兼职</text>
					<!-- <view class="sliderBorder"
					:style="{transform: 12,left: sliderLeft + 'px'}"></view> -->
				</view>				
				<view class="types row ali_center">
					<text @click="chooseArea">{{district ? district.name : city.name}}<text class="iconfont">&#xe65a;</text></text>
					<text @click="chooseType" v-if="tabs != 1">{{post}}<text class="iconfont">&#xe65a;</text></text>
					<text class="border"></text>
				</view>
			</view>
			<view :class="{mounting: istop}" @touchmove.stop.prevent="moveHandle" 
			:style="{top: statusBarHeight + 10 + 'px'}" v-if="roleType == 2 && basic">
				<view class="tabs row" id="tabs">
					<text class="tab1" id="2" @click="changeTabs" :class="{active:tabs==2}">全职简历</text>
					<text class="tab1" id="3" @click="changeTabs" :class="{active:tabs==3}">兼职简历</text>
				</view>				
				<view class="types1 row ali_center just_arw">
					<text @click="chooseType">{{post}}<text class="iconfont">&#xe65a;</text></text>
					<picker @change="bindPickerEdu" :value="eduIndex" :range="basic.edu_level">
						<text v-if="eduIndex === ''">学历要求</text>
						<text>{{basic.edu_level[eduIndex]}}</text>	
						<text class="iconfont">&#xe65a;</text>
					</picker>
					<picker @change="bindPickerWork" :value="workIndex" :range="basic.work_exp">
						<text v-if="workIndex === ''">工作经验</text>
						<text>{{basic.work_exp[workIndex]}}</text>
						<text class="iconfont">&#xe65a;</text>
					</picker>
					<picker @change="bindPickerSalary" :value="salaryIndex" :range="basic.salary">
						<text v-if="salaryIndex === ''">薪资待遇</text>
						<text>{{basic.salary[salaryIndex]}}</text>
						<text class="iconfont">&#xe65a;</text>
					</picker>
				</view>
			</view>
			<view :class="{tt: istop}" :style="{marginTop: istop ? (statusBarHeight + 10 + 'px') : 0 }">
				<postList :list="postList" type="index" v-if="roleType==1"></postList><!-- 职位列表 -->	
				<resumeList :list="postList" v-if="roleType==2"></resumeList>
			</view>					
		</section>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import pageTop from './components/top'
	import postList from '@/components/postList'
	import resumeList from '@/components/resumeList'
	import { mapState } from 'vuex'
	const sliderWidth = 20;
	export default {
		data() {
			return {
				tabs: 1,
				top: '',
				istop: false,
				module: [{img: '/static/image/remen_icon.png',text: '热门职位'},{img: '/static/image/zuijin_icon.png',text: '离我最近'},{img: '/static/image/jizhao_icon.png',text: '急招岗位'},{img: '/static/image/zuixin_icon.png',text: '最新岗位'}],
				postList: [],
				showArea: false,
				showPost: false,
				post: '职位类型',
				sliderLeft: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,
				total: 1,
				currentPage: 1,
				area_id: '', // 区域code
				alias: '',
				category_id: '', // 职位id,
				resume: '职位筛选',
				edu: '学历要求',
				eduIndex: '',
				work: '工作经验',
				workIndex: '',
				salary: '薪资待遇',
				salaryIndex: '',
				basic: ''
			}
		},
		computed: {
			statusBarHeight() {
			    var height = 0
			    uni.getSystemInfo({
			        success: function (res) {
			            height = res.statusBarHeight
			        }
			    })
				getApp().globalData.statusBarHeight = height
			    return height
			},
			...mapState(['userInfo', 'city', 'district', 'category', 'roleType'])
		},
		watch:{
			district (val) { // 区域发生变化重新加载数据
				this.area_id = val.code ? val.code : ''
				this.currentPage = 1
				this.postList = []
				this.getPostList()
			},
			category (val) { // 职位类型发生变化重新加载数据
				this.category_id = val.id ? val.id : ''
				this.currentPage = 1
				this.postList = []
				this.getPostList()
				this.post = val.name ? val.name : '职位类型'
			},
			// roleType (val) {
			// 	this.resetData()
			// 	if(val == 2){
			// 		this.tabs = 2
			// 		this.alias = 'full_rec'
			// 	}
			// }
		},
		onLoad () {
			this.getPostList()
			var that = this
			this.getbasic()		
			uni.getSystemInfo({
				success: function (res) {
					that.sliderLeft = (res.windowWidth/3 - sliderWidth)/2,
					that.tt = (res.windowWidth/3 - sliderWidth)/2
				}
			})
			if(this.roleType == 2){
				this.tabs = 2
				this.alias = 'full_rec'
			}
		},
		// 触底加载更多
		onReachBottom() {
			if (this.postList.length >= this.total) {
				this.loadMoreText = "没有更多数据了!"
				this.showLoadMore = true
				return;
			}else{
				setTimeout(() => {
					this.getPostList();
				}, 300);
			}
			this.showLoadMore = true	
		},
		components:{
			pageTop,
			postList,
			resumeList
		},
		onReady(){
			const that = this
			setTimeout(function(){
				that.$nextTick(() => {
					uni.createSelectorQuery().in(this).select('#tabs').boundingClientRect(function(rect){
						console.log(rect)
						that.top = rect.top
					}).exec()
				})
			},1000)	
		},
		onPullDownRefresh() {
			var that = this
			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.istop = false
			}, 200);
		},
		methods: {
			getbasic(){ // 获取基础配置
				this.$axios({
					url: 'api/base/selectConfig',
					method: 'get'
				}).then(res => {
					const tt = {}
					tt.bill_way = Object.values(res.data.bill_way)
					tt.edu_level = Object.values(res.data.edu_level)
					tt.bill_way = Object.values(res.data.bill_way)					
					tt.salary = Object.values(res.data.salary)
					tt.work_exp = Object.values(res.data.work_exp)
					tt.salary.unshift('全部')
					this.basic = tt					
				})
			},
			bindPickerEdu (e) { // 学历选择器
				this.eduIndex = e.detail.value
				this.resetData()
			},
			bindPickerWork (e) { // 工作经验选择器
				this.workIndex = e.detail.value
				this.resetData()
			},
			bindPickerSalary (e) { // 薪资选择器
				this.salaryIndex = e.detail.value
				this.resetData()
			},
			resetData () {
				this.currentPage = 1
				this.total = 1
				this.postList = []
				this.getPostList()
			},
			moveHandle (){},			
			getPostList () { // 获取新的职位列表
				// 有三个参数，tab，area，post，
				const that = this
				if(this.roleType == 1){
					that.$axios({
						url: 'api/index',
						method: 'post',
						data: {
							page: that.currentPage,
							alias: that.alias,
							area_id: that.area_id,
							category_id: that.category_id
						}
					}).then(res => {
						console.log(res)
						that.postList = that.postList.concat(res.data.result.data)
						that.currentPage = that.currentPage + 1
						that.total = res.data.result.total
						this.showLoadMore = false
					})
				}else if(this.roleType == 2){
					that.$axios({
						url: 'api/enterprise/home',
						method: 'post',
						data: {
							page: that.currentPage,
							alias: that.alias,
							expect_jobs: that.category_id,
							edu_level: that.eduIndex != '' ? that.eduIndex + 1 : '',
							work_experience: that.workIndex == '' ? '' : that.workIndex + 1,
							expect_salary: that.salaryIndex != '' ? that.salaryIndex : ''
						}
					}).then(res => {
						that.postList = that.postList.concat(res.data.data)
						that.currentPage = that.currentPage + 1
						that.total = res.data.total
						this.showLoadMore = false
					})
				}
				
			},
			chooseArea () { // 点击地区
				// this.changePlace()
				console.log(this.city)
				uni.navigateTo({
					url:'/pages/filterArea?city=' + JSON.stringify(this.city) 
				})
				const that = this
				if(!that.showArea){
					setTimeout(function(){				
						that.showArea = true
						that.showPost = false
					}, 300)
				}			
			},	
			chooseType () { // 点击职位类型
				// this.changePlace()
				console.log(this.alias)
				const that = this
				uni.navigateTo({
					url:'/pages/filterPost?alias=' + this.alias
				})
				if(!that.showPost){
					setTimeout(function(){
						that.showPost = true
						that.showArea = false
					}, 300)
				}
			},
			changeTabs (e) {
				if(e.target.id != this.tabs){
					this.tabs = e.target.id
					this.currentPage = 1					
					if(this.tabs == 2){
						this.alias = 'full_rec'
						this.post = '职位类型'
						this.$store.commit('resetCategory')
					}else if (this.tabs == 3){
						this.alias = 'part_rec'
						this.post = '职位类型'
						this.$store.commit('resetCategory')
					}else{
						this.alias = ''
					}
					this.postList = []			
					this.getPostList()
					
				}	
			},
			toNext (title, type) {
				uni.navigateTo({
					url: '/pages/search/moduleSearch?title=' + title + '&type=' + type
				})
			}
		},
		onPageScroll(e){
			if(e.scrollTop >= this.top && !this.istop){
				this.istop = true
			}
		},
	}
</script>

<style lang="less">
	@import url("../../style/personal/index");
</style>
