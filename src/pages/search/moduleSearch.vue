<template>
	<view class="">
		<postList :list="list"></postList>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import postList from '../../components/postList'
	export default{
		name: 'moduleSearch',
		data () {
			return{
				list: [],
				currentPage: 1,
				total: 1,
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
			this.getList()
		},
		onReachBottom() { // 触底加载更多
			if(this.total > this.list.length){
				this.showLoadMore = true
				this.getList()
			}else{
				this.showLoadMore = true
				this.loadMoreText = "没有更多数据了!"
			}
		},
		mounted() {
		},
		methods:{
			getList () {
				const that = this
				that.showLoadMore = true
				that.$axios({ 
					url: 'api/index/latestPosition', 
					data: { 
						page: that.currentPage 
					} 
				}).then(res =>{
					console.log(res)
					if(res.code == 1){
						that.currentPage += that.currentPage
						that.total = res.data.total
						that.list = that.list.concat(res.data.data)
						that.showLoadMore = false
					}
				})
			}
		},
		components:{
			postList
		}
	}
</script>

<style lang="less">
</style>