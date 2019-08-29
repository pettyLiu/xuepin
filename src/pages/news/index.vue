<template>
	<view class="personal-news">
		<view class="tabs row just_arw">
			<text class="tab" :class="{active: activeTab==index}" v-for="(item, index) in tabs" :key="index" @click="changeTabs" :id="index">{{item}}</text>
			<view class="sliderBorder" :style="{left: sliderLeft + 'px'}"></view>
		</view>
		<!-- <postList :list="news" type="news" v-if="roleType == 1"></postList> -->
		<view v-if="roleType == 1">
			<view class="postList" @click="toPostDetail(item.job.id)" v-for="(item, index) in news" :key="index">
				<view class="row just_btw">
					<text class="title">{{item.job.title}}</text>
					<text class="salary">{{item.job.salary}}</text>
				</view>
				<view class="txt row just_btw">
					<text class="company" @click.stop="toCompanyDetail">
						<i></i><i></i>{{item.enterprise.name}}
					</text>
				</view>			
				<view class="column">
					<view class="row tags">
						<text class="tag" v-for="tag in item.job.tags" :key="tag">{{tag}}</text>
					</view>
					<view class="newsTip row just_btw" @click.stop="toInterviewDetail(item.id)">
						<text class="time">{{item.created_at}}</text>
						<text class="newstype">{{item.status}}<text class="iconfont icon-youjiantou"></text></text>	
					</view>	
				</view>
			</view>
			<view class="nothing column center" v-if="news.length == 0">
				<image class="nothing_image" src="/static/image/bg.png" mode=""></image>
				<text>暂无此类消息</text>
			</view>
		</view>
		<resumeList :list="news" type="news" v-if="roleType == 2"></resumeList>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import postList from '@/components/postList'
	import resumeList from '@/components/resumeList'
	import { mapState } from 'vuex'
	import { api } from '../../lib/api'
	const sliderWidth = 20
	export default{
		name: 'news',
		components:{
			postList, resumeList
		},
		mounted() {
		},
		data(){
			return{
				tabs: ['全部','查看','待面试','不合适'],
				activeTab: 0,
				news: [],
				sliderLeft: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
				status: '',
				messageId: 0
			}
		},
		methods:{
			// getNews () { // 获取消息列表
			// 	const that = this
			// 	that.$axios({
			// 		url: api().message_data,
			// 		methods: 'post',
			// 		data: {
			// 			status: that.status
			// 		}
			// 	}).then(res => {
			// 		console.log(res)
			// 		that.news= res.data
			// 	})
			// },
			// 职位详情
			toPostDetail (id) {
				uni.navigateTo({
					url: '/pages/postDetail?id=' + id
				})
			},
			// 面试详情
			toInterviewDetail (id) {
				// if(this.activeTab == 2){
					uni.navigateTo({
						url: '/pages/news/InterviewDetail?id=' + id
					})
				// }
			},
			changeTabs (e) {
				if(this.activeTab != e.target.id){
					this.activeTab = e.target.id
					this.loadMoreText = "加载中..."
					this.showLoadMore = false
					this.sliderLeft = e.target.offsetLeft + this.tt
					this.currentPage = 1
					this.news = []
					switch(this.activeTab){
						case '0':
						this.status = ''
						this.messageId = 0
						break;
						case '1':
						this.status = 1
						this.messageId = 1
						break;
						case '2':
						this.status = 4
						this.messageId = 4
						break;
						case '3':
						this.status = 2
						this.messageId = 2
					}
					this.getNewsList()
				}
			},
			getNewsList () {
				const that = this
				console.log(this.status)
				
				const data = this.roleType == 1 ? { page: that.currentPage, status: that.status} : { page: that.currentPage, messageId: that.messageId}
				that.$axios({  
					url: api().message_data, 
					method: 'post',
					data: data
				}).then(res =>{
					if(res.code == 1){
						that.currentPage += that.currentPage
						that.total = this.roleType == 1 ? res.data.total : res.data.receiveRes.total
						that.news = this.roleType == 1 ? that.news.concat(res.data.data) : that.news.concat(res.data.receiveRes.data)
						console.log(that.news)
					}
				})
			},
		},
		onReachBottom() {
			if(this.total > this.news.length){
				this.getNewsList()
			}else{
				this.loadMoreText = "没有更多数据了"
				this.showLoadMore = true
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/that.tabs.length - sliderWidth)/2,
					that.tt = (res.windowWidth/that.tabs.length - sliderWidth)/2
			    }
			})
			that.getNewsList()
		},
		watch: {
			roleType(){
				this.currentPage = 1
				this.getNewsList()
			}
		},
		computed:{
			...mapState(['roleType'])
		}
	}
</script>


<style lang="less">
	@import url("../../style/personal/news");
	.postList{
			margin-bottom: @g_bottom;
			background: white;
			padding: 15upx @g_margin 10upx;
			.title{
				font-size: 34upx;
				font-weight: 500;
			}
			.salary{
				color: @g_color;
				font-size: 30upx;
			}
			.tags{
				margin-bottom: 16upx;
				flex-wrap: wrap;
				.tag{
					padding: 6upx 10upx;
					background: #f6f6f6;
					color: #adadad;
					margin-right: 24upx;
					font-size: 20upx;
					margin-bottom: 6upx;
				}
			}
			.txt{
				margin: 24upx 0 14upx;
				.company{
					font-size: 22upx;
					color: #666;
				}
				.date{
					font-size: 20upx;
					color:#999;
				}
			}
			.address{
				font-size: 20upx;
				margin-top: 15upx;
			}
			.newsTip{
				border-top: @g_border;
				padding-top: 14upx;
				width: 100%;
				.icon-youjiantou{
					color: #adadad;
				}
			}
			.newstype{
				color: #EB8457
			}
			.time{
				font-size: 20upx;
			}
		}
</style>