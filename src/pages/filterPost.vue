<template>
	<view class="filterPost">
		<posts></posts>
	</view>
</template>

<script>
	import posts from '@/components/post'
	export default {
		name: 'filterPost',
		data() {
			return {
				
			};
		},
		methods:{
		},
		computed:{
		},
		components:{
			posts
		}
	}
</script>

<style lang="less">
	.filterPost{
		height: 100%
	}
</style>
