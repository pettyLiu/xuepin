<template>
	<view class="">
		<view class="tabs row" id="tabs">
			<text class="tab" id="2" @click="changeTabs(1)" :class="{active:tabs==1}">全职简历</text>
			<text class="tab" id="3" @click="changeTabs(2)" :class="{active:tabs==2}">兼职简历</text>
		</view>
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
				tabs: 1,
				url: ''
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.title
			})
			this.type = options.type
			switch(options.type){				
				case '1':
				this.url = 'api/index/hotPosition' // 热门职位
				this.getList(this.url)
				break;
				case '2':
				this.url = 'api/index/nearPosition' // 离我最近
				this.getLocation()
				this.getList(this.url)
				break;
				case '3':
				this.url = 'api/index/urgentPosition' // 急招岗位
				this.getList(this.url)
				break;
				case '4':
				this.url = 'api/index/latestPosition' // 最新岗位
				this.getList(this.url)
				break;
			}
			
		},
		onReachBottom() { // 触底加载更多
			if(this.total > this.list.length){
				this.showLoadMore = true
				this.getList(this.url)				
			}else{
				this.showLoadMore = true
				this.loadMoreText = "没有更多数据了!"
			}
		},
		mounted() {
		},
		methods:{
			getList (url) {
				const that = this
				that.showLoadMore = true
				var data = {}
				var method = 'get'
				if(this.type == 2){ // 最近岗位
					method = 'post'
					data = {
						type: that.tabs,
						page: that.currentPage,
						addr_code: that.longitude + ',' + that.latitude
					}
				}else{
					data = {
						type : that.tabs,
						page: that.currentPage,	
					}
				}
				that.$axios({ 
					url: url,
					method: method,
					data: { ...data },
				}).then(res =>{
					if(res.code == 1){
						that.currentPage = that.currentPage + 1
						that.total = res.data.total
						that.list = that.list.concat(res.data.data)
						that.showLoadMore = false
					}
				})
			},
			getLocation () {
				const that = this
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						that.longitude = res.longitude
						that.latitude = res.latitude
					},
					fail(res) {
						console.log(res)
					}
				})
			},
			changeTabs (index) {
				if(this.tabs != index){
					this.tabs = index
					this.currentPage = 1
					this.total = 1
					this.list = []
					this.getList(this.url)
				}
			}
		},
		components:{
			postList
		}
	}
</script>

<style lang="less">
@import '../../style/common/mixin.less';
.active{
	font-size: 36upx;
	color: @g_color;
	font-weight: 500
}
.tabs{
	background: white;
	border-bottom: @g_border;
	height: 94upx;
	color:#333;
	position: relative;
	z-index: 50;
	.tab{
		width: 50%;
		height: 100%;
		line-height: 94upx;
		text-align: center
	}
}
</style>