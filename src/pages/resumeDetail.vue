<template>
	<view class="resumeDetail" v-if="detail">
        <view class="resumeTop row ali_center">
            <image class="avatar" src="" />
            <view>
                <text>{{detail.name}}</text>
                <view class="f_24 marginCent">
                    <text class="borderRight">{{detail.sex}}</text>
                    <text class="borderRight">{{detail.age}}岁</text>
                    <text class="">{{detail.edu_level}}</text>
                </view>
                <view class="f_20 c_666">
                    <text class="borderRight">{{detail.work_experience}}</text>
                    <text class="borderRight">籍贯 {{detail.census_city}}</text>
                    <text class="">现居 {{detail.city}}</text>
                </view>
            </view>
        </view>
		<view class="globalMargin column">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text >求职意向</text>
			</view>
			<text>联系方式：{{detail.contact_tel}}</text>
			<text>期望职位：{{detail.expect_jobs}}</text>
			<text>期望薪资： {{detail.expect_salary}}</text>
			<text>居住地：{{detail.province}} {{detail.city}} {{detail.district}}</text>
		</view>
		<view class="globalMargin column">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text >视频简历</text>
			</view>
			<video :src="detail.vido" class="resumeVideo" v-if="detail.vido"></video>
			<text v-else>暂无上传视频简历</text>
		</view>
		<view class="globalMargin column">
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
		<view class="globalMargin column">
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
		<view class="globalMargin column">
			<view class="listTitle">
				<text class="listTitleLine"></text>
				<text>自我介绍</text>
			</view>
			<text>{{detail.intro}}</text>
		</view>
		<view class="row just_arw btns">
			<text class="btn color1" @click="notSuit">不合适</text>
			<text class="btn color2" @click="invite">邀请面试</text>
			<text class="btn color3" @click="getTel">获取联系方式</text>
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
			};
		},
		onLoad (options) {
			this.id = options.id
			this.way = options.way // 从何处点击进去，消息还是其他界面,判断其他按钮的显隐
			this.type = options.type // 简历类型
			// type还要传值，null为测试数据
			const url = this.type == null ? 'api/resume/showFullResume' : 'api/resume/showPartResume'
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

				})
			},
			invite () { // 邀请面试，参数有问题
				const that = this
				that.$axios({
					url: 'api/enterprise/sendInterview',
					method: 'post',
					data: {
						id: that.id
					}
				}).then(res => {
					
				})
			},
			getTel () { // 获取联系方式
				const that = this
				const info = uni.getStorageSync('userInfo')
				uni.showModal({
					title: '提示',
					content: '如需获取求职者联系方式需要扣除',
					confirmText: '充值',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				that.$axios({
					url: 'api/enterprise/showPhone',
					method: 'post',
					data: {
						resume_id:22
					}
				}).then(res => {
					uni.showToast({ title: '已获取联系方式！' + that.tel, icon: 'none' })
				})
			},
			getDetail (url) {
				console.log(22222222222)
				const that = this
				that.$axios({
					url: url,
					method: 'post',
					data: {
						id: that.id
					}
				}).then(res => {
					console.log(res)
					that.detail = res.data.resumeList
					that.collect = res.data.flag
					// #ifdef APP-PLUS
					var webView = that.$mp.page.$getAppWebview()
					if(that.collect){ // 更换收藏图标
						webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
					}else{
						webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
					}
					// #endif
				})
			},
		},
		computed:{
		},
		onNavigationBarButtonTap (val){
			const that = this
			console.log('点击了收藏')
			var webView = this.$mp.page.$getAppWebview()
			this.collect = !this.collect
			var url = ''
			uni.showToast({ title: that.collect ? '收藏成功' : '取消收藏', icon: "none" })
			if(this.collect){ // 更换收藏图标
				webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
				url = 'api/user/createResumeCollection'
			}else{
				url = 'api/user/deleteResumeCollection'
				webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
			}
			that.$axios({
				url: url,
				method: 'post',
				data: {
					id: that.id
				}
			}).then(res => {
				console
				if(res.code == 1){			
					uni.showToast({ title: that.collect ? '收藏成功' : '取消收藏', icon: "none" })
				}
			})	
		},
	}
</script>

<style lang="less">
	@import '../style/company/resumeDetail';
</style>
