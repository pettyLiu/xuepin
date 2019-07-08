<template>
	<view class="personal-news">
		<view class="tabs row just_arw">
			<text class="tab" :class="{active: activeTab==index}" v-for="(item, index) in tabs" :key="index" @click="changeTabs" :id="index">{{item}}</text>
			<view class="sliderBorder" :style="{left: sliderLeft + 'px'}"></view>
		</view>
		<postList :list="news" type="news"></postList>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import postList from '@/components/postList'
	const sliderWidth = 20
	export default{
		name: 'news',
		components:{
			postList
		},
		mounted() {
		},
		data(){
			return{
				tabs: ['全部','被查看','待面试','不合适'],
				activeTab: 0,
				news: [1,2,3,4],
				sliderLeft: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1
			}
		},
		methods:{
			changeTabs (e) {
				if(this.activeTab != e.target.id){
					this.activeTab = e.target.id
					this.loadMoreText = "加载中..."
					this.showLoadMore = false
					this.getNewsList()
				}
			},
			getNewsList () {
				const that = this
				that.$axios({ url: '', data: { currentPage: that.currentPage } }).then(res =>{
					if(res.code == 1){
						that.currentPage += that.currentPage
					}
				})
			},
		},
		onReachBottom() {
			if(this.total > this.currentPage){
				this.getNewsList()
			}else{
				this.loadMoreText = "没有更多数据了"
				this.showLoadMore = true
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/that.tabs.length - sliderWidth)/2,
					that.tt = (res.windowWidth/that.tabs.length - sliderWidth)/2
			    }
			})
		},
	}
</script>


<style lang="less">
	@import url("../../style/personal/news");
</style>