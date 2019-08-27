<template>
	<view class="companyDetail">
		<view class="top row" v-if="publicDetail">
			<image class="avatar" :src="imgUrl + publicDetail.logo" mode=""></image>
			<view class="column just_btw">
				<text class="name">{{publicDetail.enterpriseName}}</text>
				<text class="nature">{{publicDetail.scale}} {{publicDetail.category}}</text>
			</view>
		</view>
		<view class="content">
			<view class="tabs row just_arw">
				<text class="tab" :class="{active: activeTab==index}" v-for="(item, index) in tabs" :key="index" @click="changeTabs" :id="index">{{item}}</text>
				<view class="sliderBorder" :style="{left: sliderLeft + 'px'}"></view>
			</view>
			<view class="first" v-if="activeTab == 0 && companyInfo">
				<view class="column">
					<text class="title">公司福利</text>
					<view class="welfares">
						<text class="welfare" v-for="item in companyInfo.enterprise.tags" :key="item">{{item}}</text>
					</view>
				</view>
				<view class="column">
					<text class="title">公司简介</text>
					<rich-text class="introduce" :nodes="companyInfo.enterprise.content"></rich-text>
				</view>
				<view class="address column">
					<text class="title">公司地址</text>
					<text class="addressDetail" @click="toNext"><text class="iconfont icon-weizhi">
						</text>{{companyInfo.enterprise.address}}<text class="iconfont icon-youjiantou"></text></text>
					<view class="map">
						<map style="width: 100%; height: 220px;" v-if="covers" :latitude="covers[0].latitude" 
						:longitude="covers[0].longitude" :markers="covers"></map>
					</view>
				</view>
			</view>
			<view class="second"  v-if="activeTab == 1">
				<view class="postList" @click="toPostDetail(item.id)" v-for="(item, index) in post" :key="index">
					<view class="row just_btw">
						<text class="postTitle">{{item.title}}</text>
						<text class="salary">{{item.salary}}</text>
					</view>
					<view class="txt row just_btw">
						<view class="row tags">
							<text class="tag" v-for="item in item.tags" :key="item">{{item}}</text>
						</view>
						<text class="date">{{item.created_at}}</text>
					</view>				
					<text class="address"><text class="iconfont icon-weizhi"></text>{{item.district}}</text>
				</view>
				<view class="nothing column center" v-if="post.length == 0">
					<image class="nothingImg" src="/static/image/bg.png" mode=""></image>
					<text>暂无内容</text>
				</view>
			</view>
		</view>
		
		<!-- <cover-image src="https://jjyh.dev.0797i.cn/addons/zjhj_mall/core/web/statics/images/home-page/icon-coupon-index.png"></cover-image> -->
		<view class="masks" v-if="showMask"  @touchmove.stop.prevent="moveHandle"> <!-- 有map用cover-view，subvue报错无法使用,cover-view无法嵌套使用 -->
			<cover-view class="bg" @click="notMove($event)"></cover-view>
			<cover-view>
				<cover-image class="maskLeft" src="/static/icon/bg1.png" style="height: 150px;width:150px;"></cover-image>
				<cover-image class="maskRight" src="/static/icon/bg.png" style="height: 150px;width:150px;"></cover-image>
			</cover-view>
			<cover-view class="btn1" @click="cancel">取消</cover-view>
		</view>
	</view>
</template>

