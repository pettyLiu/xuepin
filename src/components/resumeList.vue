<template>
	<view class="resumeLists" v-if="list">
		<view class="resumeList row" @click="toResumeDetail(type=='news'?item.resume_id:item.id)" v-for="(item, index) in list" :key="index">
			<image class="resumeAvatar" :src="imgUrl + item.avatar"></image>
            <view class="flex1  f_22">
                <view class="resumeTitle">
                    <text class="f_26 name">{{item.name}}</text>
                    <text class="f_20 c_666"><text class="borderRight">{{item.sex}}</text>{{item.age}}岁</text>
                </view>
                <text class="borderRight">{{item.work_experience}}</text>
                <text class="borderRight">{{item.edu_level}}</text>
                <text>{{item.expect_jobs}}</text>
                <view class="resumeVideo row just_btw ali_center f_24">
                    <view class="">
                        <text class="iconfont icon-video f_30"></text>
                        <text>视频简历</text>
                    </view>
                    <text class="iconfont icon-youjiantou"></text>
                </view>
            </view>
            <view class="resumeFocu column center">
                <text class="bold">{{item.expect_jobs}}</text>
                <text class="eb8" v-if="type == 'news'">{{item.status}}</text>
            </view>          
		</view>
		<view class="nothing column center" v-if="list.length == 0">
			<image src="/static/image/bg.png" mode=""></image>
			<text>暂无内容</text>
		</view>
	</view>
</template> 

<script>
    import config from '../lib/config'
	export default {
		data() {
			return {
				imgUrl: config.imgUrl
			};
		},
		props:['list', 'type'],
		methods:{
			// 简历详情
			toResumeDetail (id) {
                if(this.type == 'news'){
                    uni.navigateTo({
                        url: '/pages/resumeDetail?id=' + id + '&way=1'
                    })
                }else{
                    uni.navigateTo({
                        url: '/pages/resumeDetail?id=' + id
                    })
                }	
			},
			// 公司详情
			toCompanyDetail (id) {
				uni.navigateTo({
					url: '/pages/companyDetail?id=' + id
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
		}
	}
</script>

<style lang="less">
	@import '../style/common/mixin.less';
	.resumeLists{
		.resumeList{
			margin-bottom: @g_bottom;
			background: white;
            padding: 22upx @g_margin 10upx;
            position: relative;
            .resumeAvatar{
                height: 86upx;
                width: 86upx;
                border-radius: 50%;
                margin-right: 26upx;
            }
            .resumeTitle{
                margin-bottom: 20upx;
                .name{
                    padding-right: 48upx;
                }   
            }
            .borderRight{
                padding-right: 16upx;
                border-right: 1px solid #dedede;
                margin-right: 16upx;
            }
			.resumeVideo{
                margin-top: 16upx;
                border-top: 1px solid #dedede;
                padding: 22upx 0 12upx
            }
            .resumeFocu{
                position: absolute;
                top: 22upx;
                right: @g_margin;
                line-height: 32upx;
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
    .flex1{
        flex: 1
    }
    .icon-video{
        margin-right: 20upx;
    }
    .eb8{
        color: #EB8557
    }
</style>
