<template>
	<view class="collection">	
		<view class="message-list uni-swipe-action">
			<block v-for="(it,i) of resumeCollection" :key="i">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
					<view class="uni-swipe-action__content resumeList row" @click="toResumeDetail(it.resume_id,it.category_id)">
						<image class="resumeAvatar" :src="it.avatar"></image>
						<view class="flex1  f_22">
								<view class="resumeTitle">
									<text class="f_26 name">{{it.name}}</text>
									<text class="f_20 c_666"><text class="borderRight">{{it.sex}}</text>{{it.age}}岁</text>
								</view>
								<text class="borderRight">{{it.work_experience}}</text>
								<text class="borderRight">{{it.edu_level}}</text>
								<view class="resumeVideo row just_btw ali_center f_24">
										<view class="">
												<text class="iconfont icon-video f_30"></text>
												<text>视频简历</text>
										</view>
										<text class="iconfont icon-youjiantou"></text>
								</view>
						</view>
						<view class="resumeFocu column center">
								<text class="bold">{{it.expect_jobs}}</text>
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
				resumeCollection: [],
				options: [{text:'取消收藏'}],
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
				imgUrl: config.imgUrl,
				getSizes: false
			};
		},
		methods:{
			getCollectionList () { // 简历列表
				const that = this
				that.$axios({ 
					url: 'api/user/showResumeCollection', 
					method: 'post',
					data: { 
						page: that.currentPage,
					} 
				}).then(res =>{
					if(res.code == 1){
						console.log(res)
						that.total = res.data.resumeCollection.total
						that.resumeCollection = res.data.resumeCollection.data
						that.showLoadMore = false
						that.currentPage += that.currentPage
						if(!that.getSizes&&that.total>0){
							setTimeout(() => {
								that.getSize()
							}, 3000);
							that.getSizes = true
						}
					}
				})
			},
			toResumeDetail (id, type) { // 跳转简历详情
				uni.navigateTo({
					url: '/pages/resumeDetail?id=' + id + '&type=' + type
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
			
				that.$axios({
					url: 'api/user/deleteResumeCollection',
					method: 'post',
					data: {
						id: that.resumeCollection[index].resume_id
					}
				}).then(res =>{
					if(res.code == 1){
						uni.showToast({ title: res.msg, icon: 'none' })
						that.resumeCollection.splice(index, 1)
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
		onLoad() {
			this.getCollectionList()
		},
	}
</script>

<style lang="less">
@import '../../style/company/collection';
</style>
