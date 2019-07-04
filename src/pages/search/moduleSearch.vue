<template>
	<view class="">
		<postList :list="list"></postList>
	</view>
</template>

<script>
	import postList from '../../components/postList'
	export default{
		name: 'moduleSearch',
		data () {
			return{
				list: [1,2,2,2,2,2]
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
		},
		mounted() {
		},
		methods:{
		},
		components:{
			postList
		}
	}
</script>

<style lang="less">
</style>