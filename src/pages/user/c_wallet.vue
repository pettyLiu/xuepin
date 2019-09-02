<template>
	<view class="walletPage">
		<view class="walletTop row f_24 just_btw">
            <view class="column">
                <text>账号余额</text>
                <text><text class="f_60">{{info.coin}}</text>金币</text>
            </view>
            <view class="column">
                <text>您的积分</text>
                <text><text class="f_60">{{info.credit}}</text>积分</text>
            </view>
        </view>
        <section class="lists">
			<view class="list" @click="toNext('/pages/user/goldRecharge')">
				<image class="icon" src="/static/icon/recharge.png" mode=""></image>金币充值<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/user/c_meal')">
				<image class="icon" src="/static/icon/taocan.png" mode=""></image>企业套餐<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/user/integralRecord')">
				<image class="icon" src="/static/icon/record.png" mode=""></image>积分记录<text class="iconfont icon-youjiantou"></text>
			</view>
            <view class="list" @click="toNext('/pages/user/goldRecord')">
				<image class="icon" src="/static/icon/record.png" mode=""></image>金币记录<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="showTips">
				<image class="icon" src="/static/icon/tips.png" mode=""></image>如何获取积分<text class="iconfont icon-youjiantou"></text>
			</view>
		</section>
	</view>
</template>

<script>
	export default {
		name: 'wallet',
		data() {
			return {
				info: ''
			};
		},
		methods:{
			getData () {
				const that = this
				that.$axios({
					url: 'api/user/myPackage',
					method: 'post'
				}).then(res => {
					this.info = res.data
				})
			},
            // 到下一页
			toNext (url) {
				uni.navigateTo({
					url: url
				})
			},
			showTips(){
				const that = this
				// that.$axios({
				// 	url: '',
				// 	method: 'post'
				// }).then(res => {
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '每日签到即可获取积分'
				// 	})
				// })
				uni.showModal({
					title: '提示',
					content: '每日签到即可获取积分'
				})
			}
		},
		onLoad (){
			this.getData()
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import url("../../style/company/wallet.less");
</style>
