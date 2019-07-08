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
				list: [1,2,2,2,2,2],
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
		},
		onReachBottom() { // 触底加载更多
			if(this.total > this.currentPage){
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
				that.$axios({ url: '', data: { currentPage: that.currentPage } }).then(res =>{
					console.log(res)
					if(res.code == 1){
						that.currentPage += that.currentPage
						that.list = res.data
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