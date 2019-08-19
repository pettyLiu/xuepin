<template>
	<view class="FullTime" v-if="detail">
		<view class="topDetail">
			<view class="row">
				<image class="avatar" :src="imgUrl + detail.avatar" mode=""></image>
				<view class="column just_btw">
					<text class="f_32">{{detail.name}} <text class="f_20 c_999">/{{detail.sex=='男'?'先生':'女士'}}</text></text>
					<text class="c_666 f_24">{{detail.age}}岁 {{detail.identity}} {{detail.edu_level}}</text>
				</view>
			</view>
			<view class="lists column f_24">
				<text class="list">电话：{{detail.contact_tel}}</text>
				<text class="list">邮箱：{{detail.email}}</text>
				<text class="list">现居住城市：{{detail.province}} {{detail.city}}</text>
				<text class="list">户口所在地：{{detail.census_city!='null'?detail.census_city:'暂未填写'}}</text>
			</view>
			<text class="edit globelColor" @click="toEditInformation">编辑</text>
			<text class="edit1 globelColor" @click="setLocal" v-if="!detail.check">设为默认简历</text>
			<text class="edit1 globelColor" v-else>默认简历</text>
		</view>
		<view class="content">
			<view class="part">
				<text class="title f_30">求职意向</text>
				<view class="column center">
					<view class="partTop column" @click="toJobIntension"
						v-if="detail.expect_jobs[0]!=''">
						<text>
							<text class="expectItem" v-for="item in detail.expect_jobs" :key="item.name">{{item.name}} / </text>
							 {{detail.salary}}
							<text class="iconfont icon-youjiantou"></text>
						</text>
						<text class="f_22 c_999 address" v-for="item in detail.desired_area" :key="item.code">{{item.name}}</text>
					</view>
					<text class="btn" @click="toNext('/pages/resume/jobIntension')" v-else>添加求职意向</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">教育经历</text>
				<view class="column center">
					<view class="partTop column" v-for="(item, index) in detail.eduLines" :key="index"
					@click="toEducation(2, index)">
						<text>{{item.finish_school}}<text class="iconfont icon-youjiantou"></text></text>
						<text class="time f_22 c_999">{{item.edu_levelName}} {{item.text7}}</text>
						<text class="f_22 c_999 address">{{item.major}}</text>
					</view>
					<text class="btn" @click="toEducation(1)">添加教育经历</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">工作经历</text>
				<view class="column center">
					<view class="partTop column" v-for="(item, index) in detail.workLines" 
					:key="index" @click="toWorkExperience(2, index)">
						<text>{{item.company}}<text class="iconfont icon-youjiantou"></text></text>
						<text class="time f_22 c_999">{{item.project_exp}}</text>
						<text class="f_22 c_999 address">{{item.do_work}}</text>
						<view class="f_22 c_666">
							{{item.work_desc}}
						</view>
					</view>
					<text class="btn" @click="toWorkExperience(1)">添加工作经历</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">视频简介</text>
				<view class="column center">
					<view class="videoList" v-if="video != ''">
						<video :src="video" controls ></video>
						<cover-view class="iconfont icon-delete" @click="delVideo"></cover-view>
					</view>
					<text class="btn" @click="addVideo">添加视频简介</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">自我评价</text>
				<view class="column center">
					<view class="partTop f_26 slef" v-if="detail.intro" @click="toSelf(detail.intro)">
						<text class="iconfont icon-youjiantou"></text>
						{{detail.intro}}
					</view>
					<text class="btn" @click="toSelf('')" v-else>添加自我评价</text>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import config from '../../lib/config'
	export default {
		name: 'Full-time',
		data() {
			return {
				video: '',
				detail: '',
				imgUrl: config.imgUrl
			};
		},
		methods:{
			getResumeDetail () {
				const that = this
				that.$axios({
					url: 'api/user/showFullResume',
					data: {
						id: that.id
					}
				}).then(res => {
					that.detail = res.data
				})
			},
			toEditInformation () { //修改个人信息
				uni.navigateTo({
					url: '/pages/resume/editInformation'
				})
			},
			toJobIntension () { // 跳转到职位详情
				const expect_jobs = this.detail.expect_jobs
				this.$store.commit('changeIntentsion', expect_jobs)
				console.log(this.detail.desired_area[0])
				uni.navigateTo({
					url: '/pages/resume/jobIntension?id=' + this.id + '&type=2' +
					 '&desired_area=' + JSON.stringify(this.detail.desired_area[0]) +'&salary=' + this.detail.expect_salary,
					animationType: 'slide-in-bottom',
					animationDuration: 200
				})
			},
			toEducation (type, index) { // 教育经历
				var url = ''
				if(type == 1){ // 添加
					url = '/pages/resume/educationExperience?eduLines=' + JSON.stringify(this.detail.eduLines) + '&id=' + this.id	
				}else{ //修改
					url = '/pages/resume/educationExperience?eduLines=' + JSON.stringify(this.detail.eduLines) + '&index=' + index + '&id=' + this.id
				}
				uni.navigateTo({
					url: url,
					animationType: 'slide-in-bottom',
					animationDuration: 200
				})
			},
			toWorkExperience (type, index) { // 工作经历
				var url = ''
				if(type == 1){ // 添加
					url = '/pages/resume/workExperience?workLines=' + JSON.stringify(this.detail.workLines)	 + '&id=' + this.id
				}else{ //修改
					url = '/pages/resume/workExperience?workLines=' + JSON.stringify(this.detail.workLines) + '&index=' + index + '&id=' + this.id
				}
				uni.navigateTo({
					url: url,
					animationType: 'slide-in-bottom',
					animationDuration: 200
				})
			},
			toSelf (data) { // 自我评价
				uni.navigateTo({
					url: '/pages/resume/selfAssessment?info=' + data + '&id=' + this.id,
					animationType: 'slide-in-bottom',
					animationDuration: 200
				})
			},
			toNext (url) { // 跳转到下一页
				uni.navigateTo({
					url: url,
					animationType: 'slide-in-bottom',
					animationDuration: 200
				})
			},
			addVideo () { // 上传视频
				const that = this
				uni.chooseVideo({
					success(res) {
						console.log(res)
						that.video = res.tempFilePath
						console.log(res.tempFilePath)
						// that.$axios({
						// 	url: 'aetherupload/preprocess',
						// 	method: 'post',
						// 	data:{
						// 		file_name: '5c7a0ad4c35d3b3dcd6e054c31ed4211.mp4',
						// 		file_size: 2242053,
						// 		file_hash: '3dd1dd30ecd6da452444ef53529eb8cb',
						// 		group: 'file',
						// 	}
						// }).then(res => {
						// 	console.log(res)
						// })
						uni.uploadFile({
							url: config.baseUrl + 'aetherupload/uploading',
							filePath: that.video,
							name: 'file',
							fileType: 'video',
							success: (uploadFileRes) => {
								console.log(JSON.parse(uploadFileRes.data) );

							}
						});
					}
				})
			},
			delVideo () { // 删除视频
				const that = this
				uni.showModal({
					content: '确定删除该视频？',
					success(res) {
						if(res.confirm){
							that.video = ''
						}
					}
				})
			},
			setLocal (){
				const that = this
				that.$axios({
					url: 'ucenter/checked',
					method: 'post',
					data: {
						id: this.id
					}
				}).then( res => {
					uni.showToast({ title: '设置成功' })
					this.detail.check = true
				})
			}
		},
		onShow(){
			console.log('onshow')
			this.getResumeDetail()
		},
		onLoad(options) {
			this.userInfo = this.information.userInfo
			this.id = options.id
			console.log(options)
			this.getResumeDetail()
		},
		onBackPress(e){
			
		},
		computed:{
			...mapState(['information'])
		},
	}
</script>

<style lang="less">
@import url("../../style/resume/fullTime");
</style>
