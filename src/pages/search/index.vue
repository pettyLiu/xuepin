<template>
	<view class="">
		<view class="search row ali_center just_btw" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<view class="address">赣州<text class="iconfont icon-sanjiao"></text></view>
			<view class="searchView">
				<input class="searchInp" type="text" value="" placeholder="输入关键字" @confirm="search(keyword)" placeholder-class="searchPlaceholder" v-model="keyword" />
				<text class="iconfont icon-sousuo"></text>
			</view>
			<text  @click="back">取消</text>
		</view>
		
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		<view class="history" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<view class="postLists" v-if="type == 1">
				<view class="postList" @click="toPostDetail()" v-for="(item, index) in lists" :key="index">
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
				<view class="companyList" v-for="(item, index) in lists" :key="index" @click="toCompanyDetail">
					<view class="companyTxt row ali_center">
						<image class="companyAvatar" src="/static/image/banner2.png" mode=""></image>
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
			<text class="tips" v-if="jobs.length == 0 && enterprise.length == 0 && keyword != ''">暂无搜索内容</text>
			<view class="historyTitle row just_btw" 
			v-if="jobs.length == 0 && enterprise.length == 0 && keyword =='' && history.length != 0">
				<text>历史搜索</text>
				<text class="iconfont icon-del1" @click="delSearch"></text>
			</view>
			<view class="lists row" v-if="jobs.length == 0 && enterprise.length == 0 && keyword ==''">
				<text class="f_24 c_999 list ellipsis" v-for="item in history" :key="item" @click="search(item)">{{item}}</text>
			</view>
			<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
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
				lists: []
			}
		},
		mounted() {
		},
		methods:{
			search (keyword) { // 搜索
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
				const that = this
				that.$axios({
					url: 'api/job/allSearch',
					method: 'post',
					data: { 
						// currentPage: that.currentPage,
						Choosetext: keyword, 
						areaName: '赣州市' 
					}
					}).then(res =>{
					console.log(res)
					if(res.code == 1){
						if(that.type == 1){
							that.lists = res.data.original.data.job.data
						}else if(that.type == 2){
							that.lists = res.data.original.data.enterprise.data
						}
						// that.jobs = res.data.original.data.job
						// that.enterprise = res.data.original.data.enterprise
						// console.log(that.lists)
						that.currentPage++
						that.showLoadMore = false
					}
				})
			},
			toPostDetail () {

			},
			toCompanyDetail (){

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
			if(this.total > this.currentPage){
				this.search()
			}else{
				this.loadMoreText = "没有更多数据了"
				this.showLoadMore = true
			}
		},
		onLoad(options) {
			this.type = options.type
		}
	}
</script>

<style lang="less">
	@import '../../style/search/index';
</style>