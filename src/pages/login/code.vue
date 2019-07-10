<template>
	<view class="pages column">
		<text class="iconfont icon-jiantou3" :style="{top: statusBarHeight + 'px'}" @click="back"></text>
		<text class="loginTitle f_46">输入验证码</text>
		<input class="inp" type="text" value="" placeholder="请输入验证码" placeholder-class="placeholder" @input="editCode" v-model="code"/>
		<text class="btn f_34" :class="{opacity: trueCode}" @click="next">确认</text>
		<text class="tips f_20" v-if="num > 0">{{num}}s后重新获取</text>
		<text class="tips f_20" v-else @click='reGet'>点击重新获取</text>
	</view>
</template>

<script>
	export default {
		name: 'codeq',
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				trueCode: false,
				num: 60,
				tel: '',
				interval: '',
				code: ''
			};
		},

		methods: {
			next () {
				if (this.trueCode) {
					this.$axios({ url: 'api/auth/regLogin', method: 'post', data: { account: this.tel, code: this.code } }).then(res =>{
						uni.showToast({ title: res.msg, icon: "none" })
						if(res.code == 1){
							setTimeout(function(){
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1500)
						}
					})	
				}else{
					uni.showToast({ title: '请输入六位数验证码',icon: 'none' })
				}	
			},
			editCode (e) { // 输入验证码时
				var reg = new RegExp('^(-[0-9]|[1-9])[0-9]{5}$');
				if((reg.test(e.detail.value))){
					this.trueCode = true
				}
			},
			getCode (tel) { // 获取验证码
				this.$axios({ url: 'auth/phoneCode', method: 'post', data: { mobile: tel }}).then(res =>{
					if(res.code == 1){
						uni.showToast({ title: res.msg, icon: "none" })
					}
				})
			},
			reGet () { // 重新获取验证码
				this.num = 60
				this.getCode(this.tel)
				this.setInter()
			}, 
			setInter () { // 开启定时器
				const that = this
				this.interval = setInterval(function(){
					that.num -= 1
					if(that.num == 0){
						clearInterval(that.interval)
					}
				}, 1000)
			},
			back () {
				uni.navigateBack()
			}
		},
		onLoad(options) {
			this.tel = options.tel
			console.log(options)
			this.getCode(this.tel)
			this.setInter()
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
