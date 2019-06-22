<template>
	<view class="area">
		<view class="mask"  @touchmove.stop.prevent="moveHandle" @click="closeMask"></view>
		<!-- <view class="mask1"  @touchmove.stop.prevent="moveHandle1" @click="closeMask"></view> -->
		<view class="row" @touchmove.stop.prevent="moveHandle1">
			<scroll-view scroll-y="true" class="areaLeft column" @scroll.stop="tt">
				<view v-for="item in ar">4444</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaRight">
				<view v-for="item in ar">4448888884</view>
			</scroll-view>
		</view>	
	</view>
</template>

<script>
	export default{
		data () {
			return{
				ar: 18
			}
		},
		methods:{
			moveHandle () {
				console.log(72222)
			},
			tt(){
				console.log(777)
			},
			moveHandle1(){
				console.log(8888)
			},
			closeMask () {
				// 关闭弹窗
			}
		}
	}
</script>

<style lang="less">
	.area{
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
		height: calc(100% - 120upx);
		padding-top: 120upx;
		.mask,.mask1{
			background: rgba(0,0,0,0.2);
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1
		}
		.mask1{
			z-index: 100;
			background: rgba(0,0,0,0)
		}
		.areaLeft,.areaRight{
			width: 50%;
			height: 500upx;
			background: white;
			z-index: 4
		}
	}
</style>
