<template>
	<view class="area row">
		<scroll-view scroll-y="true" class="areaLeft column">
			<view class="areaItem" v-for="(item, index) in province" 
            :key="index" @click="change(0, index, item.id)" :class="{active: provinceActive == item.id}">{{item.name}}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="areaCenter column">
			<view class="areaItem" v-for="(item, index) in city" :key="index" 
            @click="change(1, index, item.id)" :class="{active: cityActive == item.id}">{{item.name}}</view>
		</scroll-view>
		<!-- <scroll-view scroll-y="true" class="areaRight">
			<view class="areaItem" @click="closeMask(subArea)">{{subArea}}</view>
		</scroll-view> -->
		<view class="btn row ali_center just_btw">
			<text class="reset">重置</text>
			<text class="comfirm" @click="regionChange">确定</text>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'chooseAddress',
		data () {
			return{
				statusBarHeight: 0,
                thirActiveArea: 0,
                province: [],
                city: [],
                district: [],
				province_id: '', // 现居地址-省
                city_id: '', // 现居地址-市
                provinceActive: 0,
                cityActive: 0,
                cityIndex: 0
			}
		},
		mounted() {
            this.getProvinces()
            this.statusBarHeight = getApp().globalData.statusBarHeight
            console.log(this.selectedCity)
            this.provinceActive = this.selectedCity.parent_id
            this.cityActive = this.selectedCity.id
		},
		methods:{
			moveHandle () {
			},
			// 关闭弹窗
			closeMask (item) {
				console.log(item)
			},
			getProvinces () { // 获取省份
				var that = this
				this.$axios({
					url: 'api/base/province',
					method: 'get',
				}).then(function(res){
                    that.province = res.data
                    // that.provinceActive = res.data[0].id
					that.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: that.provinceActive
						}
					}).then(function(res1){
                        that.city = res1.data
                        // that.cityActive = res1.data[0].id
					})
				})
			},
			// 选中地区点击确定
            regionChange() {
                uni.setStorageSync('city', JSON.stringify(this.city[this.cityIndex]))
                this.$store.commit('changeCity', this.city[this.cityIndex])
                uni.switchTab({
                    url: '/pages/index/index'
                })
			},
			change (column, index, id){
				var that = this
				if(column == 0){				
					this.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: id
						}
					}).then(function(res){
						if(res.code == 1){
                            that.city = res.data
                            that.provinceActive = id
                            that.cityActive = res.data[0].id
                            that.cityIndex = 0
						}
					})
				}else if(column == 1){				
                    that.cityActive = id
                     that.cityIndex = index
				}	
			},
        },
        computed: {
            selectedCity () {
                return this.$store.state.city
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
			width: 35%;
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
			width: 33%;
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
