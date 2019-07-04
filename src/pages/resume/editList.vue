<template>
	<view class="editList">
		<input class="inp" type="text" value="" :placeholder="placeholder" v-model="txt"/>
	</view>
</template>

<script>
	export default {
		name: 'editLsit',
		data() {
			return {
				title: '',
				txt: '',
				placeholder: ''
			};
		},
		onLoad(options) {
			this.title = options.title		
			this.txt = this.$store.state.information.info[options.title]
			if(this.title == 'nickName'){
				uni.setNavigationBarTitle({
					title: '姓名'
				})
				this.placeholder = '请输入姓名'
			}else{
				uni.setNavigationBarTitle({
					title: '邮箱'
				})
				this.placeholder = '请输入邮箱'
			}
		},
		// 保存信息
		onNavigationBarButtonTap (val){
			this.$store.commit('changeInfo',{ key:this.title, value: this.txt })
			uni.navigateBack({
				delta: 1
			});
		},
		methods:{
		},
		computed:{
		},
	}
</script>

<style lang="less">
	@import '../../style/common/mixin.less';
	.editList{
		height: 100%;
		width: 100%;
		background: white;
		padding: 30upx 5%;
	}
	.inp{	
		width: 90%;
		height: 60upx;
		border-bottom: 2upx solid @g_color
	}
	uni-page-body{
		height: 100%
	}
</style>
