<template>
	<view class="resumeIndex">
		<view class="resumeList" v-for="item in resume" :key="item.category_id"
		@click="toResumeDetail(item.id,item.category_id,item.checked)" >
			<text class="resumeType f_30 globelColor">{{item.catogory}}</text>
			<view class="resumeDetails row just_btw">
				<view class="resumeLeft">
					<view class="row">
						<image class="avatar" :src="imgUrl + item.avatar" mode=""></image>
						<view class="column">
							<text class="nickName f_32">{{item.name}}</text>
							<text class="f_26 c_666">27岁 {{item.sex}} {{item.identity}} {{item.edu_level}}</text>
						</view>
					</view>
					<view class="resumeDetail">
						<text>求职意向</text>
						<view class="row intentions c_999 f_24">
							<text class="intention" v-for="it in item.expect_jobs" :key="it">{{it==''?'暂未填写':it}}</text>
						</view>
					</view>
				</view>
				<view class="resumeRight column just_arw center">
					<text class="globelColor f_72">{{item.count}}</text>
					<!-- <text class="globelColor f_72" v-else>0%</text> -->
					<text>去预览</text>
				</view>
			</view>
		</view>
		<!-- <view class="resumeList" @click="toResumeDetail('/pages/resume/Part-time')">
			<text class="border"></text>
			<text class="resumeType f_30 globelColor">兼职简历</text>
			<view class="resumeDetails row just_btw">
				<view class="resumeLeft">
					<view class="row">
						<image class="avatar" :src="information.userInfo.avatar" mode=""></image>
						<view class="column">
							<text class="nickName f_32">{{information.userInfo.true_name}}</text>
							<text class="f_26 c_666">27岁 {{information.userInfo.sex}} {{information.userInfo.identity}} {{information.userInfo.edu_level}}</text>
						</view>
					</view>
					<view class="resumeDetail">
						<text>求职意向</text>
						<view class="row intentions c_999 f_24" v-if="resume.length != 0">
							<text class="intention">产品经理</text>
							<text class="intention">设计师</text>
						</view>
						<view v-else class="c_999">暂未填写</view>
					</view>
				</view>
				<view class="resumeRight column just_arw center">
					<text class="globelColor f_72" v-if="resume.length != 0">100%</text>
					<text class="globelColor f_72" v-else>0%</text>
					<text>去预览</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import config from '../../lib/config'
	export default {
		name: 'resume-index',
		data() {
			return {
				resume: [],
				imgUrl: config.imgUrl
			};
		},
		methods:{
			toResumeDetail(id, category_id, checked){
				console.log(id)
				console.log(category_id)
				if(category_id == 1){
					uni.navigateTo({
						url: '/pages/resume/Full-time?id=' + id + '&checked=' + checked
					})
				}else{
					uni.navigateTo({
						url: '/pages/resume/Part-time?id=' + id + '&checked=' + checked
					})
				}
				
			},
			getResume () {
				const that = this
				that.$axios({
					url: 'api/user/mineResume',
					method: 'get'
				}).then(res => {
					console.log(res)
					that.resume = res.data.data
				})
			},
			setLocal (id){
				const that = this
				that.$axios({
					url: 'api/resume/setDefaultResume',
					method: 'get',
					data: {
						resume_id: id
					}
				}).then( res => {
					uni.showToast({ title: '设置成功' })
					this.detail.check = true
				})
			}
		},
		onLoad () {
			this.getResume()
			console.log(this.information)
			console.log(uni.getStorageSync('userInfo'))
		},
		computed:{
			...mapState(['information'])
		},
	}
</script>

<style lang="less">
@import url("../../style/resume/index");
</style>
