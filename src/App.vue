<script>
	export default {
		globalData: {  
            statusBarHeight: 0
        }, 
		onLaunch: function() {
			console.log(444)
			this.$store.dispatch('getBasicConfig')
			console.log(this.$store.state)
		},
		onShow: function() {
			console.log(222)
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
</style>
