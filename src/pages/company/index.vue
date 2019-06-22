<template>
	<view class="personal-company">
		<headTop title="企业">
			<image class="search" src="" mode="" slot="companySearch"></image>
		</headTop>
		<!-- 筛选 -->
		<view class="">
			<text>行业</text>
			<text>规模</text>
		</view>
		<!-- 公司列表 -->
		<view class="companyLists">
			<view class="companyList">
				<view class="companyTxt row">
					<image class="companyAvatar" src="" mode=""></image>
					<view class="column">
						<text>赣州公司</text>
						<text>赣州市 章贡区</text>
					</view>
				</view>
				<text class="companyType">互联网/电子商务</text>
				<view class="companyRecruit">
					<text>在招职位5个职位</text>
					<i></i>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headTop from '@/components/common/head';
	export default{
		mounted() {

		},
		components:{
			headTop
		}
	}
</script>

<style lang="less">
	@import url("../../style/personal/company");
</style>
