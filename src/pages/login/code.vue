<template>
	<view class="pages column">
		<text class="iconfont icon-jiantou3" :style="{top: statusBarHeight + 'px'}"></text>
		<text class="loginTitle f_46">输入验证码</text>
		<input class="inp" type="text" value="" placeholder="请输入验证码" placeholder-class="placeholder"/>
		<text class="btn f_34" @click="next">确认</text>
		<text class="tips f_20">60s重新获取</text>
	</view>
</template>

<script>
	export default {
		name: 'codeq',
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight
			};
		},

		methods: {
			next () {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		computed: {

        },
	}
</script>

<style lang="less">
@import '../../style/login/index';
uni-page-body{
	height: 100%
}
</style>
