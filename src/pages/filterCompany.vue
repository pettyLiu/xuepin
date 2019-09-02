<template>
	<view class="filterCompany">
		<view class="">
			<text class="f_32 title">行业分类</text>
			<view class="content">
				<view class="contentList">
					<text class="contentTxt" :class="{active: activeNature == 99}" @click="changeNatureActive(99)">全部</text>
				</view>	
				<view class="contentList" v-for="(item, index) in nature"  :key="index">				
					<text class="contentTxt" :class="{active: activeNature == index}" 
					@click="changeNatureActive(index)">{{item.name}}</text>
				</view>	
			</view>
		</view>
		<view class="">
			<text class="f_32 title">公司规模</text>
			<view class="content">
				<view class="contentList">
					<text class="contentTxt" :class="{active: activeScale == 99}" @click="changeScaleActive(99)">全部</text>
				</view>
				<view class="contentList" v-for="(item, index) in scale" :key="index" >
					<text class="contentTxt" :class="{active: activeScale == index}" 
					@click="changeScaleActive(index)">{{item}}</text>
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
    import { mapState } from 'vuex'
	export default {
		name: 'filterCompany',
		data() {
			return {
				nature: [],
				scale: [],
				activeNature: 99,
				activeScale: 99
			};
		},
		onLoad() {
			this.getNature()
			this.scale = this.basicConfig.basicConfig.ent_scale
			const filters = this.$store.state.filterCompany.filter
			this.activeNature = filters.nature ? Number(filters.nature - 1) : 99
			this.activeScale = filters.scale ? Number(filters.scale - 1) : 99
		},
		methods:{
			getNature () {
				const that = this
				that.$axios({
					url: 'api/base/busyClass',
				}).then(res =>{
					this.nature = res.data
				})
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
				this.activeScale = 99
				this.activeNature = 99
				this.$store.commit('reset_filter')
			},
			comfirm () {
				const scale = this.activeScale == 99 ? '' : this.activeScale + 1
				const nature = this.activeNature == 99 ? '' : this.nature[this.activeNature].id
				this.$store.commit('change_filter',{ nature: nature, scale: scale })
				uni.navigateBack()
			}
		},
		computed:{
			...mapState(['basicConfig'])
		},
		components:{
		}
	}
</script>

<style lang="less">
	@import '../style/personal/filterCompany';
</style>
