<template>
	<view class="area ">
		<view class="top row ali_center">
			<text class="list globelColor" v-for="(item, index) in choose" :key="index" v-if="choose.length > 0">
				{{item}}
				<text class="iconfont icon-del" @click="del(index)"></text>
			</text>
			<text class="c_999 f_24 tips" v-if="choose.length == 0">请选择期望职位！</text>
		</view>
		<view class="content row">
			<scroll-view scroll-y="true" class="areaLeft column">
				<view class="areaItem globelColor">服务业</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaCenter column">
				<view class="areaItem" v-for="(item, index) in area" :key="index" @click="showNext(index)" :class="{active: activeArea == index}">{{item}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaRight">
				<view class="areaItem" @click="chooseIntension(subArea)">{{subArea}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'post',
		data () {
			return{
				area: ['零售'],
				subArea: '',
				activeArea: 0,
				statusBarHeight: 0,
				thirActiveArea: 0,
				choose: []
			}
		},
		props:['limit'],
		mounted() {
			this.getArea()
			console.log(getApp().globalData)
			this.statusBarHeight = getApp().globalData.statusBarHeight
			// console.log(statusBarHeight)
		},
		methods:{
			moveHandle () {
			},
			del (index) {
				this.choose.splice(index, 1)
			},
			chooseIntension (item) {
				this.choose.push(item)
			},
			getArea () {
				this.area=['零售','家政','餐饮','酒店']
			},
			showNext (index) {
				const tt = [['不限'],['章贡区'],['1瑞金','2瑞金','3瑞金'],['1南康'],['2难看']]
				this.subArea = '全' + this.area[index]
				this.activeArea = index	
			}
		},
		watch:{
			choose(val, oldval){
				this.$emit('choose', val)
			}
		}
	}
</script>

<style lang="less">
	@import '../style/common/mixin.less';
	uni-page-body{
		height: 100%}
	.area,.content{
		height: 100%;
		.top{
			widtdh: 100%;
			min-height: 80upx;
			padding: 20upx 0 ;
			background: white;
			border-bottom: @g_border;
			flex-wrap: wrap;
			.list{
				.h(52upx, 52upx, center);
				width: 152upx;
				background: #f4f4f4;
				margin: 0 0 20upx 32upx;
				position: relative;
				.icon-del{
					position: absolute;
					top: -20upx;
					right: 0;
					font-size: 14upx
				}
			}
			.tips{
				padding-left: 32upx
			}
		}
		.areaLeft,.areaCenter,.areaRight{
			width: 25%;
			height: calc(100% - 130upx);
			background: #f4f4f4;
			z-index: 4;
			padding-bottom: 130upx;
			.areaItem{
				.h(120upx,120upx,center);
			}
			.active{
				color: @g_color
			}
		}
		.areaCenter{
			width: 32%;
			background: white;
			border-right: @g_border;
		}
		.areaRight{
			width: 43%;
			background: white;
		}
		.btn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: calc(100% - 68upx);
			z-index: 100;
			padding: 20upx 34upx;
			border-top: @g_border;
			background: white;
			.reset{
				.wh(78upx,196upx);
				border-radius: 12upx;
				background: #e0e0e0;
				text-align: center;
				line-height: 78upx
			}
			.comfirm{
				.wh(78upx,426upx);
				border-radius: 12upx;
				background: @g_color;
				text-align: center;
				line-height: 78upx;
				color:white;
			}
		}	
	}
</style>
