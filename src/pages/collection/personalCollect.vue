<template>
	<view class="collection">
		<view class="tabs row" id="tabs">
			<text class="tab" id="1" @click="changeTabs" :class="{active:tabs==1}">收藏职位</text>
			<text class="tab" id="2" @click="changeTabs" :class="{active:tabs==2}">收藏公司</text>
			<view class="sliderBorder"
			:style="{transform: 12,left: sliderLeft + 'px'}"></view>
		</view>	
		<view class="message-list uni-swipe-action"  v-if="tabs==1">
			<block v-for="(it,i) of resumeCollection" :key="i">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
					<view class="uni-swipe-action__content" @click="toPostDetail(it.job_id)">
						<view class="row just_btw indent">
							<text class="title">{{it.jobName}}</text>
							<text class="salary">{{it.salary}}</text>
						</view>
						<view class="txt row just_btw">
							<text class="company">{{it.enterpriseName}}</text>
							<text class="date">{{it.updated_at}}</text>
						</view>			
						<view class=" indent">
							<view class="row tags">
								<text class="tag" v-for="item in it.tags" :key="item">{{item}}</text>
							</view>
							<text class="address">
							<text class="iconfont icon-weizhi"></text>
							{{it.province}}{{it.city}}{{it.district}}</text>
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
				<text>暂无收藏的职位</text>
			</view>
		</view>
		<view class="message-list uni-swipe-action"  v-if="tabs==2&&companyCollection.length">
			<block v-for="(it,i) of companyCollection" :key="i">
				<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
				 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
					<view class="uni-swipe-action__content" @click="toCompanyDetail(it.enterprise_id)">
						<view class="companyTxt row ali_center">
							<image class="companyAvatar" :src="imgUrl + it.logo" mode=""></image>
							<view class="column just_btw">
								<text class="companyName">{{it.enterpriseName}}</text>
								<text class="address"><text class="iconfont icon-weizhi"></text>{{it.city}} {{it.district}}</text>
							</view>
						</view>
						<view class="companyTypes">
							<text class="companyType">{{it.category}}</text>
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
			<view class="nothing column center" v-if="companyCollection.length == 0">
				<image class="nothing_image" src="/static/image/bg.png" mode=""></image>
				<text>暂无收藏的公司</text>
			</view>
		</view>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	const sliderWidth = 20;
	import config from '../../lib/config'
	export default {
		name: 'collection',
		data() {
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				collectionList: [1,2,2,5],
				tabs:1,
				sliderLeft: 0,
				list: [],
				startX: 0, //触摸位置
				endX: 0, //结束位置
				elId: elId,
				transformX: 'translateX(0px)',
				messageIndex: -1,
				resumeIndex: -1,
				companyIndex: -1,
				resumeCollection: [],
				companyCollection: [],
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
			getCollectionList () {
				const that = this
				that.$axios({ 
					url: 'api/user/collectBox', 
					data: { 
						page: that.currentPage,
					  type: that.tabs
					} 
				}).then(res =>{
					console.log(res)
					if(res.code == 1){
						console.log(res)
						that.total = res.data.total
						if (that.tabs == 1) {
							that.resumeCollection = res.data.data
						} else{
							that.companyCollection = res.data.data
						}
						that.showLoadMore = false
						that.currentPage += that.currentPage
						if(!that.getSizes){
							setTimeout(() => {
								that.getSize()
							}, 500);
							
							that.getSizes = true
						}
					}
				})
			},
			changeTabs (e) {
				if(e.target.id != this.tabs){
					this.tabs = e.target.id
					this.sliderLeft = e.target.offsetLeft + this.tt	
					this.messageIndex = -1
					this.currentPage = 1
					this.total = 1
					this.loadMoreText = "加载中..."
					this.showLoadMore = false
					this.getCollectionList()
				}	
			},
			toPostDetail (id) {
				uni.navigateTo({
					url: '/pages/postDetail?id=' + id
				})
			},
			toCompanyDetail (id) {
				console.log(id)
				uni.navigateTo({
					url: '/pages/companyDetail?id=' + id
				})
			},
			getSize() {
				console.log(uni.createSelectorQuery().in(this).select(`#${this.elId}`))
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					console.log(ret)
					this.btnGroupWidth = ret[0].width;
				});
			},
			bindClickBtn(item, index) {
				const that = this
				this.messageIndex = -1;
				if(this.tabs == 1){	
					that.$axios({
						url: 'api/user/cancelCollectJob',
						method: 'post',
						data: {
							id: that.resumeCollection[index].job_id
						}
					}).then(res =>{
						if(res.code == 1){
							this.resumeCollection.splice(index, 1)
							uni.showToast({ title: res.msg, icon: 'none' })
						}
					})
					console.log('删除职位收藏第' + index + '项')
				}else if(this.tabs == 2){
					
					that.$axios({
						url: 'api/user/cancelCollectEnt',
						method: 'post',
						data: {
							id: that.companyCollection[index].enterprise_id
						}
					}).then(res =>{
						if(res.code == 1){
							this.companyCollection.splice(index, 1)
							uni.showToast({ title: res.msg, icon: 'none' })
						}
					})
					console.log('删除企业收藏第' + index + '项')
				}	
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
			const list = this.tabs == 1 ? this.resumeCollection : this.companyCollection
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
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/3 - sliderWidth)/2,
					that.tt = (res.windowWidth/3 - sliderWidth)/2
			    }
			})
			that.getCollectionList()
			console.log(121212112)
		},
	}
</script>

<style lang="less">
@import '../../style/personal/collection';
</style>
