<template>
	<view class="selfAssessment">
		<textarea class="text" @blur="bindTextAreaBlur" @input="changeWord" v-model="content"
		:placeholder="placeholder" maxlength="500" placeholder-class="placeholder"/>
		<text class="f_26 num">{{num}}/500</text>
	</view>
</template>

<script>
	export default {
		name: 'selfAssessment',
		data() {
			return {
				num: 0,
				content:'',
				placeholder: '自我介绍,最多输入500字'
			};
		},
		methods:{
			bindTextAreaBlur () {
				
			},
			changeWord (e) { // 输入字符
				this.num = e.detail.value.length
			}
		},
		onLoad (options) {
			if(options.title){
				uni.setNavigationBarTitle({
					title: '工作描述'
				})
				this.placeholder = '请描述工作职位，最多输入500字'
			}
		},
		
		onNavigationBarButtonTap (val){ // 保存信息
		},
		computed:{
		},
	}
</script>

<style lang="less">
	@import '../../style/common/mixin.less';
	.selfAssessment{
		position: relative;
		.text{
			margin-top: 24upx;
			background: white;
			height: 382upx;
			width: calc(100% - 70upx);
			padding: 35upx
		}
		.num{
			position: absolute;
			bottom: 35upx;
			right: 35upx;
			color:#e0e0e0
		}
	}
	
</style>
