<template>
	<view class="">
		<view class="form">
			<view class="list" @click="showIntension" >
				<view class="title f_24 c_999 row just_btw"><text>期望职位</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">44</text>
			</view>
			<view class="list">
				<picker :range="jobIntension" :value="jobIntensionIndex">
					<view class="title f_24 c_999 row just_btw"><text>期望薪资</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{jobIntension[jobIntensionIndex]}}</text>
				</picker>
			</view>
			<view class="list">
				<picker :range="areaIntension" :value="areaIntensionIndex" mode=multiSelector>
					<view class="title f_24 c_999 row just_btw"><text>期望区域</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">赣州 章贡区</text>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'jobIntension',
		data() {
			return {
				jobIntension:['1-2k','7-10k'],
				jobIntensionIndex: 0,
				areaIntension: [['赣州'],['会餐','瑞金']],
				areaIntensionIndex: 0,
				show: false
			};
		},
		methods:{
			showIntension () {
				uni.navigateTo({
					url: '/pages/common/chooseIntension'
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
