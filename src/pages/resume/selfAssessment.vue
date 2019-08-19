<template>
	<view class="selfAssessment">
		<textarea class="text" @blur="bindTextAreaBlur" @input="changeWord" v-model="content"
		:placeholder="placeholder" maxlength="500" placeholder-class="placeholder"/>
		<text class="f_26 num">{{num}}/500</text>
	</view>
</template>

<script>
import { setTimeout } from 'timers';
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
			this.id = options.id
			if(options.title == 'work_desc'){
				this.title = 'work_desc'
				uni.setNavigationBarTitle({
					title: '工作描述'
				})
				this.placeholder = '请描述工作职位，最多输入500字'
				this.content = this.$store.state.fullTime.work.work_desc
			}else{
				this.content = options.info
			}
		},
		
		onNavigationBarButtonTap (val){ // 保存信息
			const that = this
			if(this.title == 'work_desc'){
				this.$store.commit('changeWork',{ key:this.title, value: this.content })
				uni.navigateBack()
			}
			else{
				that.$axios({
					url: 'api/resume/saveIntro',
					method: 'post',
					data: {
						id: that.id,
						intro: that.content
					}
				}).then(res => {
					if(res.code == 1){					
						setTimeout(function(){
							uni.navigateBack()
						}, 1000)
					}
				})
			}	
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
