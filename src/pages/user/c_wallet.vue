<template>
	<view class="walletPage">
		<view class="walletTop row f_24 just_btw">
            <view class="column">
                <text>账号余额</text>
                <text><text class="f_60">5555</text>金币</text>
            </view>
            <view class="column">
                <text>您的积分</text>
                <text><text class="f_60">5555</text>积分</text>
            </view>
        </view>
        <section class="lists">
			<view class="list" @click="toNext('/pages/user/goldRecharge')">
				<image class="icon" src="/static/icon/chongzhi_icon@2x.png" mode=""></image>金币充值<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/user/c_meal')">
				<image class="icon" src="/static/icon/shoucang_icon@2x.png" mode=""></image>企业套餐<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/user/integralRecord')">
				<image class="icon" src="/static/icon/chongzhi_icon@2x.png" mode=""></image>积分记录<text class="iconfont icon-youjiantou"></text>
			</view>
            <view class="list" @click="toNext('/pages/user/goldRecord')">
				<image class="icon" src="/static/icon/chongzhi_icon@2x.png" mode=""></image>金币记录<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/user/c_wallet')">
				<image class="icon" src="/static/icon/shoucang_icon@2x.png" mode=""></image>如何获取积分<text class="iconfont icon-youjiantou"></text>
			</view>
		</section>
	</view>
</template>

<script>
	export default {
		name: 'wallet',
		data() {
			return {
				
			};
		},
		methods:{
			toExcharge () {
				uni.navigateTo({
					url:'/pages/user/excharge'
				})
            },
            // 到下一页
			toNext (url) {
				uni.navigateTo({
					url: url
				})
			},
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import url("../../style/company/wallet.less");
</style>
