<template>
	<view class="form">
		<view class="list" @click="toBindWx('请输入要绑定的微信', datas.vx)">
			<view class="title f_24 c_999 row just_btw"><text>微信号</text><text class="iconfont icon-youjiantou"></text></view>
			<text class="f_30" v-if="datas.vx">{{datas.vx}}</text>
			<text class="f_30" v-else>去绑定</text>
		</view>
		<view class="list" @click="toBindQQ('请输入要绑定的qq', datas.qq)">
			<view class="title f_24 c_999 row just_btw"><text>QQ号</text><text class="iconfont icon-youjiantou"></text></view>
			<text class="f_30" v-if="datas.qq">{{datas.qq}}</text>
			<text class="f_30" v-else>去绑定</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goldRecharge',
		data() {
			return {
				datas: ''		
			};
		},
		methods:{
			getData () {
				const that = this
				that.$axios({
					url: 'api/user/bindInfo',
					method: 'post',
				}).then(res => {
					that.datas = res.data
				})
			},
			toBindWx (detail, data) {
				if(data){
					uni.showModal({
						title: '提示',
						content: '解绑此微信号？',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					uni.navigateTo({
						url: '/pages/setting/bindAccount?detail=' + detail
					})
				}	
			},
			toBindQQ (detail, data) {
				const that = this
				if(data){
					uni.showModal({
						title: '提示',
						content: '解绑此QQ号？',
						success: function (res) {
							if (res.confirm) {
								that.$axios({
									url: 'api/user/removeBindQQ',
									method: 'post'
								}).then(res =>{
									if(res.code == 0){
										uni.showToast({ title: '解绑成功' })
										that.getData()
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}else{
					uni.navigateTo({
						url: '/pages/setting/bindAccount?detail=' + detail
					})
				}
			}
		},
		onShow(){
			this.getData()
		},
		onLoad () {
			// this.getData()
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import '../../style/setting/index';
</style>
