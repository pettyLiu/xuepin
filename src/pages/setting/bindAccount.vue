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
			this.placeholder = options.detail
		},
		// 保存信息,暂时未有微信绑定
		onNavigationBarButtonTap (val) {
            const that = this
            that.$axios({
                url: 'api/user/ajaxBindQQ',
                method: 'post',
                data: {
                    qq: that.txt
                }
            }).then(res => {
                if(res.code == 1){
                    uni.showToast({ title: '绑定成功', icon: 'none' })
                    setTimeout(function(){
                        uni.navigateBack()
                    }, 1000)
                }else{
					uni.showToast({ title: res.msg, icon: 'none' })
				}
            })
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
