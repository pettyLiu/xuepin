<template>
	<view class="filterPost">
		<posts :alias="alias"></posts>
	</view>
</template>

<script>
	import posts from '@/components/post'
	export default {
		name: 'filterPost',
		data() {
			return {
				alias: ''
			};
		},
		onLoad (options) {
			this.alias = options.alias
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
