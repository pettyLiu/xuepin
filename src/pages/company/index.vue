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
					<text class="f_30">{{item.title}}</text>
					<text>{{item.job_type}}职位</text>
				</view>
				<view class="postDetail f_22">
                    <text class="borderRight">{{item.age}}</text>
					<text class="borderRight">{{item.work_exp}}</text>
                    <text >{{item.edu_level}}</text>
					<!-- <text>图像处理</text> -->
				</view>
				<text class="ee">职位描述: </text>
				<rich-text :nodes="item.content"></rich-text>
				<view class="btns ">
					<text class="btn" @click="toEdit(item.job_type, item.id)">修改</text>
					<text class="btn" v-if="item.ontop_status == 1">置顶中</text>
					<text class="btn" @click="toTop(item.id)" v-else>置顶</text>
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
			this.showIcon()
		},
		methods:{
			showIcon () {
				// #ifdef APP-PLUS
				var webView = this.$mp.page.$getAppWebview()
				if(this.roleType == 1){ // 更换收藏图标
					webView.setTitleNViewButtonStyle(0, {  fontSize: '24px',"width":"32px" })
					webView.setTitleNViewButtonStyle(1, {  fontSize: '19px',"width":"32px" })
					webView.setTitleNViewButtonStyle(2, {  fontSize: '0', width: '0' })
				}else{
					webView.setTitleNViewButtonStyle(0, {  fontSize: '0', width: '0' })
					webView.setTitleNViewButtonStyle(1, {  fontSize: '0', width: '0' })
					webView.setTitleNViewButtonStyle(2, {  fontSize: '20px', width: '32px' })
				}
				// #endif
			},
			getCompanyList () {
				const that = this
				var data = {}
				data.page = that.currentPage
				if(that.roleType == 1){
					data.scale = that.filter.scale,
					data.category_id = that.filter.nature
				}
				that.$axios({ 
					url: api().company_data,
					method: 'post',
					data: { 
						...data
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
			toEdit (types, id) { // 修改招聘简章
				if(types == '全职'){
					uni.navigateTo({ // 全职跳转
						url: '/pages/post/fullPost?type=2' + '&id=' + id
					})
				}else{
					uni.navigateTo({ // 兼职跳转
						url: '/pages/post/partPost?type=2' + '&id=' + id
					})
				}	
			},
			toTop (id) { // 置顶职位
				const that = this
				that.$axios({
					url: 'api/job/top',
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
