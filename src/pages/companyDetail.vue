<template>
	<view class="companyDetail">
		<view class="top row">
			<image class="avatar" src="/static/image/banner3.png" mode=""></image>
			<view class="column just_btw">
				<text class="name">赣州公司</text>
				<text class="nature">100-200人 互联网/电子商务</text>
			</view>
		</view>
		<view class="content">
			<view class="tabs row just_arw">
				<text class="tab" :class="{active: activeTab==index}" v-for="(item, index) in tabs" :key="index" @click="changeTabs" :id="index">{{item}}</text>
				<view class="sliderBorder" :style="{left: sliderLeft + 'px'}"></view>
			</view>
			<view class="first" v-if="activeTab == 0">
				<view class="column">
					<text class="title">公司福利</text>
					<view class="welfares">
						<text class="welfare" v-for="item in welfares" :key="item">{{item}}</text>
					</view>
				</view>
				<view class="column">
					<text class="title">公司简介</text>
					<text class="introduce" v-for="item in 5" :key="item">公司详情</text>
					
				</view>
				<view class="address column">
					<text class="title">公司地址</text>
					<text class="addressDetail" @click="toNext"><text class="iconfont icon-weizhi"></text>详细地址<text class="iconfont icon-youjiantou"></text></text>
					<view class="map">
						<map style="width: 100%; height: 220px;" :latitude="latitude" :longitude="longitude" :markers="covers"></map>
					</view>
				</view>
			</view>
			<view class="second"  v-if="activeTab == 1">
				<view class="postList" @click="toPostDetail()" v-for="(item, index) in post" :key="index">
					<view class="row just_btw">
						<text class="postTitle">技术总监</text>
						<text class="salary">10k-20k/月</text>
					</view>
					<view class="txt row just_btw">
						<view class="row tags">
							<text class="tag">带薪休假</text>
							<text class="tag">五险一金</text>
						</view>
						<text class="date">6月15日</text>
					</view>				
					<text class="address"><text class="iconfont icon-weizhi"></text>章贡区</text>
				</view>
				<view class="nothing column center" v-if="post.length == 0">
					<image src="" mode=""></image>
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
	export default {
		name: 'companyDetail',
		data() {
			return {
				welfares: ['带薪休假', '包吃', '包住', '餐补', '房补', '养老保险', '医疗保险', '加班补', '住房公积金', '话补'],
				title: 'map',
				tabs: ['公司信息', '在招职位'],
				collect: false,
				activeTab: 0,
				sliderLeft: 0,
				latitude: 25.854021,
				longitude: 114.928111,
				post: [1,2,2,2,2,2,2,2,2],
				covers: [{
					id: '1',
					latitude: 25.854021,
					longitude: 114.928111,
					iconPath: '/static/image/biaoji @2x.png',
					anchor: {x: .5, y: 1},
					callout: {content: '红旗大道86号江西理工大徐',display:'ALWAYS'}
				}],
				showMask: false
			};
		},
		methods:{
			getCompanyInfo () { // 公司详情
				const that = this
				that.$axios({
					url: 'api/enterprise/detail',
					method: 'fet',
					data: {
						id: that.id
					}
				}).then(res => {
					console.log(res)
					that.companyInfo = res.data
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
				}
			},
			toNext () {
				uni.openLocation({
					latitude: 25.854021,
					longitude: 114.928111,
					name: '江西理工大学',
					address: '红旗大道86号',
					success: function (res) {
					}
				});
			},
			toPostDetail () {
				uni.navigateTo({
					url: '/pages/postDetail'
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
			if(val.index == 0){
				this.showMask = true
			}else{
				var webView = this.$mp.page.$getAppWebview()
				this.collect = !this.collect
				if(this.collect){ // 更换收藏图标
					webView.setTitleNViewButtonStyle(1, {  text: '\ue657' })
				}else{
					webView.setTitleNViewButtonStyle(1, {  text: '\ue654' })
				}
				uni.showToast({ title: this.collect ? '收藏成功' : '取消收藏', icon: "none" })
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
