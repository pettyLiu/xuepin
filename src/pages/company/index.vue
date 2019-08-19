<template>
	<view class="personal-company">
		<!-- 公司列表 -->
		<view class="companyLists" v-if="roleType == 1">
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
		<view class="companyLists" v-if="roleType == 2">
			<view class="companyList postList" v-for="(item, index) in lists" :key="index">
				<view class="row just_btw">
					<text class="f_30">JAVA架构师</text>
					<text>全职职位</text>
				</view>
				<view class="postDetail f_22">
                    <text class="borderRight">23岁</text>
					<text class="borderRight">5-10年</text>
                    <text class="borderRight">本科</text>
					<text>图像处理</text>
				</view>
				<text class="ee">职位详情：负责系统及产品需求分析及架构设计负责系统及产品需求分析及架构设计负责系统及产品需求分析及架构设计；负责系统及产品需求分析及架构设计；</text>
				<view class="btns ">
					<text class="btn" @click="toEdit">修改</text>
					<text class="btn" @click="toTop(item.category_id)">置顶</text>
				</view>
			</view>
		</view>
		<view class="nothing column center" v-if="lists.length == 0">
			<image class="nothing_image" src="/static/image/bg.png" mode=""></image>
			<text>暂无内容</text>
		</view>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import config from '../../lib/config'
	import { api } from '../../lib/api'
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
					url: api().company_data,
					method: 'get',
					data: { 
						page: that.currentPage,
						scale: that.filter.scale,
						category_id: that.filter.nature
					} 
				}).then(res =>{
					if(res.code == 1){
						that.lists = res.data.data
						this.showLoadMore = false
						that.currentPage += 1
					}
				})
			},
			getResumeList () {
				console.log(4545)
				const that = this
				that.$axios({ 
					url: 'api/job/jobList',
					method: 'post',
					data: { 
						page: that.currentPage
					} 
				}).then(res =>{
					if(res.code == 1){
						that.lists = res.data
						this.showLoadMore = false
						that.currentPage += 1
					}
				})
			},
			toCompanyDetail (id) {
				uni.navigateTo({
					url: '../companyDetail?id=' + id
				})
			},
			toEdit () { // 修改招聘简章
				uni.navigateTo({
					url: ''
				})
			},
			toTop (id) { // 置顶职位
				const that = this
				that.$axios({
					url: '',
					method: 'post',
					data: {
						id: id
					}
				}).then(res => {
					if(res.code == 1){
						uni.showToast({ title: '置顶成功', icon: 'none' })
					}
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
			}else if(val.index == 1){
				uni.navigateTo({
					url: '/pages/search/index?type=2'
				})
			}else if(val.index == 2){
				uni.navigateTo({
					url: '/pages/post/index'
				})
			}
		},
		onShow: function(){
			const title = this.roleType == 1 ? '企业' : '职位中心'
			uni.setNavigationBarTitle({
				title: title
			});
		},
		components:{
			
		},
		watch:{
			filter(val){
				this.currentPage = 1
				this.getCompanyList()
				console.log(val)
			},
			roleType(val){
				console.log(val)
				this.currentPage = 1
				var title = ''
				if(val == 1){
					title = '企业'
					this.getCompanyList()
				}else{
					title = '职位中心'
					// this.getResumeList()
				}
				uni.setNavigationBarTitle({
					title: title
				});
			}
		},
		computed:{
			filter:function(){
				return this.$store.state.filterCompany.filter
			},
			...mapState(['roleType'])
		}
	}
</script>

<style lang="less">
	@import url("../../style/personal/company");
</style>
