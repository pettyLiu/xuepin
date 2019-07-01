<template>
	<view class="area" :style="{marginTop: statusBarHeight + 10 + 'px'}">
		<view class="mask"  @touchmove.stop.prevent="moveHandle" @click="closeMask('')"></view>
		<!-- <view class="mask1"  @touchmove.stop.prevent="moveHandle1" @click="closeMask"></view> -->
		<view class="row" @touchmove.stop.prevent="moveHandle">
			<scroll-view scroll-y="true" class="areaLeft column">
				<view class="areaItem" v-for="(item, index) in area" :key="index" @click="showNext(index)" :class="{active: activeArea == index}"></view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaLeft column">
				<view class="areaItem" v-for="(item, index) in area" :key="index" @click="showNext(index)" :class="{active: activeArea == index}">{{item}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaRight">
				<view class="areaItem" @click="closeMask(subArea)">{{subArea}}</view>
			</scroll-view>
		</view>	
	</view>
</template>

<script>
	export default{
		data () {
			return{
				area: 28,
				subArea: '',
				activeArea: 0,
				statusBarHeight: 0
			}
		},
		mounted() {
			this.getArea()
			console.log(getApp().globalData)
			this.statusBarHeight = getApp().globalData.statusBarHeight
			// console.log(statusBarHeight)
		},
		methods:{
			moveHandle () {
			},
			// 关闭弹窗
			closeMask (item) {
				console.log(item)
				this.$emit("closeMask", {name: item,type: 'area'})
			},
			getArea () {
				this.area=['赣州','章贡区','瑞金','南康']
			},
			showNext (index) {
				const tt = [['不限'],['章贡区'],['1瑞金','2瑞金','3瑞金'],['1南康'],['2难看']]
				this.subArea = '全' + this.area[index]
				this.activeArea = index
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
		height: calc(100% - 118upx);
		padding-top: 244upx;
		.mask{
			background: rgba(0,0,0,0.2);
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			margin-top: 244upx;
		}
		.areaLeft,.areaRight{
			width: 50%;
			height: 700upx;
			background: white;
			z-index: 4;
			.areaItem{
				height:60upx;
				line-height: 60upx;
				padding-left: 30upx
			}
			.active{
				background: whitesmoke
			}
		}
		.areaRight{
			background: whitesmoke;
			// color: red
		}
	}
</style>
