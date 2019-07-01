<template>
	<view class="changeTelPage">
		<view class="changeTel">
			<view class="row list ali_center">
				<text class="listTit">+86</text>
				<input type="text" value="" placeholder="请输入新手机号" placeholder-class="placeholder" v-model="tel"/>
			</view>
			<view class="row list ali_center">
				<text class="listTit">验证码</text>
				<input type="text" value="" placeholder="请输入验证码" placeholder-class="placeholder" v-model="code"/>
				<text class="code globelColor f_32" @click="sendCode" v-if="!showSeconds">发送验证码</text>
				<text class="code globelColor f_32" v-if="showSeconds">{{seconds}}秒后重试</text>
			</view>
		</view>		
		<view class="btn globelColor f_36" @click="comfirm">确认更换</view>
	</view>	
</template>

<script>
	export default {
		name: 'changeTel',
		data() {
			return {
				seconds: 60,
				tel: '',
				showSeconds: false,
				interval: '',
				code: ''
			};
		},
		methods:{
			sendCode () { // 发送验证码
				if (!(/^1[34578]\d{9}$/.test(this.tel))) {
					uni.showToast({
						title: '请输入正确电话号码',
						icon: "none"
					})
					return
				}
				this.showSeconds = true
				var that = this
				this.interval = setInterval(function(){
					that.seconds = that.seconds - 1
					if(that.seconds == 0){
						clearInterval(that.interval)
						that.showSeconds = false
					}
				}, 1000)
			},
			comfirm () { // 确认更换
				
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import '../../style/setting/index';
</style>
