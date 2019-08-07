<template>
	<view class="signOn">
		<view class="top" :style="{paddingTop: statusBarHeight + 'px'}">
			<view class="naviBar row just_btw">
				<text class="iconfont icon-jiantou3" @click="back"></text>
				<text>签到</text>
				<text @click="toNext('/pages/user/excharge')">兑换</text>
			</view>
			<image class="bg" src="/static/icon/bg1.png" mode=""></image>
			<view class="signOnDetail row just_btw ali_center" @click="toNext('/pages/user/integralRecord')">
				<view class="column">
					<text class="f_32 c_d6">我的积分</text>
					<text class="f_72">{{info.points}}</text>
				</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<text class="tips f_26 c_d6" v-if="signOnDay">Hi,您已签到了{{signOnDay}}天了哦~</text>
		</view>
		<view class="calendar column">
			<text class="f_34 tips" v-if="signOnDay">本月已累计签到{{signOnDay}}天</text>
			<text class="f_34 tips" v-else>本月暂无签到</text>
			<text class="f_26 c_333">{{currentMonth}}</text>
			<calendar :selected="data" :credit_data='credit_data' v-if="credit_data"></calendar>
		</view>
		<view class="masks" v-if="showMask">
			<view class="mask column ali_center just_btw f_30">
				<image src="/static/icon/sec_iocn@2x.png" mode=""></image>
				<text class=" globelColor">签到成功！积分+{{info.credit_day}}</text>
				<text class="btn" @click="confirm">确定</text>
			</view>
		</view>	
	</view>
</template>

<script>  
	import calendar from '../components/calendar'
	import { getNowFormatDate } from '../lib/util.js'
	export default {
		name: 'signOn',
		data() {
			return {
				data: [],
				statusBarHeight: getApp().globalData.statusBarHeight,
				currentMonth: '',
				signOnDay: 0,
				showMask: false,
				info: '',
				credit_data: ''
			};
		},
		methods:{
			back () { // 返回
				uni.navigateBack()
			},
			toNext (url) {
				uni.navigateTo({
					url: url
				})
			},
			confirm () {
				this.showMask = false
			},
			getSignInfo () {
				const that = this
				that.$axios({
					url: 'api/user/report',
					method: 'post'
				}).then(res => {
					console.log(res)
					if(res.data.status == 1){
						that.showMask = true
					}
					that.info = res.data
					that.signOnDay = res.data.credit_data_num
					that.credit_data = res.data.credit_data
				})
			}
		},
		onShow () {
			this.getSignInfo() 
		},
		onLoad() {
			const tt = getNowFormatDate()
			this.data = this.data.concat(tt.currentdate)
			this.currentMonth = tt.currentMonth
			this.getSignInfo()
		},
		computed:{
		},
		components:{
			calendar
		}
	}
</script>

<style lang="less">
@import '../style/signOn/signOn';
</style>
