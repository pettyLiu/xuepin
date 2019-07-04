<template>
	<view class="signOn">
		<view class="top" :style="{paddingTop: statusBarHeight + 'px'}">
			<view class="naviBar row just_btw">
				<text class="iconfont icon-jiantou3" @click="back"></text>
				<text>签到</text>
				<text @click="toNext">兑换</text>
			</view>
			<image class="bg" src="/static/icon/bg1.png" mode=""></image>
			<view class="signOnDetail row just_btw ali_center">
				<view class="column">
					<text class="f_32 c_d6">我的积分</text>
					<text class="f_72">50</text>
				</view>
				<text class="iconfont icon-youjiantou"></text>
			</view>
			<text class="tips f_26 c_d6" v-if="signOnDay">Hi,您已签到了{{signOnDay}}天了哦~</text>
		</view>
		<view class="calendar column">
			<text class="f_34 tips" v-if="signOnDay">本月已累计签到{{signOnDay}}天</text>
			<text class="f_34 tips" v-else>本月暂无签到</text>
			<text class="f_26 c_333">{{currentMonth}}</text>
			<calendar :selected="data" v-on:checkIn="checkIn"></calendar>
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
				signOnDay: 0
			};
		},
		methods:{
			back () { // 返回
				uni.navigateBack()
			},
			checkIn () { //签到
				this.signOnDay += 1
			},
			toNext () {
				uni.navigateTo({
					url: '/pages/user/excharge'
				})
			}
		},
		onLoad() {
			const tt = getNowFormatDate()
			this.data = this.data.concat(tt.currentdate)
			this.currentMonth = tt.currentMonth
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
