<template>
	<view class="content">
		<!-- 个人角色模块 -->
		<section class="personal-index">		
			<pageTop :istop="istop"></pageTop><!-- 轮播图 -->
			<view class="modules row just_btw" v-if="!istop" ><!-- 快捷搜索 -->
				<view class="module column center"  v-for="(item, index) in module" :key="index" @click="toNext(item.text)">
					<image :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view :class="{mounting: istop}" @touchmove.stop.prevent="moveHandle" :style="{top: statusBarHeight + 10 + 'px'}">
				<view class="tabs row" id="tabs">
					<text class="tab" id="1" @click="changeTabs" :class="{active:tabs==1}">全部职位</text>
					<text class="tab" id="2" @click="changeTabs" :class="{active:tabs==2}">只看全职</text>
					<text class="tab" id="3" @click="changeTabs" :class="{active:tabs==3}">只看兼职</text>
					<view class="sliderBorder"
					:style="{transform: 12,left: sliderLeft + 'px'}"></view>
				</view>				
				<view class="types row ali_center">
					<text @click="chooseArea">{{area}}<text class="iconfont">&#xe65a;</text></text>
					<text @click="chooseType" v-if="tabs != 1">{{post}}<text class="iconfont">&#xe65a;</text></text>
					<text class="border"></text>
				</view>
			</view>
			<view  :class="{tt: istop}" :style="{marginTop: istop ? (statusBarHeight + 10 + 'px') : 0 }">
				<postList :list="postList" type="index"></postList><!-- 职位列表 -->	
			</view>					
		</section>
		<view class="loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import pageTop from './components/top'
	import postList from '@/components/postList'
	const sliderWidth = 20;
	export default {
		data() {
			return {
				tabs: 1,
				top: '',
				istop: false,
				module: [{img: '/static/image/remen_icon.png',text: '热门职位'},{img: '/static/image/zuijin_icon.png',text: '离我最近'},{img: '/static/image/jizhao_icon.png',text: '急招岗位'},{img: '/static/image/zuixin_icon.png',text: '最新岗位'}],
				postList: [1,2,2],
				showArea: false,
				showPost: false,
				post: '职位类型',
				area: '赣州',
				sliderLeft: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		computed: {
			page_code() {
				return this.$store.state.footer_store.footer_nav[this.$store.state.footer_store.now_page_index].name_code;
			},
			statusBarHeight() {
			    var height = 0
			    uni.getSystemInfo({
			        success: function (res) {
			            height = res.statusBarHeight
			        }
			    })
				getApp().globalData.statusBarHeight = height
			    return height
			}
		},
		onLoad() {
			this.$axios({url: 'api/dishes', method: 'post'}).then(res =>{
				// console.log(res)
			})
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.sliderLeft = (res.windowWidth/3 - sliderWidth)/2,
					that.tt = (res.windowWidth/3 - sliderWidth)/2
			    }
			})
		},
		// 触底加载更多
		onReachBottom() {
			if (this.postList.length > 10) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true
			setTimeout(() => {
				this.getPostLsit();
			}, 300);
		},
		components:{
			pageTop,
			postList,
		},
		mounted(){
			const that = this
			that.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('#tabs').boundingClientRect(function(rect){
					that.top = rect.top
				}).exec()
			})
		},
		onPullDownRefresh() {
			var that = this
			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.istop = false
			}, 200);
		},
		methods: {
			moveHandle (){},			
			getPostLsit () { // 获取新的职位列表
				// 有三个参数，tab，area，post，
				this.postList.push([1,2,3,3])
			},
			chooseArea () { // 点击地区
				this.changePlace()
				uni.navigateTo({
					url:'/pages/filterArea'
				})
				const that = this
				if(!that.showArea){
					setTimeout(function(){				
						that.showArea = true
						that.showPost = false
					}, 300)
				}			
			},	
			chooseType () { // 点击职位类型
				this.changePlace()
				const that = this
				uni.navigateTo({
					url:'/pages/filterPost'
				})
				if(!that.showPost){
					setTimeout(function(){
						that.showPost = true
						that.showArea = false
					}, 300)
				}
			},
			changeTabs (e) {
				if(e.target.id != this.tabs){
					this.tabs = e.target.id
					this.sliderLeft = e.target.offsetLeft + this.tt					
					this.getPostLsit()
				}
				
			},
			closeMasks (val) { //关闭弹窗
				this.showArea = false
				this.showPost = false
				if(val.name){
					if(val.type == 'area'){
						this.area = val.name
					}else{
						this.post = val.name
					}
					this.getPostLsit()
				}
			},
			changePlace () { // 改变位置
			},
			toNext (title) {
				uni.navigateTo({
					url: '/pages/search/moduleSearch?title=' + title
				})
			}
		},
		onPageScroll(e){
			// console.log(e.scrollTop)
			if(e.scrollTop >= this.top && !this.istop){
				this.istop = true
			}
		},
	}
</script>

<style lang="less">
	@import url("../../style/personal/index");
</style>
