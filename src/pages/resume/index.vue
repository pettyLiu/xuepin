<template>
	<view class="resumeIndex">
		<view class="resumeList" @click="toResumeDetail('/pages/resume/Full-time')">
			<text class="border"></text>
			<text class="resumeType f_30 globelColor">全职简历</text>
			<view class="resumeDetails row just_btw">
				<view class="resumeLeft">
					<view class="row">
						<image class="avatar" src="/static/icon/moren.png" mode=""></image>
						<view class="column">
							<text class="nickName f_32">人名</text>
							<text class="f_26 c_666">27岁 男 非学生 本科</text>
						</view>
					</view>
					<view class="resumeDetail">
						<text>求职意向</text>
						<view class="row intentions c_999 f_24">
							<text class="intention">产品经理</text>
							<text class="intention">设计师</text>
						</view>
					</view>
				</view>
				<view class="resumeRight column just_arw center">
					<text class="globelColor f_72">100%</text>
					<text>去预览</text>
				</view>
			</view>
		</view>
		<view class="resumeList" @click="toResumeDetail('/pages/resume/Part-time')">
			<text class="border"></text>
			<text class="resumeType f_30 globelColor">兼职简历</text>
			<view class="resumeDetails row just_btw">
				<view class="resumeLeft">
					<view class="row">
						<image class="avatar" src="/static/icon/moren.png" mode=""></image>
						<view class="column">
							<text class="nickName f_32">人名</text>
							<text class="f_26 c_666">27岁 男 非学生 本科</text>
						</view>
					</view>
					<view class="resumeDetail">
						<text>求职意向</text>
						<view class="row intentions c_999 f_24">
							<text class="intention">产品经理</text>
							<text class="intention">设计师</text>
						</view>
					</view>
				</view>
				<view class="resumeRight column just_arw center">
					<text class="globelColor f_72">30%</text>
					<text>去编辑</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'resume-index',
		data() {
			return {
				
			};
		},
		methods:{
			toResumeDetail(url){
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
@import url("../../style/resume/index");
</style>
