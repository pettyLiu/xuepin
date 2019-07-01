
<template>
	<view class="scale">
		<view class="scaleContent">
			<view class="contentList" v-for="(item, index) in scale" :key="index" >
				<text class="contentTxt" :class="{active: activeScale == index}" @click="changeActive(index)">{{item}}</text>
			</view>
		</view>
		<view class="handle">
			<text class="reset" @click="reset()">重置</text>
			<text class="comfirm" @click="comfirm()">确定</text>
		</view>
	</view>
</template>

<script>
	export default { 
		name: 'scale',
		data() {
			return {
				scale: [],
				activeScale: 0
			};
		},
		mounted() {
			this.getNature()
		},
		methods:{
			getNature () {
				this.scale = ['全部','0-20人','20-99人','软件外包']
			},
			changeActive (index) {
				if(this.activeScale != index){
					this.activeScale = index
				}
			},
			reset () {
				this.activeScale = 0
			},
			comfirm () {
				this.$emit('search', { type: 'scale', data: this.scale[this.activeScale] })
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
	.scale{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		top: 44px;
		margin-top: 60upx;
		background: #ccc;
		.scaleContent{
			display: flex;
			flex-wrap: wrap;
			.contentList{
				width: 33.33%;
				text-align: center;
				height: 50upx;
				padding: 10upx 0;
				.contentTxt{
					height: 100%;
					border: 1px solid #999
				}
			}
			.active{
				background: white
			}
		}
		.handle{
			width: 100%;
			border-top: 1px solid #999;
			.reset,.comfirm{
				width: calc(50% - 0.5px);
				display: inline-block;
				text-align: center;
				height: 50upx;
				line-height: 50upx
			}
			.reset{
				border-right: 1px solid #999
			}
		}
	}

</style>
