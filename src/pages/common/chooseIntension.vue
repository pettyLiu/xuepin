<template>
	<view class="chooseIntension">
		<multiPost :limit="limit" v-on:choose="choosed"></multiPost>
	</view>
</template>

<script>
	import multiPost from '@/components/multiPost'
	export default {
		name: 'chooseIntension',
		data() {
			return {
				limit: 5,
				choose:''
			};
		},
		methods:{
			choosed (data) {
				console.log(data)
				this.choose = data
			}
		},
		onNavigationBarButtonTap (val){ // 保存期望职位
			console.log(this.choose)
			this.$store.commit('changeIntentsion', this.choose)
			uni.navigateBack()
		},
		computed:{
		},
		components:{
			multiPost
		}
	}
</script>

<style lang="less">
	.chooseIntension{
		height: 100%
	}
</style>
