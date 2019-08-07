<template>
	<view class="area row">
		<scroll-view scroll-y="true" class="areaLeft column">
			<view class="areaItem globelColor">{{city.name}}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="areaCenter column">
			<view class="areaItem" v-for="(item, index) in area" :key="index" 
			@click="showNext(index, item.id)" :class="{active: activeId == item.id}">{{item.name}}</view>
		</scroll-view>
		<!-- <scroll-view scroll-y="true" class="areaRight">
			<view class="areaItem" @click="closeMask(subArea)">{{subArea}}</view>
		</scroll-view> -->
		<view class="btn row ali_center just_btw">
			<text class="reset" @click="reset">重置</text>
			<text class="comfirm" @click="confirm">确定</text>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'areas',
		data () {
			return{
				area: 28,
				activeArea: 0,
				district: [],
				activeId: ''
			}
		},
		props:{
			city: Object
		},
		mounted() {
			if(this.$store.state.district){
				this.activeId = this.$store.state.district.id
			}
			this.getArea()
		},
		methods:{
			moveHandle () {
			},
			// 关闭弹窗
			closeMask (item) {
				this.$emit("closeMask", {name: item,type: 'area'})
			},
			getArea () {
				const that = this
				that.$axios({
					url: 'api/base/ajaxDistrict',
					methods: 'get',
					data: {
						id: that.city.id
					}
				}).then(res => {
					that.area = res.data
					that.district = res.data[0]
					if(this.$store.state.district){
						this.activeId = this.$store.state.district.id
					}else{
						that.activeId = res.data[0].id
					}	
				})
			},
			showNext (index, id) {
				this.activeArea = index
				this.district = this.area[index]
				this.activeId = id
			},
			reset () {
				this.activeArea = 0
			},
			confirm () {
				this.$store.commit('changeDistrict', this.district)
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	@import '../style/common/mixin.less';
	uni-page-body{
		height: 100%}
	.area{
		height: 100%;
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
