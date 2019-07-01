<template>
	<view class="">
		<view class="form">
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>学校名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">44</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">本科</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>在校时间</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">2012.09--2015.12</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>专业</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">经济专业</text>
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
