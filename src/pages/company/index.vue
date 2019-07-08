<template>
	<view class="personal-company">
		<!-- 公司列表 -->
		<view class="companyLists">
			<view class="companyList" v-for="(item, index) in 9" :key="index" @click="toCompanyDetail">
				<view class="companyTxt row ali_center">
					<image class="companyAvatar" src="/static/image/banner2.png" mode=""></image>
					<view class="column just_btw">
						<text class="companyName">赣州公司</text>
						<text class="address"><text class="iconfont icon-weizhi"></text>赣州市 章贡区</text>
					</view>
				</view>
				<view class="companyTypes">
					<text class="companyType">互联网/电子商务</text>
				</view>
				<view class="companyRecruit row ali_center just_btw">
					<text>在招职位 <text class="globeColor">“5”个职位</text></text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
		</view>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default{
		data(){
			return{
				loadMoreText: "加载中...",
				showLoadMore: false,
				currentPage: 1,
				total: 1,
			}
		},
		mounted() {

		},
		methods:{
			getCompanyList () {
				const that = this
				that.$axios({ url: '', data: { currentPage: that.currentPage } }).then(res =>{
					if(res.code == 1){
						this.showLoadMore = false
						that.currentPage += 1
					}
				})
			},
			toCompanyDetail () {
				uni.navigateTo({
					url: '../companyDetail'
				})
			}
		},
		onReachBottom() {
			if(this.total > this.currentPage){
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
