<template>
	<view class="top">
		<!-- 搜索栏 -->
		<view class="search row just_btw" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<view class="address" @click="toChooseAddress">{{city.name}}<text class="iconfont icon-sanjiao"></text></view>
			<view class="searchView">
				<input class="searchInp" value="" disabled="true"
				placeholder="输入关键字" @click="focusOn" placeholder-class="searchPlaceholder"/>
				<text class="iconfont icon-sousuo"></text>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="page-section" :style="{paddingTop:statusBarHeight + 10 + 'px'}" v-if="istop||banner.length==0"></view>
		<view class="page-section swiper" :style="{paddingTop:statusBarHeight + 10 + 'px'}" v-if="!istop&&banner.length!=0">
			<view class="page-section-spacing" v-if="banner.length>0">
				<swiper class="swiper" :autoplay="autoplay" :interval="interval" 
				:duration="duration" indicator-active-color="#5E57EB" indicator-color="white" @change="swiperMove">
					<swiper-item class="swiperItem row center" v-for="(item, index) in banner" :key=index>
						<image :src="imgUrl + item.picUrl" mode="" v-if="roleType == 1"></image>
						<image :src="imgUrl + item.img" mode="" v-if="roleType == 2"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="dots row center">
			<text class="dot" v-for="item in dots" :class="{active: activeDots+1 == item }" :key="item"></text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import config from '../../../lib/config'
	export default{
		data(){
			return{
				autoplay: true,
				interval: 5000,
				duration: 500,
				banner: ['/static/image/banner1.png','/static/image/banner2.png','/static/image/banner3.png'],
				dots: 1,
				activeDots: 0,
				imgUrl: config.imgUrl
			}
		},
		props:['istop'],
		mounted() {
			if(this.roleType == 1){
				this.getBanner()
			}else{
				this.getBanner1()
			}
		},
		computed:{
			statusBarHeight() {
			    var height = 0
			    uni.getSystemInfo({
			        success: function (res) {
			            height = res.statusBarHeight
			        }
			    })
			    return height
			},
			city: {
				get(){
					return this.$store.state.city
				},
				set(val){
					this.$store.state.city
				}
			},
			roleType () {
				return this.$store.state.roleType
			}
		},		
		methods:{
			getBanner () {
				const that = this
				that.$axios({
					url: 'api/showMap',
					method: 'post'
				}).then(res => {
					if(res.code == 1){
						that.banner = res.data.picList
						that.dots = that.banner.length
					}	
				})
			},
			getBanner1 (){
				const that = this
				that.$axios({
					url: 'api/enterprise/getSlideMap',
					method: 'get'
				}).then(res => {
					if(res.code == 1){
						that.banner = res.data
						that.dots = that.banner.length
					}	
				})
			},
			swiperMove (e) { // 轮播移动时
				this.activeDots = e.detail.current
			},
			focusOn () { // 点击搜索框时
				const type = this.roleType == 1 ? 1 : 3
				uni.navigateTo({
					url:'../search/index?type=' + type
				})
			},
			toChooseAddress () {
				uni.navigateTo({
					url: '/pages/chooseAddress'
				})
			}
		},
	}
</script>

<style lang="less">
	@import '../../../style/common/mixin.less';
	.swiper{
		height: 348upx;
		background:rgba(245,245,245,1);	
	}
	.top{
		position: relative;
	}
	.dots{
		position: absolute;
		bottom: 10upx;
		width: 100%;
		.dot{
			width: 14upx;
			height: 8upx;
			background: rgba(255,255,255,1);
			border-radius: 6upx;
			margin-left: 10upx
		}
		.active{
			width: 24upx;
			background: rgba(94,87,235,1);
		}
	}
	.swiperItem{
		height: 348upx;
		width: 100%;
		image{
			height: 278upx;
			width: 90%;
			border-radius: 75upx;
		}
	}
	.page-section{
		margin-top: 60upx;
	}
	
	.search{
		height: 76upx;
		background: @g_color;
		color:white;
		padding: 0 3%;
		position: fixed;
		top:0;
		left:0;
		width: 94%;
		z-index: 100;
		.searchView{
			position: relative
		}
		.icon-sanjiao{
			position: absolute;
			z-index: 10;
		}
		.icon-sousuo{
			position: absolute;
			left: 10upx;
			top: 10upx;
			z-index: 10;
			color:#999
		}
		.address{
			text-align: center;
			line-height: 56upx;
			position: relative
		}
		.searchInp{
			width: 430upx;
			padding: 0 16upx;
			border-radius: 28upx;
			background: white;
			height: 56upx;
		}
		.signOn{
			width: 20%;
			text-align: center;
			border-left: 1px solid #ccc
		}
	}
	.searchPlaceholder{
		padding-left: 30upx
	}
</style>
