<template>
	<view class="personal-news">
		<headTop title="消息"></headTop>
		<view class="tabs row just_arw">
			<text class="tab" v-for="(item, index) in tabs" :key="index">{{item}}</text>
		</view>
		<postList></postList>
	</view>
</template>

<script>
	import headTop from '@/components/common/head';
	import postList from '@/components/postList'
	export default{
		name: 'news',
		components:{
			headTop,
			postList
		},
		mounted() {
		},
		data(){
			return{
				tabs: ['全部1','被查看','带面试','不合适']
			}
		}
	}
</script>


<style lang="less">
	@import url("../../style/personal/news");
</style>