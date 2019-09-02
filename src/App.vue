<script>
import { setTimeout } from 'timers';
	export default {
		globalData: {  
            statusBarHeight: 0
        }, 
		onLaunch: function() {
			this.$store.dispatch('getBasicConfig')
			console.log(this.$store.state)
		},
		onShow: function() {
			// this.$store.dispatch('getBasicConfig')
			// console.log(this.$store.dispatch('getBasicConfig'))
			console.log(this.$store.state.roleType)
			if(this.$store.state.roleType == 1){
				uni.setTabBarItem({
					index: 1,
					text: '公司',
					iconPath: 'static/image/company_nor.png',
					selectedIconPath: 'static/image/company_hov.png'
				})
			}else{
				console.log(454515)
				setTimeout(function(){
					uni.setTabBarItem({
					index: 1,
					text: '职位',
					iconPath: 'static/image/post_nor.png',
					selectedIconPath: 'static/image/post_hov.png'
				})
				},1000)
				
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style/common/common.less");
	body{
		background: #f5f5f5;
		font-size: 28upx;
		height: 100%;
	}
	.searchPlaceholder{
		margin-left: 40upx;
	}
</style>
