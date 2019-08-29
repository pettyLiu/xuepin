<template>
	<view class="resumeDetail" v-if="detail">
        <view class="resumeTop row ali_center">
            <image class="avatar" :src="imgUrl + detail.avatar" />
            <view>
                <text>{{detail.name}}</text>
                <view class="f_24 marginCent">
                    <text class="borderRight">{{detail.sex}}</text>
                    <text class="borderRight">{{detail.age}}岁</text>
                    <text class="">{{detail.edu_level}}</text>
                </view>
                <view class="f_20 c_666">
                    <text class="borderRight" v-if="detail.work_experience">{{detail.work_experience}}</text>
                    <text class="borderRight">籍贯 {{detail.census_city}}</text>
                    <text class="">现居 {{detail.city}}</text>
                </view>
            </view>
        </view>
		<view class="globalMargin column">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text>求职意向</text>
			</view>
			<text v-if="show_status">联系方式：{{detail.contact_tel}}</text>
			<text v-else>联系方式：*********** <text class="f_20 red">(获取联系方式需扣除金币)</text></text>
			<text>期望职位：{{detail.expect_jobs}}</text>
			<text>期望薪资： {{detail.expect_salary}}</text>
			<text>居住地：{{detail.province}} {{detail.city}} <text v-if="detail.district!='null'">{{detail.district}}</text></text>
		</view>
		<view class="globalMargin column" v-if="detail.vido">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text >视频简历</text>
			</view>
			<video :src="videoUrl + detail.vido" class="resumeVideo" v-if="detail.vido"></video>
			<text v-else>暂无上传视频简历</text>
		</view>
		<view class="globalMargin column" v-if="detail.workLines&&detail.workLines.length > 0">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text>工作经历</text>
			</view>
			<view class="timeLines column" v-for="(item, index) in detail.workLines" :key="index">
				<text>{{item.company}}</text>
				<text class="c_999 f_20">{{item.project_exp}}</text>
				<text class="f_24">{{item.do_work}}</text>
				<text>{{item.work_desc}}</text>
			</view>	
		</view>
		<view class="globalMargin column" v-if="detail.eduLines&&detail.eduLines.length > 0">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text>教育经历</text>
			</view>
			<view class="timeLines column" v-for="(item, index) in detail.eduLines" :key="index">
				<text>{{item.school}}</text>
				<text class="c_999 f_20">{{item.text7}}</text>
				<text class="f_24">{{item.edu_levelName}} {{item.major}}</text>
			</view>	
		</view>
		<view class="globalMargin column"  v-if="detail.intro">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text>自我介绍</text>
			</view>
			<text>{{detail.intro}}</text>
		</view>
		<view class="row just_arw btns">
			<text class="btn color1" @click="notSuit" v-if="way == 1 && (status == 1 || status == -1)">不合适</text>
			<text class="btn color1" @click="notSuit" v-if="way == 1 && status == 2">已标记不合适</text>
			<text class="btn color2" @click="invite" v-if="way == 1 && (status == 1 || status == -1)">邀请面试</text>
			<text class="btn color2" @click="invite" v-if="way == 1 && status == 4">已邀请面试</text>
			<text class="btn color3" @click="getTel" v-if="!show_status">获取联系方式</text>
		</view>
	</view>
</template>

<script>
	import config from '../lib/config'
	export default {
		name: 'resumeDetail',
		data() {
			return {
				collect: false,
				detail: '',
				imgUrl: config.imgUrl,
				show_status: false,
				way: '',
				videoUrl: config.baseUrl,
				status: ''
			};
		},
		onLoad (options) {
			this.id = options.id
			var url = ''
			this.type = options.type // 简历类型 1为全职
			// type还要传值，null为测试数据
			url = this.type == 1 ? 'api/resume/showFullResume' : 'api/resume/showPartResume'
			if(options.way){
				this.way = options.way // 从何处点击进去，消息还是其他界面,判断其他按钮的显隐
				// 从消息列表进入详情，需请求不同接口
				url = 'api/enterprise/showMessageResume'
				this.job_id = options.job_id
			}
			this.getDetail(url)
		},
		methods:{
			notSuit () { // 不合适
				const that = this
				that.$axios({
					url: 'api/enterprise/messageResumeUnsuitable',
					method: 'post',
					data: {
						id: that.id
					}
				}).then(res => {
					if(res.code == 1){
						uni.showToast({ title: '已将该简历标记为不合适', icon: 'none' })
					}
				})
			},
			invite () { // 邀请面试，参数有问题
				const that = this
				that.$axios({
					url: 'api/enterprise/sendInterview',
					method: 'post',
					data: {
						resume_id: that.id,
						job_id: that.job_id,
						// source: 1
					}
				}).then(res => {
					if(res.code == 1){
						uni.showToast({ title:'邀请面试成功，请尽快电话通知面试！', icon: 'none' })
					}
				})
			},
			getTel () { // 获取联系方式
				const that = this
				const info = uni.getStorageSync('userInfo')				
				that.$axios({
					url: 'api/enterprise/showPhone',
					method: 'post',
					data: {
						resume_id: that.id
					}
				}).then(res => {
					if(res.code == 1){
						uni.showToast({ title: '已获取联系方式！' + that.detail.contact_tel, icon: 'none' })
					}else{
						uni.showModal({
							title: '提示',
							content: res.msg,
							confirmText: '充值',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									uni.navigateTo({
										url: '/pages/user/goldRecharge'
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}						
				})
			},
			getDetail (url) {
				const that = this
				const data = this.way ? { id: that.id, job_id: that.job_id } : { id: that.id }
				that.$axios({
					url: url,
					method: 'post',
					data: {
						...data
					}
				}).then(res => {
					console.log(res)
					var datas = ''
					if(res.code == 1){
						datas =  this.way ==  1 ? res.data.original.data : res.data
						console.log(datas)
						that.detail = datas.resumeList
						that.collect = datas.flag
						that.show_status = datas.show_status
						that.status = datas.status				
						// #ifdef APP-PLUS
						var webView = that.$mp.page.$getAppWebview()
						if (that.collect) { // 更换收藏图标
							webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
						}else {
							webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
						}
						// #endif
					}	
				})
			},
		},
		computed: {
		},
		onNavigationBarButtonTap (val){
			const that = this
			console.log('点击了收藏')
			var url = ''
			if(!this.collect){ // 更换收藏图标
				url = 'api/user/createResumeCollection'
			}else{
				url = 'api/user/deleteResumeCollection'
			}
			that.$axios({
				url: url,
				method: 'post',
				data: {
					id: that.id
				}
			}).then(res => {
				if(res.code == 1){	
					var webView = that.$mp.page.$getAppWebview()
					that.collect = !that.collect
					if(that.collect){ // 更换收藏图标
						webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
					}else{
						webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
					}		
					uni.showToast({ title: that.collect ? '收藏成功' : '取消收藏', icon: "none" })
				}
			})	
		},
	}
</script>

<style lang="less">
	@import '../style/company/resumeDetail';
</style>
