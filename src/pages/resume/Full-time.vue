<template>
	<view class="FullTime">
		<view class="topDetail">
			<view class="row">
				<image class="avatar" src="/static/icon/moren.png" mode=""></image>
				<view class="column just_btw">
					<text class="f_32">人名 <text class="f_20 c_999">/先生</text></text>
					<text class="c_666 f_24">27岁 男 非学生 本科</text>
				</view>
			</view>
			<view class="lists column f_24">
				<text class="list">电话：15789562312</text>
				<text class="list">邮箱：15789562@qq.com</text>
				<text class="list">现居住城市：江西 赣州</text>
				<text class="list">户口所在地：赣州</text>
			</view>
			<text class="edit globelColor" @click="toEditInformation">编辑</text>
		</view>
		<view class="content">
			<view class="part">
				<text class="title f_30">求职意向</text>
				<view class="column center">
					<navigator class="partTop column" url="/pages/resume/jobIntension">
						<text>产品经理 10-20k<text class="iconfont icon-youjiantou"></text></text>
						<text class="f_22 c_999 address">赣州 章贡区</text>
					</navigator>
					<text class="btn" @click="toNext('/pages/resume/jobIntension')">添加求职意向</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">教育经历</text>
				<view class="column center">
					<view class="partTop column">
						<text>中国大学<text class="iconfont icon-youjiantou"></text></text>
						<text class="time f_22 c_999">2017.06-2019.05</text>
						<text class="f_22 c_999 address">服装设计专业</text>
					</view>
					<view class="partTop column">
						<text>中国大学<text class="iconfont icon-youjiantou"></text></text>
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
						本人是设计专业毕业生，熟练手绘，熟练cad,3dmax,vray,photoshop等设计软件，熟练办公软件。
					</view>
					<text class="btn" @click="toNext('/pages/resume/selfAssessment')">添加自我评价</text>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Full-time',
		data() {
			return {
				video: ''
			};
		},
		methods:{
			toEditInformation () { //修改个人信息
				uni.navigateTo({
					url: '/pages/resume/editInformation'
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
		},
		onLoad() {
			console.log('onload')
		},
		onBackPress(e){
			
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import url("../../style/resume/fullTime");
</style>
