<template>
	<view class="FullTime" v-if="detail">
		<view class="topDetail">
			<view class="row">
				<image class="avatar" :src="detail.avatar" mode=""></image>
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
		</view>
		<view class="content">
			<view class="part">
				<text class="title f_30">求职意向</text>
				<view class="column center">
					<view class="partTop column" @click="toJobIntension"
						v-if="detail.expect_jobs[0]!=''">
						<text>
							<text class="expectItem" v-for="item in detail.expect_jobs" :key="item">{{item}} / </text>
							 {{detail.expect_salary}}
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
					<view class="partTop column" v-for="(item, index) in detail.eduLines" :key="index">
						<text>{{item.finish_school}}<text class="iconfont icon-youjiantou"></text></text>
						<text class="time f_22 c_999">2017.06-2019.05</text>
						<text class="f_22 c_999 address">服装设计专业</text>
					</view>
					<text class="btn" @click="toNext('/pages/resume/educationExperience')">添加教育经历</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">工作经历</text>
				<view class="column center">
					<view class="partTop column">
						<text>赣州公司<text class="iconfont icon-youjiantou"></text></text>
						<text class="time f_22 c_999">2017.06-2019.05</text>
						<text class="f_22 c_999 address">web前端</text>
						<view class="f_22 c_666">
							1.负责公司项目2.企业业绩
						</view>
					</view>
					<text class="btn" @click="toNext('/pages/resume/workExperience')">添加工作经历</text>
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
					<view class="partTop f_26">
						<text class="iconfont icon-youjiantou"></text>
						{{detail.intro}}
					</view>
					<text class="btn" @click="toNext('/pages/resume/selfAssessment')">添加自我评价</text>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'Full-time',
		data() {
			return {
				video: '',
				detail: ''
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
				var intentsion = {}
				// intentsion.expect_jobs = detail.expect_jobs
				// intentsion.expect_salary = detail.expect_salary
				// intentsion.e
				const expect_jobs = this.detail.expect_jobs.map( item => ({name: item}))
				console.log(expect_jobs)
				this.$store.commit('changeIntentsion', expect_jobs)
				uni.navigateTo({
					url: '/pages/resume/jobIntension',
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
						that.video = res.tempFilePath
						console.log(res.tempFilePath)
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
