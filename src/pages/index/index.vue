<template>
	<view class="content">
		<!-- 个人角色模块 -->
		<section class="personal-index">		
			<pageTop :istop="istop"></pageTop><!-- 轮播图 -->
			<view class="modules row just_btw" v-if="!istop" ><!-- 快捷搜索 -->
				<view class="module column center"  v-for="(item, index) in module" :key="index" @click="toNext(item.text)">
					<image :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view :class="{mounting: istop}" @touchmove.stop.prevent="moveHandle" :style="{top: statusBarHeight + 10 + 'px'}">
				<view class="tabs row" id="tabs">
					<text class="tab" id="1" @click="changeTabs" :class="{active:tabs==1}">全部职位</text>
					<text class="tab" id="2" @click="changeTabs" :class="{active:tabs==2}">只看全职</text>
					<text class="tab" id="3" @click="changeTabs" :class="{active:tabs==3}">只看兼职</text>
					<view class="sliderBorder"
					:style="{transform: 12,left: sliderLeft + 'px'}"></view>
				</view>				
				<view class="types row ali_center">
					<text @click="chooseArea">{{district ? district.name : city.name}}<text class="iconfont">&#xe65a;</text></text>
					<text @click="chooseType" v-if="tabs != 1">{{post}}<text class="iconfont">&#xe65a;</text></text>
					<text class="border"></text>
				</view>
			</view>
			<view  :class="{tt: istop}" :style="{marginTop: istop ? (statusBarHeight + 10 + 'px') : 0 }">
				<postList :list="postList" type="index"></postList><!-- 职位列表 -->	
			</view>					
		</section>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import pageTop from './components/top'
	import postList from '@/components/postList'
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
				category_id: '', // 职位id
			}
		},
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			},
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
			...mapState(['userInfo', 'city', 'district', 'category'])
		},
		watch:{
			district (val) { // 区域发生变化重新加载数据
				this.area_id = val.code
				this.currentPage = 1
				this.postList = []
				this.getPostLsit()
			},
			category (val) { // 区域发生变化重新加载数据
				this.category_id = val.id ? val.idd : ''
				this.currentPage = 1
				this.postList = []
				this.getPostLsit()
				this.post = val.name ? val.name : '职位类型'
			}
		},
		onLoad () {
			this.getPostLsit()
			this.$store.dispatch('getBasicConfig')
			var that = this
			uni.getSystemInfo({
				success: function (res) {
					that.sliderLeft = (res.windowWidth/3 - sliderWidth)/2,
					that.tt = (res.windowWidth/3 - sliderWidth)/2
				}
			}) 
			console.log(this.city)
		},
		// 触底加载更多
		onReachBottom() {
			console.log(this.postList.length)
			console.log(this.total)
			if (this.postList.length >= this.total) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}else{
				setTimeout(() => {
					this.getPostLsit();
				}, 300);
			}
			this.showLoadMore = true	
		},
		components:{
			pageTop,
			postList,
		},
		mounted(){
			const that = this
			that.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('#tabs').boundingClientRect(function(rect){
					that.top = rect.top
				}).exec()
			})
		},
		onPullDownRefresh() {
			var that = this
			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.istop = false
			}, 200);
		},
		methods: {
			moveHandle (){},			
			getPostLsit () { // 获取新的职位列表
				// 有三个参数，tab，area，post，
				const that = this
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
				})
			},
			chooseArea () { // 点击地区
				this.changePlace()
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
				this.changePlace()
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
					this.sliderLeft = e.target.offsetLeft + this.tt					
					this.getPostLsit()
				}	
			},
			toNext (title) {
				uni.navigateTo({
					url: '/pages/search/moduleSearch?title=' + title
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
