<template>
	<view class="top">
		<!-- 搜索栏 -->
		<view class="search row just_btw" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<view class="address">赣州<text class="iconfont icon-sanjiao"></text></view>
			<input class="searchInp" type="text" value="" placeholder="输入关键字" @focus="focusOn" placeholder-style="margin-left: 40upx" disabled=""/>
			<text class="iconfont icon-sousuo"></text>
		</view>
		<!-- 轮播图 -->
		<view class="page-section swiper" :style="{paddingTop:statusBarHeight + 10 + 'px'}" v-if="!istop">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" 
				:duration="duration" indicator-active-color="#5E57EB" indicator-color="white">
					<swiper-item class="swiperItem row center" v-for="(item, index) in banner" :key=index>
						<image :src="item" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>

	</view>
</template>

<script>
	export default{
		data(){
			return{
				indicatorDots: '',
				autoplay: true,
				interval: 5000,
				duration: 500,
				banner: ['/static/image/banner1.png','/static/image/banner2.png','/static/image/banner3.png'],
			}
		},
		props:['istop'],
		mounted() {	
		},
		computed:{
			statusBarHeight() {
			    var height = 0
			    uni.getSystemInfo({
			        success: function (res) {
			            height = res.statusBarHeight
			        }
			    })
				console.log(height)
			    return height
			}
		},
		
		methods:{
			toSignOn () {
				uni.navigateTo({
					url:'../../../../signOn'
				})
			},
			// 点击搜索框时
			focusOn () {
				uni.navigateTo({
					url:'./search'
				})
			}
		},
	}
</script>

<style lang="less">
	@import '../../../style/common/mixin.less';
	.swiper{
		height: 220upx;
		background:rgba(245,245,245,1);
	}
	.swiperItem{
		height: 220upx;
		width: 100%;
		image{
			height: 150upx;
			width: 90%;
			border-radius: 75upx;
		}
	}
	.page-section{
		margin-top: 60upx;
	}
	swiper .uni-swiper-dots-horizontal{
		bottom: 0;
	}
	.uni-swiper-dot{
		width: 12upx
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
		.icon-sanjiao{
			position: absolute;
			left: 56upx;
			z-index: 10;
		}
		.icon-sousuo{
			position: absolute;
			right: 450upx;
			bottom: 32upx;
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
</style>
