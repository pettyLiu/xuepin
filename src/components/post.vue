<template>
	<view class="post">
		<view class="mask"  @touchmove.stop.prevent="moveHandle" @click="closeMask('')"></view>
		<!-- <view class="mask1"  @touchmove.stop.prevent="moveHandle1" @click="closeMask"></view> -->
		<view class="row" @touchmove.stop.prevent="moveHandle">
			<scroll-view scroll-y="true" class="postList column">
				<view v-for="(item, index) in post" :key='index'>
					<text>{{item.name}}</text>
					<view class="row" >
						<text v-for="(val, i) in item.list" :key="i" @click="closeMask(val)">{{val}}</text>
					</view>
				</view>
			</scroll-view>
		</view>	
	</view>
</template>

<script>
	export default{
		data () {
			return{
				post: 28
			}
		},
		mounted(){
			this.getPost()
		},
		methods:{
			moveHandle () {
			},
			// 关闭弹窗
			closeMask (val) {
				this.$emit("closeMask",{name: val, type: 'post'})
			},
			getPost () {
				this.post = [{name: '一级',list:['一级1','一级2']},{name:'二级',list:['二级1','erji']}]
			}
		}
	}
</script>

<style lang="less">
	.post{
		position: fixed;
		top: 0upx;
		left: 0;
		width: 100%;
		z-index: 2;
		height: calc(100% - 118upx);
		padding-top: 118upx;
		.mask{
			background: rgba(0,0,0,0.2);
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1
		}
		.postList{
			width: 100%;
			height: 700upx;
			background: white;
			z-index: 4
		}
	}
</style>
