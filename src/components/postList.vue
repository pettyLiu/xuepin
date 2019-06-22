<template>
	<view class="postLists">
		<view class="" @click="toPostDetail()" v-for="item in 19">
			<view class="row just_btw">
				<text>技术总监</text>
				<text>10k-20k/月</text>
			</view>
			<text><i></i>章贡区<i></i>赣州公司</text>
			<view class="">
				<text>带薪休假</text>
				<text>五险一金</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['list'],
		methods:{
			toPostDetail () {
				uni.navigateTo({
					url: '../postDetail'
				})
			}
		},
		computed:{


		}
	}
</script>

<style>

</style>
