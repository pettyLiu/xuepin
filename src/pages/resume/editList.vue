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
				placeholder: '',
				type: ''
			};
		},
		onLoad(options) {
			this.title = options.title
			this.type = options.type
			switch (this.title){
				case 'true_name':
					uni.setNavigationBarTitle({
						title: '姓名'
					})
					this.placeholder = '请输入姓名'
					this.txt = this.$store.state.information.userInfo[options.title]
					break;
				case 'email':
					uni.setNavigationBarTitle({
						title: '邮箱'
					})
					this.placeholder = '请输入邮箱'
					this.txt = this.$store.state.information.userInfo[options.title]
					break;
				case 'school':
					uni.setNavigationBarTitle({
						title: '学校'
					})
					this.placeholder = '请输入学校名称'
					this.txt = this.$store.state.fullTime.education[options.title]
					break;
				case 'major':
					uni.setNavigationBarTitle({
						title: '专业'
					})
					this.placeholder = '请输入专业名称'
					this.txt = this.$store.state.fullTime.education[options.title]
					break;
			}
		},
		// 保存信息
		onNavigationBarButtonTap (val){
			if(this.type == 1){
				this.$store.commit('changeInfo',{ key:this.title, value: this.txt })
			}else if(this.type == 2){
				this.$store.commit('changeEducation',{ key:this.title, value: this.txt })
			}
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
