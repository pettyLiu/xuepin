<template>
	<view class="personal-company">
		<!-- 筛选 -->
		<view class="classfiy row">
			<text class="classfiyItem" @click="show(1)">行业<text class="iconfont icon-sanjiao"></text></text>
			<text class="classfiyItem" @click="show(2)">规模<text class="iconfont icon-sanjiao"></text></text>
			<text class="border"></text>
		</view>
		<!-- 公司列表 -->
		<view class="companyLists">
			<view class="companyList" v-for="(item, index) in 9" :key="index" @click="toCompanyDetail">
				<view class="companyTxt row ali_center">
					<image class="companyAvatar" src="/static/image/banner2.png" mode=""></image>
					<view class="column just_btw">
						<text class="companyName">赣州公司</text>
						<text class="address"><text class="iconfont icon-weizhi"></text>赣州市 章贡区</text>
					</view>
				</view>
				<view class="companyTypes">
					<text class="companyType">互联网/电子商务</text>
				</view>
				<view class="companyRecruit row ali_center just_btw">
					<text>在招职位 <text class="globeColor">“5”个职位</text></text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
		</view>
		<text v-if="type==2">jfudfh</text>
		<nature v-if="type==1" v-on:search="searchData"></nature>
		<scale v-if="type==2" v-on:search="searchData"></scale>
	</view>
</template>

<script>
	import nature from './components/nature'
	import scale from './components/scale'
	export default{
		data(){
			return{
				ac: '',
				animationData: {},
				type: 0
			}
		},
		mounted() {

		},
		methods:{
			show (type) {
				if(this.type != type && this.type === 0){					
					this.type = type
				}
				// this.animationData.rotate(45).scale(2, 2).step()
				// this.animationData = this.animation.export()
			},
			searchData (datas) {
				this.type = 0 // 关闭选择窗
				if(datas.type == 'nature'){
					
				}
			},
			toCompanyDetail () {
				uni.navigateTo({
					url: '../companyDetail'
				})
			}
		},
		onShow: function(){
			// var animation = uni.createAnimation({
			// 	duration: 1000,
			// 	timingFunction: 'ease',
			// })
			// this.animation = animation
			// animation.scale(2,2).rotate(45).step()
			// this.animationData = animation.export()
			// setTimeout(function() {
			// 	animation.translate(30).step()
			//     this.animationData = animation.export()
			// }.bind(this), 1000)
		},
		components:{
			nature,
			scale
		}
	}
</script>

<style lang="less">
	@import url("../../style/personal/company");
</style>
