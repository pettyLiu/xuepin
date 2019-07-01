<template>
	<view class="personal-news">
		<view class="tabs row just_arw">
			<text class="tab" :class="{active: activeTab==index}" v-for="(item, index) in tabs" :key="index" @click="changeTabs" :id="index">{{item}}</text>
			<view class="sliderBorder" :style="{left: sliderLeft + 'px'}"></view>
		</view>
		<postList :list="news" type="news"></postList>
	</view>
</template>

<script>
	import postList from '@/components/postList'
	const sliderWidth = 20
	export default{
		name: 'news',
		components:{
			postList
		},
		mounted() {
		},
		data(){
			return{
				tabs: ['全部','被查看','待面试','不合适'],
				activeTab: 0,
				slotNames: ['待处理','已被查看','待面试','不合适'],
				slotName: '待处理',
				news: [1,2,3,4],
				sliderLeft: 0,
			}
		},
		methods:{
			changeTabs (e) {
				console.log(e)
				if(this.activeTab != e.target.id){
					this.activeTab = e.target.id
					this.slotName = this.slotNames[e.target.id]
					this.sliderLeft = e.target.offsetLeft + this.tt
					this.getPostList()
				}
			},
			getPostList () {
				
			},
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/that.tabs.length - sliderWidth)/2,
					that.tt = (res.windowWidth/that.tabs.length - sliderWidth)/2
			    }
			})
		},
	}
</script>


<style lang="less">
	@import url("../../style/personal/news");
</style>