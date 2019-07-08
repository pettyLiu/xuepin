<template>
	<view class="changeTelPage">
		<view class="changeTel">
			<view class="row list ali_center">
				<text class="listTit">密码</text>
				<input type="text" value="" placeholder="请输入6-12数字字母组合" placeholder-class="placeholder" v-model="password"/>
			</view>
			<view class="row list ali_center">
				<text class="listTit">验证码</text>
				<input type="text" value="" placeholder="请输入验证码" placeholder-class="placeholder" v-model="code"/>
				<text class="code globelColor f_32">发送验证码</text>
			</view>
		</view>		
		<view class="btn globelColor f_36" @click="confirm">确认更换</view>
	</view>
</template>

<script>
	var graceChecker = require("../../lib/graceChecker.js");
	var rule = [
		{name:"password1", checkType : "password", checkRule:"",  errorMsg:["密码请设置6-12位","请输入数字和字母的组合密码"]},
		{name:"code", checkType : "int", checkRule:"5",  errorMsg:"请输入六位数验证码"}
	];
	export default {
		name: 'changePassword',
		data() {
			return {
				password: '',
				code: ''
			};
		},
		methods:{
			confirm () {
				var formData = { password1: this.password,code: this.code }
				var checkRes = graceChecker.check(formData, rule)
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"})	
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}	
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import '../../style/setting/index';
</style>
