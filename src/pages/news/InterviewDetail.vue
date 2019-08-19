
<template>
	<view class="interviewDetail">
		<view class="detailTop row just_btw">
			<view class="row">
				<image class="avatar" src="/static/image/banner3.png" mode=""></image>
				<view class="column just_arw">
					<text class="name">赣州公司</text>
					<text class="post">岗位：技术总监</text>
				</view>
			</view>
			<text class="saraly globelColor">10-20k</text>
		</view>
		<view class="detailContent">
			<view class="degree">
				<!-- status:1已投递2被查看3不合适4邀面试5已接受 -->
				<view class="steps row just_arw">
					<view class="step column ali_center just_btw" :class="{globelColor: status==1}">
						<text class="iconfont icon-duigou1"></text>
						<text>已投递</text>
						<text class="time">6月15日 15:30</text>
					</view>
					<text class="active row center" :class="{tt:status==3}">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<view class="step column ali_center just_btw" :class="{globelColor: status==2}">
						<text class="iconfont icon-duigou1" v-if="status!=1"></text>
						<text class="cir" v-if="status==1"></text>
						<text>已被查看</text>
						<text class="time">6月15日 15:30</text>
					</view>
					<text class="active1 row center"  v-if="status!=3">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<text class="active1 row center"  :class="{tt1:status==3}" v-if="status==3">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<view class="step column ali_center just_btw" :class="{globelColor: status==3}" v-if="status==3">
						<text class="iconfont icon-delete"></text>
						<text>不合适</text>
						<text class="time">6月15日 15:30</text>
					</view>
					<view class="step column ali_center just_btw" :class="{globelColor: status==4}" v-if="status!=3">
						<text class="iconfont icon-duigou1" v-if="status==4"></text>
						<text class="cir" v-if="status!=4"></text>
						<text>邀面试</text>
						<text class="time">6月15日 15:30</text>
					</view>					
					<text class="active2 row center" v-if="status!=3">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<view class="step column ali_center just_btw" :class="{globelColor: status==5}" v-if="status!=3">
						<text class="iconfont icon-duigou1" v-if="status==5"></text>
						<text class="cir" v-if="status!=5"></text>
						<text>已接受</text>
						<text class="time">6月15日 15:30</text>
					</view>
				</view>
			</view>
			<view class="lists" >
				<text class="f_24 tips"  v-if="status==1">您的简历已投递成功</text>
				<text class="f_24 tips"  v-if="status==2">您的简历已被企业查看，请耐心等待!!</text>
				<text class="f_24 tips"  v-if="status==3">不合适原因：已找到合适员工</text>
			</view>
			<view class="lists column"  v-if="status== (4 || 5)">
				<text class="list"><text class="iconfont icon-wj-bjb"></text>谢经理</text>
				<text class="list"><text class="iconfont icon-dianhua"></text>15789562312</text>
				<text class="list"><text class="iconfont icon-shijian"></text>2019-12-23 15:30</text>
				<text class="list" @click="toMap"><text class="iconfont icon-weizhi"></text>赣州开发区<text class="iconfont icon-youjiantou"></text></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'interviewDetail',
		data() {
			return {
				status: 1,
				info: ''
			};
		},
		methods:{
			getMessage () {
				const that = this
				that.$axios({
					url: 'api/user/message',
					data: {
						id: that.id
					}
				}).then(res => {
					console.log(res)
					that.info = res.data
				})
			},
			toMap () {
				uni.openLocation({
					latitude: 25.854021,
					longitude: 114.928111,
					name: '江西理工大学',
					address: '红旗大道86号',
					success: function (res) {
						console.log(res)
						console.log('success');
					}
				});
			}
		},
		computed:{
		},
		onLoad(options) {
			this.id = options.id
			this.getMessage()
			this.status = options.status
		}
	}
</script>

<style lang="less">
	@import url("../../style/personal/interviewDetail");
	.list{
		letter-spacing:0upx
	}
</style>
