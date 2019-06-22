<template>
	<view class="">
	</view>
</template>

<script>
	export default {
		name: 'postDetail',
		data() {
			return {
				
			};
		},
		methods:{
		},
		computed:{
		},
		onNavigationBarButtonTap (val){
			if(val.index == 0){
				console.log('点击了分享')
			}else{
				console.log('点击了收藏')
			}
		}
	}
</script>

<style>

</style>
