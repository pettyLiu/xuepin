<template>
	<view class="personal-company">
		<!-- 公司列表 -->
		<view class="companyLists">
			<view class="companyList" v-for="(item, index) in lists" :key="index" @click="toCompanyDetail(item.id)">
				<view class="companyTxt row ali_center">
					<image class="companyAvatar" :src="url + item.logo" mode=""></image>
					<view class="column just_btw">
						<text class="companyName">{{item.name}}</text>
						<text class="address"><text class="iconfont icon-weizhi"></text>{{item.city}} {{item.district}}</text>
					</view>
				</view>
				<view class="companyTypes">
					<text class="companyType">{{item.categoryName}}</text>
				</view>
				<view class="companyRecruit row ali_center just_btw">
					<text>在招职位 <text class="globeColor">“{{item.jobCount}}”个职位</text></text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
		</view>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import config from '../../lib/config'
	import { mapState } from 'vuex';
	export default{
		data(){
			return{
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
				lists: [],
				url: config.imgUrl
			}
		},
		mounted() {

		},
		onLoad () {
			this.getCompanyList()
		},
		methods:{
			getCompanyList () {
				const that = this
				that.$axios({ 
					url: 'api/enterprise/index',
					method: 'get',
					data: { 
						// currentPage: that.currentPage,
						// scale: that.filter.scale,
						// category_id: that.filter.nature
					} 
				}).then(res =>{
					if(res.code == 1){
						that.lists = res.data.data
						this.showLoadMore = false
						that.currentPage += 1
					}
				})
			},
			toCompanyDetail (id) {
				uni.navigateTo({
					url: '../companyDetail?id=' + id
				})
			}
		},
		onReachBottom() {
			if(this.total > this.lists.length){
				this.showLoadMore = true
				this.getCompanyList()
			}else{
				this.loadMoreText = "没有更多数据了"
				this.showLoadMore = true
			}
		},
		onNavigationBarButtonTap (val){
			if(val.index == 0){
				uni.navigateTo({
					url: '/pages/filterCompany'
				})
			}else{
				uni.navigateTo({
					url: '/pages/search/index?type=2'
				})
			}
		},
		onShow: function(){
		},
		components:{
		},
		watch:{
			filter(val){
				this.getCompanyList()
				console.log(val)
			}
		},
		computed:{
			filter:function(){
				return this.$store.state.filterCompany.filter
			}
		}
	}
</script>

<style lang="less">
	@import url("../../style/personal/company");
</style>
