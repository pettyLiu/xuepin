<template>
	<view class="user">
		<section class="userDetail" :style="{paddingTop: statusBarHeight + 10 + 'px'}">
			<image class="bg" src="/static/icon/bg.png" mode=""></image>
			<text class="f_24 signOut" @click="signOut">退出登录</text>
			<view class="row just_btw userTxt">
				<view class="column">
					<text class="nickName f_48">{{info.userName}}</text>
					<text class="f_26 c_e4" @click="toNext('/pages/resume/index')">点击查看简历并编辑</text>
				</view>
				<image class="avatar" :src="info.avatar" mode="" @click="uploadAvatar"></image>
			</view>
			<view class="row just_btw">
				<view class="row">
					<view class="recharge column" @click="toNext('/pages/user/integralRecord')">
						<text>{{info.credit}}</text>
						<text>积分</text>
					</view>
					<view class="recharge column" @click="toNext('/pages/user/goldRecord')">
						<text>{{info.coin}}</text>
						<text>金币</text>
					</view>
				</view>
				<text class="signOn globelColor f_24" @click="toNext('/pages/signOn')">去签到</text>
			</view>		
		</section>
		<section class="row just_btw resume">
			<view class="column just_arw">
				<text class="f_48">{{info.count}}</text>
				<text class="f_36">完善简历提高您的录取率</text>
				<text class="btn" @click="toNext('/pages/resume/index')">去完善简历</text>
			</view>
			<!-- <canvas class="degree" canvas-id="degree"></canvas> -->
		</section>
		<section class="lists">
			<view class="list" @click="toNext('/pages/user/goldRecharge')">
				<image class="icon" src="/static/icon/chongzhi_icon@2x.png" mode=""></image>充值<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/collection')">
				<image class="icon" src="/static/icon/shoucang_icon@2x.png" mode=""></image>我的收藏<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list">
				<image class="icon" src="/static/icon/qiehuangshe_icon@2x.png" mode=""></image>切换为招聘者<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/setting/index')">
				<image class="icon" src="/static/icon/shezhi_icon@2x.png" mode=""></image>设置<text class="iconfont icon-youjiantou"></text>
			</view>
		</section>
	</view>
</template>

<script>
	import config from '../../lib/config'
	export default{
		data(){
			return{
				avatar: '../../static/icon/moren.png',
				info: {}
			}
		},
		components:{
		},
		methods:{
			getUserInfo(){
				const that = this
				that.$axios({
					url: 'api/user/index',
					method: 'get'
				}).then(res =>{
					that.info = res.data
				})
			},
			// 更换头像
			uploadAvatar () {
				const that = this
				uni.chooseImage({
					count: 1,
					success: function(res){
						that.avatar = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + 'upload/ajaxUploads',
							filePath: that.avatar,
							name: 'fileUpload',
							success: (uploadFileRes) => {
								console.log(JSON.parse(uploadFileRes.data) );
								that.info.avatar = config.imgUrl + JSON.parse(uploadFileRes.data).data
								that.$axios({
									url: 'api/user/ajaxEditUser',
									method: 'post',
									data:{
										avatar: that.info.avatar
									}
								}).then(res => {
									console.log(res)
								})
							}
						});
					}
				})
			},
			// 到下一页
			toNext (url) {
				uni.navigateTo({
					url: url
				})
			},
			signOut () { // 退出登录
				this.$store.commit('loginOut')
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}
		},
		computed:{
			statusBarHeight() {
			    var height = 0
			    uni.getSystemInfo({
			        success: function (res) {
			            height = res.statusBarHeight
			        }
			    })
			    return height
			}
		},
		onLoad () {
			this.getUserInfo()
		},
		onShow () {
			this.getUserInfo()
		},
		onReady () {
			var context = uni.createCanvasContext('degree')
			context.arc(35, 35, 30, 0, 2 * Math.PI, true)
			context.strokeStyle = 'red'
			context.lineWidth = 5
			context.stroke()
			var startAngle = 3 / 2 * Math.PI
			var percentage = 10
			var diffAngle = percentage / 100 * Math.PI * 2 //完成进度弧度值
			context.beginPath()
			context.arc(35, 35, 30, startAngle, diffAngle + startAngle, false)
			context.strokeStyle = 'green'
			context.stroke()
			context.fillStyle = '#000'
			context.textAlign = 'center'
			context.font = '16px serif'
			context.fillText(percentage + '%', 35, 35+5)
			context.draw()
		}
	}
</script>


<style lang="less">
	@import url("../../style/user/index");
</style>