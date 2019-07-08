<template>
	<view class="pages column">
		<!-- <text class="otherLogin globelColor"  :style="{top: statusBarHeight + 'px'}" @click="otherLogin">密码登录</text> 暂无此登录方式-->
		<text class="loginTitle f_46">用户注册/登录</text>
		<input class="inp" type="text" value="" placeholder="请输入手机号" placeholder-class="placeholder" v-model="tel" @input="editTel"/>
		<text class="btn" @click="next" :class="{opacity: trueTel}">下一步</text>
		<text class="tips f_20">注册即表示同意<text class="globelColor">《用户注册与隐私保护协议》</text></text>
	</view>
</template>

<script>
	export default {
		name: 'login-index',
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				trueTel: false,
				tel: ''
			};
		},
		methods:{
			next () {
				if(this.trueTel){
					uni.navigateTo({
						url: '/pages/login/code?tel=' + this.tel
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '请输入正确的电话号码'
					})
				}	
			},
			editTel (e) {	
				if ((/^1[34578]\d{9}$/.test(e.detail.value))) {
					this.trueTel = true
				}
			},
			otherLogin () { // 密码登录
				uni.navigateTo({
					url: '/pages/login/otherLogin'
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
