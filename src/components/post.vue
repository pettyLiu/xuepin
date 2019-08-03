<template>
	<view class="area row">
		<scroll-view scroll-y="true" class="areaLeft column">
			<view class="areaItem" v-for="(item, index) in topCategory" 
			:key="index" :class="{active: categoryId == item.id}" @click="showNext(index, item.id)">{{item.name}}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="areaCenter column">
			<view class="areaItem" v-for="(item, index) in area" :key="index" @click="changeTwo(index, item.id)" 
			:class="{active: areaId == item.id}">{{item.name}}</view>
		</scroll-view>
		<view class="btn row ali_center just_btw">
			<text class="reset" @click="reset">重置</text>
			<text class="comfirm" @click="confirm">确定</text>
		</view>
	</view>
</template>

<script>
import { Stream } from 'stream';
	export default{
		name: 'post',
		data () {
			return{
				area: ['零售'],
				activeArea: 0,
				topCategory: '',
				activeCategory: 0,
				categoryId: '',
				areaId: ''
			}
		},
		props: {
			alias: String
		},
		mounted() {
			
			this.getCategory()
		},
		methods:{
			moveHandle () {
			},
			getCategory () {
				const that = this
				that.$axios({
					url: 'api/base/oneJob',
					data: {
						type: that.alias == 'full_rec' ? 1 : 2
					}
				}).then(res => {
					that.topCategory = res.data
					const category = that.$store.state.category
					if(category){
						if (that.alias == 'full_rec'&& category.alias=='full_rec') { // 全职
							that.categoryId = category.parent_id
							that.areaId = category.id
						}else{ // 兼职
							that.areaId = category.id
						}
					}else{
						that.categoryId = res.data[0].id
					}	
					that.showNext(0, that.categoryId)
				})
			},
			showNext (index, id) {
				const that = this
				that.activeArea = 0
				that.$axios({
					url: 'api/base/twoJob',
					data: {
						id: id
					}
				}).then(res => {
					that.area = res.data
					const category = that.$store.state.category
					if(!category && that.alias == 'full_rec'){
						that.areaId = res.data[0].id
					}	
				})
				this.activeCategory = index
				this.categoryId = id	
			},
			changeTwo (index, id) {
				this.activeArea = index
				this.areaId = id
			},
			reset () {
				this.activeArea = 0
				this.activeCategory = 0
			},
			confirm () {
				if(this.area != ''){
					this.category = this.area[this.activeArea]
				}else{
					this.category = this.topCategory[this.activeCategory]
				}
				this.$store.commit('changeCategory', this.category)
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
