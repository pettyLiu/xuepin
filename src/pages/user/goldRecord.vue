<template>
	<view class="goldRecord">
		<view class="bg column center">
			<text class="f_24">可用金币（个）</text>
			<text class="f_72">{{coin}}</text>
		</view>
		<view class="content">
			<view class="list row just_btw" v-for="(item, index) in record" :key="index">
				<view class="left column">
					<text class="f_30">{{item.msg}}</text>
					<text class="f_24">{{item.created_at}}</text>
				</view>
				<text class="f_30 globelColor">{{item.type == 1 ? '+' : '-'}}{{item.value}}个</text>
			</view>
			<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			<view class="nothing column center" v-if="record.length == 0">
				<image class="nothing_image" src="/static/image/bg.png" mode=""></image>
				<text>暂无记录</text>
			</view>
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
				record: [],
				coin: ''
			};
		},
		methods:{
			getRecord () {
				const that = this
				that.$axios({ 
					url: 'api/user/showCoinLog',
					method: 'post',
					data: { 
						// currentPage: that.currentPage 
					}
				}).then(res =>{
					// console.log(res)
					if(res.code == 1){
						that.record = res.data.data
						that.showLoadMore = false
						that.currentPage += 1
						that.coin = res.data.coin
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
