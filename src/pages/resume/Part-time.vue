<template>
	<view class="PartTime" v-if="detail">
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
			<text class="edit1 globelColor" @click="setLocal" v-if="checked=='null'">设为默认简历</text>
			<text class="edit1 globelColor" v-else>默认简历</text>
		</view>
		<view class="content">
			<view class="part">
				<text class="title f_30">求职意向</text>
				<view class="column center">
					<view class="partTop column" @click="toJobIntension"
						v-if="detail.expect_jobs[0].id!=''">
						<text>
							<text class="expectItem" v-for="item in detail.expect_jobs" :key="item.name">{{item.name}} / </text>
								{{detail.salary}}
							<text class="iconfont icon-youjiantou"></text>
						</text>
						<text class="f_22 c_999 address" v-for="item in detail.desired_area" :key="item.code">{{item.name}}</text>
					</view>
				<text class="btn" @click="toNext()" v-else>添加求职意向</text>
				</view>	
			</view>
			<view class="part">
				<text class="title f_30">自我评价</text>
				<view class="column center">
					<view class="partTop slef f_26" @click="toSelf(detail.intro)" v-if="detail.intro">
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
	import config from '../../lib/config'
	export default {
		name: 'Part-time',
		data() {
			return {
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
				uni.navigateTo({
					url: '/pages/resume/jobIntension?id=' + this.id  + '&type=2' + '&alias=' + 'part_alias' +
					 '&desired_area=' + JSON.stringify(this.detail.desired_area[0]) +'&salary=' + this.detail.expect_salary,
					animationType: 'slide-in-bottom',
					animationDuration: 200
				})
			},
			toNext (url) { // 跳转到下一页
				uni.navigateTo({
					url: '/pages/resume/jobIntension?alias=' + 'part_alias' + '&id=' + this.id,
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
			setLocal () { // 设置为默认简历
				const that = this
				that.$axios({
					url: 'api/resume/setDefaultResume',
					method: 'get',
					data: {
						resume_id: this.id
					}
				}).then( res => {
					uni.showToast({ title: '设置成功' })
					this.checked = true
				})
			}
		},
		onShow(){
			this.getResumeDetail()
		},
		onLoad(options) {
			this.id = options.id
			this.checked = options.checked
			this.getResumeDetail()
		}
	}
</script>

<style lang="less">
@import url("../../style/resume/fullTime");
</style>
