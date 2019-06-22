<template>
	<view class="">
		<view class="" :style="{height: statusBarHeight + 'px'}"></view>
		<view class="head row center" >
			{{title}}
			<slot name="companySearch"></slot>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'headTop',
		props: ['title'],
		computed: {
		    statusBarHeight() {
		        var height = 0
		        uni.getSystemInfo({
		            success: function (res) {
		                height = res.statusBarHeight
		            }
		        })
		        return height
		    }
		}
	}
</script>

<style>
	.head{
		height: 44px;
		font-size: 28upx;
		background: #fff;
	}
</style>
