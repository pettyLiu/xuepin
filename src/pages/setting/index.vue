<template>
	<view class="setting">
		<view class="form">
			<view class="list" @click="toNext('/pages/setting/changeTel')">
				<view class="title f_24 c_999 row just_btw"><text>更换手机号码</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">15445</text>
			</view>
			<view class="list" @click="toNext('/pages/setting/changePassword')">
				<view class="title f_24 c_999 row just_btw"><text>登录密码</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">未设置</text>
			</view>
			<view class="list" @click="toNext('/pages/setting/authorize')">
				<view class="title f_24 c_999 row just_btw"><text>社交账号绑定</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">未绑定</text>
			</view>
		</view>
		<button type="primary">退出登录</button>
	</view>
</template>

<script>
	export default {
		name: 'setting-index',
		data() {
			return {
				
			};
		},
		methods:{
			toNext (url) {
				uni.navigateTo({
					url: url
				})
			}
		},
		computed:{
		},
	}
</script>
<style lang="less">
@import '../../style/setting/index';
</style>