<script>
	const sliderWidth = 20
	import { getProvider } from '@/lib/getProvider.js'
	import config from '../lib/config'
	export default {
		name: 'companyDetail',
		data() {
			return {
				welfares: [],
				title: 'map',
				tabs: ['公司信息', '在招职位'],
				collect: false,
				activeTab: 0,
				sliderLeft: 0,
				post: '',
				covers: '',
				showMask: false,
				publicDetail: '',
				companyInfo: '',
				imgUrl: config.imgUrl,
				currentPage: 1,
				total: 1
			};
		},
		methods:{
			getCompanyInfo () { // 公司详情
				const that = this
				that.$axios({
					url: 'api/enterprise/detail',
					method: 'get',
					data: {
						id: that.id,
						type: 1
					}
				}).then(res => {
					that.publicDetail = res.data.enterprisePublic
					that.companyInfo = res.data
					that.collect = res.data.enterprisePublic.collection
					// #ifdef APP-PLUS
					var webView = that.$mp.page.$getAppWebview()
					if(that.collect){ // 更换收藏图标
						webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
					}else{
						webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
					}
					// #endif
					let address = res.data.enterprise.addr_code.split(',')
					let covers = [{
						id: '1',
						latitude: 25.854021,
						longitude: 114.928111,
						iconPath: '/static/image/biaoji @2x.png',
						anchor: {x: .5, y: 1},
						callout: {content: '红旗大道86号江西理工大学',display:'ALWAYS'}
					}]
					if(res.data.enterprise.addr_code){
						covers[0].latitude = address[1]
						covers[0].longitude = address[0]
						covers[0].callout.content = res.data.enterprise.address
					}							
					that.covers = covers
				})
			},
			getCompanyResume () { // 在招职位
				const that = this
				that.$axios({
					url: 'api/enterprise/detail',
					method: 'get',
					data: {
						id: that.id,
						type: 2
					}
				}).then(res => {
					that.post = res.data.jobInfo.data
					that.currentPage = that.currentPage + 1
					that.total = res.data.jobInfo.total
				})
			},
			notMove (e){
				console.log(e)
			},
			moveHandle(){},
			cancel () { // 显示遮罩层
				this.showMask = false
			},
			changeTabs (e) {
				if(this.activeTab != e.target.id){
					this.activeTab = e.target.id
					this.sliderLeft = e.target.offsetLeft + this.tt
					if(this.activeTab == 1 && !this.post){
						this.getCompanyResume()
					}
				}
			},
			toNext () {
				const that = this
				uni.openLocation({
					latitude: Number(that.covers[0].latitude),
					longitude: Number(that.covers[0].longitude),
					name: that.publicDetail.enterpriseName,
					address: that.companyInfo.enterprise.address,
					success: function (res) {
					}
				});
			},
			toPostDetail (id) {
				uni.navigateTo({
					url: '/pages/postDetail?id=' + id
				})
			}
		},
		computed:{
		},
		onBackPress() {
			if(this.showMask){
				this.showMask = false
				return true
			}
		},
		onNavigationBarButtonTap (val){	
			const that = this	
			if(val.index == 1){
				this.showMask = true
			}else{
				var webView = this.$mp.page.$getAppWebview()
				this.collect = !this.collect
				var url = ''
				if(this.collect){ // 更换收藏图标
					webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
					url = 'api/user/collectEnt'
				}else{
					webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
					url = 'api/user/cancelCollectEnt'
				}
				that.$axios({
					url: url,
					method: 'post',
					data: {
						id: that.id
					}
				}).then(res => {
					if(res.code == 1){
						uni.showToast({ title: that.collect ? '收藏成功' : '取消收藏', icon: "none" })
					}
				})	
			}
		},
		onLoad(options) {
			var that = this
			that.id = options.id
			that.getCompanyInfo()
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/that.tabs.length - sliderWidth)/2,
					that.tt = (res.windowWidth/that.tabs.length - sliderWidth)/2
			    }
			})
			uni.getLocation({
				type: 'wgs84',
				success: function (res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				},
				fail(res) {
					console.log(res)
				}
			})
			this.providerList = getProvider()
			this.providerList=[{name: '微信', id: 1, icon:'icon-weixin'},{name: 'QQ',id: 3, icon:'icon-qq'}] //测试用
		},
		onReachBottom () {
			if(this.activeTab==1 && this.total > this.post.length){
				this.getCompanyResume()
			}
		},
		components:{
			// share
		}
	}
</script>

<style lang="less">
	@import '../style/personal/companyDetail';
	img.csssprite{
		display: none;
		opacity: 0
	}
	.amap-logo{
		display: none;
	}
</style>
