<template>
	<view class="">
		<view class="search row ali_center just_btw" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<view class="address">赣州<text class="iconfont icon-sanjiao"></text></view>
			<view class="searchView">
				<input class="searchInp" type="text" value="" placeholder="输入关键字" @confirm="search(keyword)" placeholder-class="searchPlaceholder" v-model="keyword" />
				<text class="iconfont icon-sousuo"></text>
			</view>
			<text  @click="back">取消</text>
		</view>	
		<view class="history" :style="{paddingTop:statusBarHeight + 10 + 'px'}">
			<input type="text" value="" />
			<text class="tips" v-if="lists.length >0 && keyword != ''">暂无搜索内容</text>
			<view class="row just_btw" v-if="lists.length == 0 && keyword ==''">
				<text>历史搜索</text>
				<text class="iconfont icon-del1" @click="delSearch"></text>
			</view>
			<view class="lists row" v-if="lists.length == 0 && keyword ==''">
				<text class="f_24 c_999 list" v-for="item in history" :key="item" @click="search(item)">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data () {
			return{
				statusBarHeight: getApp().globalData.statusBarHeight,
				keyword: '',
				lists: [],
				history: uni.getStorageSync('search') ? uni.getStorageSync('search') : []
			}
		},
		mounted() {
		},
		methods:{
			search (keyword) { // 搜索
				if(this.history.length == 0){
					this.history.push(keyword)
					uni.setStorageSync('search', this.history)
				}
				for(let i=0; i < this.history.length; i++){
					if(this.history[i] == keyword){
						break;
					}else if(i == this.history.length - 1){
						this.history.push(keyword)
						uni.setStorageSync('search', this.history)
					}
				}	
			},
			back () { // 返回
				uni.navigateBack()
			},
			delSearch () {
				uni.removeStorageSync('search')
			}
		}
	}
</script>

<style lang="less">
	@import '../../style/search/index';
</style>