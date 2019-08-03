<template>
	<view class="postLists">
		<view class="postList" @click="toPostDetail()" v-for="(item, index) in list" :key="index">
			<view class="row just_btw">
				<text class="title">{{item.title}}</text>
				<text class="salary">{{item.salary}}</text>
			</view>
			<view class="txt row just_btw">
				<text class="company" @click.stop="toCompanyDetail">
					<i></i><i></i>{{item.enterpriseName}}
				</text>
				<text class="date">{{item.updated_at}}</text>
			</view>			
			<view class="column" >
				<view class="row tags">
					<text class="tag" v-for="tag in item.tags" :key="tag">{{tag}}</text>
				</view>
				<text v-if="type == 'index'" class="address"><text class="iconfont icon-weizhi"></text>{{item.district}}</text>
				<view v-if="type == 'news'" class="newsTip row just_btw" @click.stop="toInterviewDetail(item)">
					<text class="time">6月15日 12:00</text>
					<text class="newstype" v-if="item==1">待查看<text class="iconfont icon-youjiantou"></text></text>
					<text class="newstype" v-if="item==2">已被查看<text class="iconfont icon-youjiantou"></text></text>
					<text class="newstype" v-if="item==3">不合适<text class="iconfont icon-youjiantou"></text></text>
					<text class="newstype" v-if="item==4">待面试<text class="iconfont icon-youjiantou"></text></text>	
				</view>	
			</view>
		</view>
		<view class="nothing column center" v-if="list.length == 0">
			<image src="/static/image/bg.png" mode=""></image>
			<text>暂无内容</text>
		</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['list', 'type'],
		methods:{
			// 职位详情
			toPostDetail () {
				uni.navigateTo({
					url: '/pages/postDetail'
				})
			},
			// 公司详情
			toCompanyDetail () {
				uni.navigateTo({
					url: '/pages/companyDetail'
				})
			},
			// 面试详情
			toInterviewDetail (status) {
				// if(this.activeTab == 2){
					uni.navigateTo({
						url: '/pages/news/InterviewDetail?status=' + status
					})
				// }
			}
		},
		mounted(){
			console.log(7777)
		},
		computed:{


		}
	}
</script>

<style lang="less">
	@import '../style/common/mixin.less';
	.postLists{
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
	}
	.nothing{
		color: #adadad;
		margin-top: 100upx;
		image{
			height: 320upx;
			width: 370upx;
			margin-bottom: 72upx;
		}
	}

</style>
