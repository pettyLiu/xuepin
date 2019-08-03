<template>
	<view class="excharge">
		<view class="bg"></view>
		<view class="content">
			<view class="top">
				<text>兑换数量</text>
				<input type="number" value="" placeholder="请输入兑换金币数量" placeholder-class="placeholder" @input="changeNum"/>
				<text class="tips f_20">金币和积分的比列是  1:{{Beliel}}</text>
			</view>
			<view class="border row just_btw ali_center">
				<text class="cir1"></text>
				<text class="line" v-for="item in 8" :key="item"></text>
				<text class="cir"></text>
			</view>
			<view class="footer column">
				<text>需要支付积分</text>
				<text class="f_48 num">{{payIntegral}}</text>
				<text class="tips f_20" v-if="showTip">积分不够，总积分为：{{integral}}</text>
			</view>
		</view>
		<view class="btn f_36" :class="{ opacity: showBtn }" @click="excharge">确认兑换</view>
	</view>
</template>

<script>
	export default {
		name: 'excharge',
		data() {
			return {
				showBtn: false,
				Beliel: 0,
				payIntegral: 0,
				integral: 0,
				showTip: false,
				coin: 0
			};
		},
		methods:{
			changeNum (e) {
				this.payIntegral = this.Beliel * e.detail.value
				this.coin = e.detail.value
				const resonable = this.payIntegral > this.integral ? false : true
				this.showTip = !resonable
				if(e.detail.value.length > 0 && resonable){
					this.showBtn = true
				}else{
					this.showBtn = false
				}
			},
			excharge () { // 确认兑换
				if(this.showBtn){
					const that = this
					that.$axios({
						url: 'api/user/creditChangeToCoin',
						method: 'post',
						data: {
							coin: that.coin
						}
					}).then(res => {
						if(res.code == 1){
							uni.showModal({
								title: '提示',
								content: res.msg,
								success: function (res) {
									that.payIntegral = ''
									that.coin = 0
								}
							});
						}
					})
				}
			},
			getBliel () {
				const that = this
				that.$axios({
					url: 'api/user/creditChangeToCoin',
					method: 'post'
				}).then(res => {
					that.Beliel = Number(res.data.creditToCoin)
					that.integral = Number(res.data.points)
				})
			}
		},
		onLoad(){
			this.getBliel()
		},
		computed:{
		},
	}
</script>

<style lang="less">
	@import url("../../style/user/excharge");
</style>
