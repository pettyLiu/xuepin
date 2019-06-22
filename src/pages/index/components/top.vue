<template>
	<view class="top">
		<!-- 轮播图 -->
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item class="swiperItem" v-for="(item, index) in banner" :key=index>
						<image :src="item" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 搜索栏 -->
		<view class="search row ali_center" :style="{top:statusBarHeight + 'px'}">
			<view class="address">赣州</view>
			<input class="searchInp" type="text" value="" placeholder="输入搜索内容" @focus="focusOn"/>
			<text class="signOn" @click="toSignOn()">签到</text>
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
				console.log(45)
			}
		},
	}
</script>

<style lang="less">
	.swiperItem{
		image{
			height: 320upx;
			width: 100%
		}
	}
	.search{
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		height: 60upx;
		background: white;
		width: 70%;
		border-radius: 8upx;
		margin-top: 20upx;
		.address{
			width: 20%;
			text-align: center;
			border-right: 1px solid #ccc
		}
		.searchInp{
			width: calc(60% - 30upx);
			padding: 0 15upx;
		}
		.signOn{
			flex: 1;
			text-align: center;
			border-left: 1px solid #ccc
		}
	}
</style>
