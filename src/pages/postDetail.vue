<template>
	<view class="postDetail">
		<view class="top">
			<view class="row just_btw">
				<text class="f_48">技术总监</text>
				<text class="globelColor f_30">10-20k</text>
			</view>
			<text class="other f_20">全职 经验不限 学历不限</text>
			<view class="address" @click="toAddress">
				<text><text class="iconfont icon-weizhi"></text>赣州市章贡区 1.5km</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="content">
			<text class="title">职位信息</text>
			<view class="postDescribe">
				这里填写的是职位描述
			</view>
		</view>
		<view class="footer">
			<text class="title">公司信息</text>
			<view class="row companyTxt" @click="toCompany">
				<image class="companyAvatar" src="/static/image/banner3.png" mode=""></image>
				<view class="tocompany column just_btw">
					<text>赣州公司</text>
					<text>100-200人 互联网</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
		</view>
		<button type="primary" class="btn" @click="sendingResume">投递简历</button>
	</view>
</template>

<script>
	export default {
		name: 'postDetail',
		data() {
			return {
				collect: false
			};
		},
		methods:{
			toAddress () {
				uni.openLocation({
					latitude: 25.854021,
					longitude: 114.928111,
					name: '江西理工大学',
					address: '红旗大道86号',
					success: function (res) {
					}
				});
			},
			toCompany () {
				uni.navigateTo({
					url: '/pages/companyDetail'
				})
			},
			sendingResume () {
				uni.setNavigationBarTitle({
					title: '新的标题'
				});
			}
		},
		computed:{
		},
		onNavigationBarButtonTap (val){
			if(val.index == 0){
				console.log('点击了分享')
			}else{
				console.log('点击了收藏')
				var webView = this.$mp.page.$getAppWebview()
				if(val.index == 0){
					console.log('点击了分享')
				}else{
					if(collect){ // 更换收藏图标
						webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
					}else{
						webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
					}
					this.collect = !this.collect
					uni.showToast({ title: this.collect ? '收藏成功' : '取消收藏', icon: "none" })
				}
			}
		},
	}
</script>

<style lang="less">
	@import '../style/personal/postDetail';
</style>
