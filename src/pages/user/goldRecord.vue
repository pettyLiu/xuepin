<template>
	<view class="goldRecord">
		<view class="bg column center">
			<text class="f_24">可用金币（个）</text>
			<text class="f_72">65</text>
		</view>
		<view class="content">
			<view class="list row just_btw">
				<view class="left column">
					<text class="f_30">主动充值</text>
					<text class="f_24">2019-06-12</text>
				</view>
				<text class="f_30 globelColor">+10个</text>
			</view>
			<view class="list row just_btw" v-for="item in 12">
				<view class="left column">
					<text class="f_30">积分兑换</text>
					<text class="f_24">2019-06-12</text>
				</view>
				<text class="f_30 globelColor">+10个</text>
			</view>
			<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goldRecord',
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
				record: []
			};
		},
		methods:{
			getRecord () {
				const that = this
				that.$axios({ url: '', data: { currentPage: that.currentPage }}).then(res =>{
					// console.log(res)
					if(res.code == 1){
						that.record = res.data
						that.showLoadMore = false
						that.currentPage += 1
					}
				})
			}
		},
		onReachBottom () {
			if(this.total > this.currentPage){
				this.showLoadMore = true
				this.getRecord()
			}else{
				this.showLoadMore = true
				this.loadMoreText = '没有更多数据了!'
			}
		},
		onLoad() {
			this.getRecord()
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import url("../../style/user/integralRecord");
</style>
