<template>
	<view class="setting">
		<view class="form">
			<view class="list" @click="toNext('/pages/setting/changeTel')">
				<view class="title f_24 c_999 row just_btw"><text>更换手机号码</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{tel}}</text>
			</view>
			<!-- <view class="list" @click="toNext('/pages/setting/changePassword')">
				<view class="title f_24 c_999 row just_btw"><text>登录密码</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">未设置</text>
			</view> -->
			<view class="list" @click="toNext('/pages/setting/authorize')">
				<view class="title f_24 c_999 row just_btw"><text>社交账号绑定</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30" v-if="!datas.vx && !datas.qq">未绑定</text>
				<text class="f_30" v-if="datas.vx">已绑定微信 </text>
				<text class="f_30" v-if="datas.qq">已绑定QQ</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'setting-index',
		data() {
			return {
				tel: uni.getStorageSync('tel'),
				datas: ''
			};
		},
		methods:{
			toNext (url) {
				uni.navigateTo({
					url: url
				})
			},
			getData () {
				const that = this
				that.$axios({
					url: 'api/user/bindInfo',
					method: 'post',
				}).then(res => {
					that.datas = res.data
				})
			},
		},
		onShow () {
			this.tel = uni.getStorageSync('tel')
			this.getData()
		},
		computed:{
		},
	}
</script>
<style lang="less">
@import '../../style/setting/index';
</style>
