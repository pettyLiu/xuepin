<template>
	<view class="filterArea">
		<areas :city="city"></areas>
	</view>
</template>

<script>
	import areas from '@/components/area'
	export default {
		name: 'filterArea',
		data() {
			return {
				
			};
		},
		methods:{
		},
		onLoad (options) {
			this.city = JSON.parse(options.city) 
		},
		computed:{
		},
		components:{
			areas
		}
	}
</script>

<style lang="less">
	uni-page-body{
		height: 100%
	}
	.filterArea{
		height: 100%
	}
</style>
