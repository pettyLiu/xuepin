<template>
	<view class="page-search">
		<view class="search row ali_center just_btw" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<view class="address ellipsis">{{city.name}}<text class="iconfont icon-sanjiao"></text></view>
			<view class="searchView">
				<input class="searchInp" type="text" value="" placeholder="输入关键字" @input="change"
				@confirm="search(keyword, 'reset')" placeholder-class="searchPlaceholder" v-model="keyword" />
				<text class="iconfont icon-sousuo"></text>
			</view>
			<text  @click="back">取消</text>
		</view>
		<view class="history" :style="{paddingTop:statusBarHeight+10 + 'px'}">
			<view class="postLists" v-if="type == 1">
				<view class="postList" @click="toPostDetail(item.id)" v-for="(item, index) in lists" 
				:key="index">
					<view class="row just_btw">
						<text class="title">{{item.title}}</text>
						<text class="salary">{{item.salary}}</text>
					</view>
					<view class="txt row just_btw">
						<text class="company" @click.stop="toCompanyDetail">
							{{item.district_name}} {{item.enterprise_name}}
						</text>
						<text class="date">{{item.updated_at}}</text>
					</view>			
					<view class="column" >
						<view class="row tags">
							<text class="tag" v-for="tag in item.enterprise_tags" :key="tag">{{tag}}</text>
						</view>
						<text v-if="type == 'index'" class="address"><text class="iconfont icon-weizhi"></text>章贡区</text>	
					</view>
				</view>
			</view>
			<view class="companyLists"  v-if="type == 2">
				<view class="companyList" v-for="(item, index) in lists" :key="index"
				 @click="toCompanyDetail(item.id)">
					<view class="companyTxt row ali_center">
						<image class="companyAvatar" :src="url+item.logo" mode=""></image>
						<view class="column just_btw">
							<text class="companyName">{{item.name}}</text>
							<text class="address"><text class="iconfont icon-weizhi">
								</text>{{item.city_name}} {{item.district_name}}</text>
						</view>
					</view>
					<view class="companyTypes">
						<text class="companyType">{{item.category}}</text>
					</view>
				</view>
			</view>
			<view class="resumeLists"  v-if="type == 3">
				<view class="resumeList row" @click="toResumeDetail(item.id, item.category_id)" 
				v-for="(item, index) in lists" :key="index">
					<image class="resumeAvatar" :src="url + item.avatar"></image>
					<view class="flex1  f_22">
						<view class="resumeTitle">
							<text class="f_26 name">{{item.name}}</text>
							<text class="f_20 c_666"><text class="borderRight">{{item.sex}}</text>{{item.age}}岁</text>
						</view>
						<text class="borderRight">{{item.work_exp}}</text>
						<text class="borderRight">{{item.edu_level_name}}</text>
						<text>{{item.expect_jobs_list}}</text>
						<view class="resumeVideo row just_btw ali_center f_24">
							<view class="">
								<text class="iconfont icon-video f_30"></text>
								<text>视频简历</text>
							</view>
							<text class="iconfont icon-youjiantou"></text>
						</view>
					</view>
					<view class="resumeFocu column center">
						<text class="bold">{{item.category_id == 1 ? '全职简历' : '兼职简历'}}</text>
					</view>          
				</view>
			</view>
			<text class="tips" v-if="showLists">暂无搜索内容</text>
			<view class="historyTitle row just_btw" 
			v-if="lists.length == 0 && keyword =='' && history.length != 0">
				<text>历史搜索</text>
				<text class="iconfont icon-del1" @click="delSearch"></text>
			</view>
			<view class="lists row" v-if="lists.length == 0 && keyword ==''">
				<text class="f_24 c_999 list ellipsis" v-for="item in history" :key="item" @click="search(item)">{{item}}</text>
			</view>
			<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	import config from '../../lib/config'
	export default{
		data () {
			return{
				statusBarHeight: getApp().globalData.statusBarHeight,
				keyword: '',
				jobs: [],
				enterprise: [],
				history: uni.getStorageSync('search') ? uni.getStorageSync('search') : [],
				type: 1,
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
				lists: [],
				showLists: false,
				url: config.imgUrl
			}
		},
		mounted() {
		},
		methods:{
			search (keyword, reset) { // 搜索
				this.keyword = keyword
				if(reset){
					this.currentPage = 1
				}
				if(this.history.length == 0){
					this.history.push(keyword)
					uni.setStorageSync('search', this.history)
				}
				for(let i=0; i < this.history.length; i++){
					if(this.history[i] == keyword){
						break;
					}else if(i == this.history.length - 1){
						this.history.push(keyword)
						uni.setStorageSync('search', this.history)
					}
				}
				
				if (this.roleType == 2) {
					this.companySearch(keyword)
				}else{
					this.personalSearch(keyword)
				}
			},
			personalSearch (keyword) {
				const that = this
				that.$axios({
					url: 'api/job/allSearch',
					method: 'post',
					data: { 
						page: that.currentPage,
						Choosetext: keyword, 
						areaName: that.city.name,
						type: that.type
					}
					}).then(res =>{
					console.log(res)
					if(res.code == 1){
						if(that.type == 1){
							that.lists = res.data.original.data.data
						}else if(that.type == 2){
							that.lists = res.data.original.data.data
						}
						that.total = res.data.original.data.total
						that.currentPage++
						that.showLoadMore = false
						if(that.lists.length){
							that.showLists = false
						}else{
							that.showLists = true
						}
					}
				})
			},
			companySearch (keyword) {
				const that = this
				that.$axios({
					url: 'api/enterprise/appResumeSearch',
					method: 'post',
					data: { 
						page: that.currentPage,
						Choosetext: keyword, 
						areaName: that.city.id,
					}
					}).then(res =>{
					console.log(res)
					if(res.code == 1){
						that.lists = res.data.data
						that.total = res.data.total
						that.currentPage++
						that.showLoadMore = false
						if(that.lists.length){
							that.showLists = false
						}else{
							that.showLists = true
						}
					}
				})
			},
			// 简历详情
			toResumeDetail (id, category_id) {
				console.log(category_id)
				uni.navigateTo({
					url: '/pages/resumeDetail?id=' + id + '&type='+ category_id
				})	
			},
			toPostDetail (id) {
				uni.navigateTo({
					url: '/pages/postDetail?id=' + id
				})
			},
			toCompanyDetail (id){
				uni.navigateTo({
					url: '/pages/companyDetail?id=' + id
				})
			},
			change (e) {
				if(e.detail.value==''){
					this.showLists = false
				}
			},
			back () { // 返回
				uni.navigateBack()
			},
			delSearch () {
				uni.removeStorageSync('search')
				this.history = []
			}
		},
		onReachBottom () {
			if(this.total > this.lists.length){
				this.showLoadMore = true
				this.search()
			}else{
				this.loadMoreText = "没有更多数据了"
				this.showLoadMore = true
			}
		},
		onLoad (options) {
			this.type = options.type // 为1,2时为个人端职位与公司的搜索，3为企业端简历搜索
		},
		computed: {
			city ()  {
				return this.$store.state.city
			},
			roleType () {
				return this.$store.state.roleType
			}
		}
	}
</script>

<style lang="less">
	@import '../../style/search/index';
</style>