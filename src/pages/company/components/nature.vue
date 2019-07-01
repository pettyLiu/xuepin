
<template>
	<view class="nature">
		<view class="natureContent">
			<view class="contentList" v-for="(item, index) in nature" :key="index" >
				<text class="contentTxt" :class="{active: activeNature == index}" @click="changeActive(index)">{{item}}</text>
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
		name: 'nature',
		data() {
			return {
				nature: [],
				activeNature: 0
			};
		},
		mounted() {
			this.getNature()
		},
		methods:{
			getNature () {
				this.nature = ['全部','电子商务','互联网','软件外包']
			},
			changeActive (index) {
				if(this.activeNature != index){
					this.activeNature = index
				}
			},
			reset () {
				this.activeNature = 0
			},
			comfirm () {
				console.log('ok?')
				this.$emit('search', { type: 'nature', data: this.nature[this.activeNature] })
			}
		},
		computed:{
		},
	}
</script>

<style lang="less">
	.nature{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 10;
		top: 44px;
		margin-top: 60upx;
		background: #ccc;
		.natureContent{
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
