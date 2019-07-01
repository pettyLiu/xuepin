<template>
	<view class="changeTelPage">
		<view class="changeTel">
			<view class="row list ali_center">
				<text class="listTit">密码</text>
				<input type="text" value="" placeholder="请输入6-12数字字母组合" placeholder-class="placeholder"/>
			</view>
			<view class="row list ali_center">
				<text class="listTit">验证码</text>
				<input type="text" value="" placeholder="请输入验证码" placeholder-class="placeholder"/>
				<text class="code globelColor f_32">发送验证码</text>
			</view>
		</view>		
		<view class="btn globelColor f_36">确认更换</view>
	</view>
	
</template>

<script>
	export default {
		name: 'changePassword',
		data() {
			return {
				
			};
		},
		methods:{
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import '../../style/setting/index';
</style>
