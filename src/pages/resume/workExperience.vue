<template>
	<view class="">
		<view class="form">
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>公司名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">44</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>岗位名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">10-20k</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>在职时间</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">2012.09--2015.12</text>
			</view>
			<view class="list" @click="toNext">
				<view class="title f_24 c_999 row just_btw"><text>工作描述</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">本科</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'jobIntension',
		data() {
			return {
				
			};
		},
		methods:{
			toNext () {
				uni.navigateTo({
					url: '/pages/resume/selfAssessment?title=' + '工作描述'
				})
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
	@import '../../style/common/mixin.less';
	.form{
		margin: 24upx 0;
		background: white;
		padding: 0 32upx 0 44upx;
		.list{
			border-bottom: @g_border;
			padding-bottom: 22upx;
			.title{
				.h(63upx, 63upx, none)
			}
		}
	}
</style>
