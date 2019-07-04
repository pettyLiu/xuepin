<template>
	<view class="filterCompany">
		<view class="">
			<text class="f_32 title">行业分类</text>
			<view class="content">
				<view class="contentList" v-for="(item, index) in nature" :key="index" >
					<text class="contentTxt" :class="{active: activeNature == index}" @click="changeNatureActive(index)">{{item}}</text>
				</view>	
			</view>
		</view>
		<view class="">
			<text class="f_32 title">公司规模</text>
			<view class="content">
				<view class="contentList" v-for="(item, index) in scale" :key="index" >
					<text class="contentTxt" :class="{active: activeScale == index}" @click="changeScaleActive(index)">{{item}}</text>
				</view>
			</view>
		</view>	
		<view class="btn row ali_center just_btw">
			<text class="reset" @click="reset()">重置</text>
			<text class="comfirm" @click="comfirm()">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'filterCompany',
		data() {
			return {
				nature: [],
				scale: [],
				activeNature: 0,
				activeScale: 0
			};
		},
		onLoad() {
			this.getNature()
		},
		methods:{
			getNature () {
				this.scale = ['全部','0-20人','20-99人','软件外包']
				this.nature = ['全部','电子商务','互联网','软件外包']
			},
			changeScaleActive (index) {
				if(this.activeScale != index){
					this.activeScale = index
				}
			},
			changeNatureActive (index) {
				if(this.activeNature != index){
					this.activeNature = index
				}
			},
			reset () {
				this.activeScale = 0
				this.activeNature = 0
			},
			comfirm () {
				const scale = this.scale[this.activeScale]
				const nature = this.nature[this.activeNature]
				this.$store.commit('change_filter',{ nature: nature, scale: scale })
				uni.navigateBack()
			}
		},
		computed:{
		},
		components:{
		}
	}
</script>

<style lang="less">
	@import '../style/personal/filterCompany';
</style>
