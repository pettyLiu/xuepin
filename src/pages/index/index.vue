<template>
	<view class="content">
		<!-- 个人角色模块 -->
		<section class="personal-index">
			<!-- 轮播图 -->
			<pageTop ></pageTop>
			<view class="modules row just_btw"  >
				<view class="module column"  v-for="(item, index) in module" :key="index">
					<image :src="item.img" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view :class="{mounting: istop}" :style="{marginTop: statusBarHeight + 'px'}"  @touchmove.stop.prevent="moveHandle1">
				<view class="tabs row just_btw" id="tabs">
					<text @click="changeTabs(1)" :class="{active:tabs==1}">全部职位</text>
					<text @click="changeTabs(2)" :class="{active:tabs==2}">只看全职</text>
					<text @click="changeTabs(3)" :class="{active:tabs==3}">只看兼职</text>
				</view>
				<view class="types">
					<text @click="chooseArea">全赣州</text>
					<text @click="chooseType" v-if="tabs != 1">职位类型</text>
				</view>
			</view>			
			<!-- 职位列表 -->
			<postList :list="postList"></postList>
			<!-- 地区选择 -->
			<areas v-if="showArea"></areas>
			<!-- 职位选择 -->
			<posts v-if="showPost"></posts>
		</section>
		
		<!-- <personalIndex v-if="page_code == 'personal_index'">
			<view class="tabs row just_btw" id="tabs" slot="tabss">
				<text @click="changeTabs(1)" :class="{active:tabs==1}">全部职位</text>
				<text @click="changeTabs(2)" :class="{active:tabs==2}">只看全职</text>
				<text @click="changeTabs(3)" :class="{active:tabs==3}">只看兼职</text>
			</view>
		</personalIndex> -->
	</view>
</template>

<script>
	import pageTop from './components/top'
	import postList from '@/components/postList'
	import areas from '@/components/area'
	import posts from '@/components/post'
	export default {
		data() {
			return {
				title: 'Hello',
				tabs: 1,
				top: '',
				istop: false,
				module: [{img: '',text: '热门职位'},{img: '',text: '离我最近'},{img: '',text: '急招岗位'},{img: '',text: '最新岗位'}],
				postList: 0,
				showArea: false,
				showPost: false
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
				console.log(height)
			    return height
			}
		},
		onLoad() {
			this.title = this.$store.state.footer_store.footer_nav[1].name_code
		},
		components:{
			pageTop,
			postList,
			areas,
			posts
		},
		mounted(){
			const that = this
			that.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('#tabs').boundingClientRect(function(rect){
					that.top = rect.top
				}).exec()
			})
		},
		methods: {
			chooseArea () {
				this.changePlace()
				const that = this
				setTimeout(function(){				
					that.showArea = true
				}, 300)
				plus.globalEvent.body.classList.add('overflow-hidden');
				// plus.globalEvent.addEventListener
				plus.globalEvent.addEventListener('touchmove', this.touchStart,{passive:false});				
			},
			chooseType () {
				this.changePlace()
				const that = this
				setTimeout(function(){
					that.showPost = true
				}, 300)			
			},
			changeTabs (index) {
				if(index != this.tabs){
					this.tabs = index
				}
			},
			// 改变位置
			changePlace () {
				uni.pageScrollTo({
					scrollTop: this.top,
					duration: 300
				})
				this.istop = true
				console.log(this.istop)
			}
		},
		onPageScroll(e){
			if(e.scrollTop >= this.top){
				this.istop = true
			}else{
				this.istop = false
			}
		},
	}
</script>

<style lang="less">
	@import url("../../style/personal/index");
	.content{
		font-size: 28upx;
	}
</style>
