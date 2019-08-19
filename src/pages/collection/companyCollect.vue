<template>
	<view class="collection">	
		<view class="message-list uni-swipe-action">
			<block v-for="(it,i) of resumeCollection" :key="i">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
					<view class="uni-swipe-action__content resumeList row" @click="toResumeDetail(item.id)">
						<image class="resumeAvatar" src="/static/image/bg.png"></image>
						<view class="flex1  f_22">
								<view class="resumeTitle">
										<text class="f_26 name">李晓丽</text>
										<text class="f_20 c_666"><text class="borderRight">男</text>23岁</text>
								</view>
								<text class="borderRight">5-10年</text>
								<text class="borderRight">本科</text>
								<text>图像处理</text>
								<view class="resumeVideo row just_btw ali_center f_24">
										<view class="">
												<text class="iconfont icon-video f_30"></text>
												<text>视频简历</text>
										</view>
										<text class="iconfont icon-youjiantou"></text>
								</view>
						</view>
						<view class="resumeFocu column center">
								<text class="bold">设计师</text>
								<text class="eb8">查看</text>
						</view>          
					</view>
					<view class="uni-swipe-action__btn-group" :id="elId">
						<div v-for="(item,index) in options" :key="index" class="uni-swipe-action--btn" 
						 @click="bindClickBtn(item,i)">
							{{item.text }}
						</div>
					</view>
				</view>
			</block>
			<view class="nothing column center" v-if="resumeCollection.length == 0">
				<image class="nothing_image" src="/static/image/bg.png" mode=""></image>
				<text>暂无收藏的简历</text>
			</view>
		</view>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>
<script>
	const sliderWidth = 20;
	import config from '../../lib/config'
	export default {
		name: 'companyCollection',
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				collectionList: [],
				sliderLeft: 0,
				startX: 0, //触摸位置
				endX: 0, //结束位置
				elId: elId,
				transformX: 'translateX(0px)',
				messageIndex: -1,
				resumeCollection: [1,2],
				options: [{text:'取消收藏'}],
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
				imgUrl: config.imgUrl
			};
		},
		methods:{
			getCollectionList () {
				const that = this
				that.$axios({ 
					url: 'api/user/showResumeCollection', 
					method: 'post',
					data: { 
						// page: that.currentPage,
					} 
				}).then(res =>{
					if(res.code == 1){
						console.log(res)
						that.total = res.data.total
						that.resumeCollection = res.data.data
						that.showLoadMore = false
						that.currentPage += that.currentPage
					}
				})
			},
			toPostDetail () {
				uni.navigateTo({
					url: '/pages/postDetail'
				})
			},
			getSize() {
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					this.btnGroupWidth = ret[0].width;
				});
			},
			bindClickBtn(item, index) {
				const that = this
				this.messageIndex = -1;
				this.resumeCollection.splice(index, 1)
				that.$axios({
					url: 'api/user/deleteResumeCollection',
					method: 'post',
					data: {
						id: that.resumeCollection[index].id
					}
				}).then(res =>{
					if(res.code == 1){
						uni.showToast('取消成功')
					}
				})
				console.log('删除职位收藏第' + index + '项')
			},
			touchStart(event) {
				if(event.currentTarget.dataset.disabled === true){
					return;
				}
				this.startX = event.touches[0].pageX;
				this.startY = event.touches[0].pageY;
			},
			touchMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				var moveY = event.touches[0].pageY - this.startY,
						moveX = event.touches[0].pageX - this.startX;
				if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX) || Math.abs(moveY) > 100 || Math.abs(moveX) < 50) { //纵向滑动//参数100与50可调节侧滑灵敏度
					this.direction = 'Y';
					return;
				}
				this.direction = moveX > 0 ? 'right' : 'left';
				this.messageIndex = moveX < 0 ? event.currentTarget.dataset.index : -1;
				this.isMoving = true;
			},
			touchEnd(event) {
				this.isMoving = false;
				if (this.direction !== 'right' && this.direction !== 'left') {
					this.direction = '';
					return;
				}
				if (this.direction == 'right') {
					this.messageIndex = -1;
				} 
				this.endMove(event)
			},
			endMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				if (this.messageIndex !== -1) {
					this.transformX = `translateX(${-this.btnGroupWidth}px)`;
					this.$emit('opened');
				} else {
					this.transformX = 'translateX(0px)';
					this.$emit('closed');
				}
				this.direction = '';
			}
		},
		computed:{	
		},
		onReachBottom () {
			const list = this.resumeCollection
			if(this.total >= list.length){
				this.getCollectionList()
				this.showLoadMore = true
			}else{
				this.loadMoreText = "没有更多数据了"
				this.showLoadMore = true
			}
		},
		created() {
			this.direction = ''
			this.startX = 0
			this.startY = 0
			this.btnGroupWidth = 0
			this.isMoving = false
		},
		mounted() {
            this.getSize()
            console.log(1212)
		},
		onReady() {
			this.getSize()
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/3 - sliderWidth)/2,
					that.tt = (res.windowWidth/3 - sliderWidth)/2
			    }
			})
			// that.getCollectionList()
		},
	}
</script>

<style lang="less">
@import '../../style/company/collection';
</style>
