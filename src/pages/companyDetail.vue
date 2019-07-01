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
					<text class="introduce">公司详情</text>
				</view>
				<view class="address column">
					<text class="title">公司地址</text>
					<text class="addressDetail"><text class="iconfont icon-weizhi"></text>详细地址<text class="iconfont icon-youjiantou"></text></text>
					<view class="map">
						<map style="width: 100%; height: 120px;" :latitude="latitude" :longitude="longitude" :markers="covers">
						</map>
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
		
	</view>
</template>

<script>
	const sliderWidth = 20
	export default {
		name: 'companyDetail',
		data() {
			return {
				welfares: ['带薪休假', '包吃', '包住', '餐补', '房补', '养老保险', '医疗保险', '加班补', '住房公积金', '话补'],
				title: 'map',
				tabs: ['公司信息', '在招职位'],
				activeTab: 0,
				sliderLeft: 0,
				latitude: 39.909,
				longitude: 116.39742,
				post: [1,2,2,2,2,2,2,2,2],
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '/static/image/banner3.png'
				}]
			};
		},
		methods:{
			changeTabs (e) {
				console.log(e)
				if(this.activeTab != e.target.id){
					this.activeTab = e.target.id
					this.sliderLeft = e.target.offsetLeft + this.tt
				}
			},
		},
		computed:{
		},
		onNavigationBarButtonTap (val){
			if(val.index == 0){
				console.log('点击了分享')
			}else{
				// 更换收藏图标
				var webView = this.$mp.page.$getAppWebview();
				webView.setTitleNViewButtonStyle(1, {  
					text: 'he',  
				});
				console.log('点击了收藏')
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
		components:{
		}
	}
</script>

<style lang="less">
	@import '../style/personal/companyDetail';
</style>
