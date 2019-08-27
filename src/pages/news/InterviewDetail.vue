
<template>
	<view class="interviewDetail">
		<view class="detailTop row just_btw">
			<view class="row">
				<image class="avatar" :src="imgUrl + enterprise.logo" mode=""></image>
				<view class="column just_arw">
					<text class="name">{{enterprise.name}}</text>
					<text class="post">岗位：{{job.category}}</text>
				</view>
			</view>
			<text class="saraly globelColor">{{job.salary}}</text>
		</view>
		<view class="detailContent">
			<view class="degree">
				<!-- status:-1已投递1被查看2不合适4邀面试5已接受 -->
				<view class="steps row just_arw">
					<view class="step column ali_center just_btw" :class="{globelColor: status==-1}">
						<text class="iconfont icon-duigou1"></text>
						<text>已投递</text>
						<text class="time">6月15日 15:30</text>
					</view>
					<text class="active row center" :class="{tt:status==2}">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<view class="step column ali_center just_btw" :class="{globelColor: status==1}">
						<text class="iconfont icon-duigou1" v-if="status!=-1"></text>
						<text class="cir" v-if="status==-1"></text>
						<text>已被查看</text>
						<text class="time">6月15日 15:30</text>
					</view>
					<text class="active1 row center"  v-if="status!=2">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<text class="active1 row center"  :class="{tt1:status==2}" v-if="status==2">
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
						<text class="iconfont icon-youjiantou"></text>
					</text>
					<view class="step column ali_center just_btw" :class="{globelColor: status==2}" v-if="status==2">
						<text class="iconfont icon-delete"></text>
						<text>不合适</text>
						<text class="time">6月15日 15:30</text>
					</view>
					<view class="step column ali_center just_btw" :class="{globelColor: status==4}" v-if="status!=2">
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
					<view class="step column ali_center just_btw" :class="{globelColor: status==5}" v-if="status!=2">
						<text class="iconfont icon-duigou1" v-if="status==5"></text>
						<text class="cir" v-if="status!=5"></text>
						<text>已接受</text>
						<text class="time">6月15日 15:30</text>
					</view>
				</view>
			</view>
			<view class="lists" >
				<text class="f_24 tips"  v-if="status==-1">您的简历已投递成功</text>
				<text class="f_24 tips"  v-if="status==1">您的简历已被企业查看，请耐心等待!!</text>
				<text class="f_24 tips"  v-if="status==2">不合适原因：已找到合适员工</text>
			</view>
			<view class="lists column"  v-if="status== (4 || 5)">
				<text class="list"><text class="iconfont icon-wj-bjb"></text>{{job.contact_name}}</text>
				<text class="list"><text class="iconfont icon-dianhua"></text>{{job.contact_tel}}</text>
				<text class="list"><text class="iconfont icon-shijian"></text>{{info.updated_at}}</text>
				<text class="list" @click="toMap"><text class="iconfont icon-weizhi"></text>{{job.work_address}}<text class="iconfont icon-youjiantou"></text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '../../lib/config'
	export default {
		name: 'interviewDetail',
		data() {
			return {
				status: 1,
				info: '',
				enterprise: '',
				job: '',
				imgUrl: config.imgUrl,
				cover: {}
			};
		},
		methods:{
			getMessage () {
				const that = this
				that.$axios({
					url: 'api/user/messageDetail',
					data: {
						id: that.id
					}
				}).then(res => {
					console.log(res)
					that.info = res.data
					that.status = res.data.status
					that.enterprise = res.data.enterprise
					that.job = res.data.job
					that.cover.latitude = Number(res.data.enterprise.addr_code.split(',')[1])
					that.cover.longitude = Number(res.data.enterprise.addr_code.split(',')[0])
					that.cover.name = res.data.enterprise.name
					that.cover.address = res.data.enterprise.address
				})
			},
			toMap () {
				uni.openLocation({
					// latitude: 25.854021,
					// longitude: 114.928111,
					// name: '江西理工大学',
					// address: '红旗大道86号',
					...this.cover,
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
		}
	}
</script>

<style lang="less">
	@import url("../../style/personal/interviewDetail");
	.list{
		letter-spacing:0upx
	}
</style>
