<template>
	<view class="personal-index" :style="{marginTop:statusBarHeight + 'px'}">
		<!-- 轮播图 -->
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item class="swiperItem" v-for="(item, index) in banner" :key=index>
						<image :src="item" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<section class="content">
			<!-- 搜索栏 -->
			<view class="search row ali_center" :style="{top:statusBarHeight + 'px'}">
				<view class="address">赣州</view>
				<input class="searchInp" type="text" value="" placeholder="输入搜索内容" @focus="focusOn"/>
				<text class="signOn" @click="toSignOn()">签到</text>
			</view>
			<!-- 附近 -->
			<view class="modules row just_btw">
				<view class="module column"  v-for="(item, index) in module" :key="index">
					<image :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
				
			<!-- tab栏 -->
			<slot name="tabss"></slot>
			<view class="tabs row just_btw" id="tabs">
				<text @click="changeTabs(1)" :class="{active:tabs==1}">全部职位111</text>
				<text @click="changeTabs(2)" :class="{active:tabs==2}">只看全职</text>
				<text @click="changeTabs(3)" :class="{active:tabs==3}">只看兼职</text>
			</view>
			<!-- 筛选类型 -->
			<view class="types">
				<text @click="toDetail()">全赣州</text>
				<text v-if="tabs != 1">职位类型</text>
			</view>
			
			<!-- 职位列表 -->
			<postList :list="postList"></postList>
		</section>
	</view>
</template>

<script>
	import postList from '@/components/postList'
	import collapseTransition from '../../../../lib/anition'
	export default{
		data(){
			return{
				first: '',
				indicatorDots: '',
				autoplay: true,
				interval: 5000,
				duration: 500,
				banner: ['/static/image/banner1.png','/static/image/banner2.png','/static/image/banner3.png'],
				module: [{img: '',text: '热门职位'},{img: '',text: '离我最近'},{img: '',text: '急招岗位'},{img: '',text: '最新岗位'}],
				postList: 0,
				tabs: 1,
				gg: true,
			}
		},
		mounted() {

		},
		computed:{
			statusBarHeight() {
			    var height = 0
			    uni.getSystemInfo({
			        success: function (res) {
			            height = res.statusBarHeight
			        }
			    })
				console.log(height)
			    return height
			}
		},
		
		methods:{
			toDetail () {
				this.postList = 4566
				this.gg=!this.gg
				uni.createSelectorQuery().in(this).select('#tabs').boundingClientRect(function(rect){
					console.log(rect)
				// uni.pageScrollTo({
				// 	scrollTop: 200,
				// 	duration: 300
				// });
				}).exec()				
			},
			toSignOn () {
				uni.navigateTo({
					url:'../../../../signOn'
				})
			},
			changeTabs (index) {
				if(index != this.tabs){
					this.tabs = index
				}
			},
			// 点击搜索框时
			focusOn () {
				console.log(45)
			}
		},
		onPageScroll(){
			console.log(444)
		},
		components:{
			// collapseTransition,
			postList
			
		}
	}
</script>

<style lang="less">
	@import url("../../../../style/personal/index");
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
</style>
