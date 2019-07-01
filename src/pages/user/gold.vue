<template>
	<view class="">
		<text @click="toExcharge">积分兑换</text>
	</view>
</template>

<script>
	export default {
		name: 'gold',
		data() {
			return {
				
			};
		},
		methods:{
			toExcharge () {
				uni.navigateTo({
					url:'/pages/user/excharge'
				})
			}
		},
		onNavigationBarButtonTap (){
			uni.navigateTo({
				url: '/pages/user/goldRecord'
			})
		},
		computed:{
		},
	}
</script>

<style>

</style>
