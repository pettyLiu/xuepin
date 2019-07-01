<template>
	<view class="pages column">
		<text class="loginTitle f_46">用户注册/登录</text>
		<input class="inp" type="text" value="" placeholder="请输入手机号" placeholder-class="placeholder"/>
		<text class="btn" @click="next">下一步</text>
		<text class="tips f_20">注册即表示同意<text class="globelColor">《用户注册与隐私保护协议》</text></text>
	</view>
</template>

<script>
	export default {
		name: 'login-index',
		data() {
			return {
				
			};
		},
		methods:{
			next () {
				uni.navigateTo({
					url: '/pages/login/code'
				})
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import '../../style/login/index';
</style>
