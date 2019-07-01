<template>
	<view class="">
		<postList :list="collectionList"></postList>
	</view>
</template>

<script>
	import postList from '@/components/postList'
	export default {
		name: 'collection',
		data() {
			return {
				collectionList: [1,2,2,5]
			};
		},
		methods:{
		},
		components:{
			postList
		},
		computed:{
			
		},
	}
</script>

<style>

</style>
