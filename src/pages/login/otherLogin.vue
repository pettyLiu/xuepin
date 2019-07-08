<template>
	<view class="pages column">
		<text class="iconfont icon-jiantou3" :style="{top: statusBarHeight + 'px'}" @click="back"></text>
		<text class="loginTitle f_46">用户登录</text>
		<input class="inp" type="text" value="" placeholder="请输入手机号" placeholder-class="placeholder" v-model="tel"/>
		<input class="inp" type="text" value="" placeholder="请输入密码" placeholder-class="placeholder" v-model="password"/>
		<text class="btn opacity" @click="login">登录</text>
	</view>
</template>

<script>
	export default {
		name: 'otherLogin',
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				tel: '',
				password: ''
			};
		},
		methods:{
			login () { // 密码登录
				if (!(/^1[34578]\d{9}$/.test(this.tel))) {
					uni.showToast({ title: '请输入正确电话号码', icon: 'none' })
				}else if(this.password == ''){
					uni.showToast({ title: '请输入登录密码', icon: 'none' })
				}else{
					this.$axios({ url: '', data: { tel: '', password: '' } }).then(res => {
						if(res.code == 1){
							uni.switchTab({
								url: '/pages/index/index'
							})
						}else{
							uni.showToast({ title: res.msg, icon: 'none' })
						}
					})
				}
			},
			back () {
				uni.navigateBack()
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import '../../style/login/index';
</style>
