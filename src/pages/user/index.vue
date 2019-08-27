<template>
	<view class="user">
		<section class="userDetail" :style="{paddingTop: statusBarHeight + 10 + 'px'}">
			<image class="bg" src="/static/icon/bg.png" mode=""></image>
			<text class="f_24 signOut" @click="signOut">退出登录</text>
			<view class="row just_btw userTxt">
				<view class="column">
					<text class="nickName f_48" v-if="roleType == 1">{{info.userName}}</text>
					<text class="nickName f_48" v-else>{{info.name}}</text>
				</view>
				<image class="avatar" :src="imgUrl + info.avatar" mode="" @click="uploadAvatar"></image>
			</view>
			<view class="row just_btw">
				<view class="row" v-if="roleType == 1">
					<view class="recharge column" @click="toNext('/pages/user/integralRecord')">
						<text>{{info.credit}}</text>
						<text>积分</text>
					</view>
					<view class="recharge column" @click="toNext('/pages/user/goldRecord')">
						<text>{{info.coin}}</text>
						<text>金币</text>
					</view>
				</view>
				<view class="column f_26 c_e4" v-if="roleType == 2" @click="toCompanyRole">
					<text>所属岗位：{{info.post}}</text>
					<text>所在公司：{{info.enterprise}}</text>
				</view>	
				<text class="signOn globelColor f_24" @click="toNext('/pages/signOn')">去签到</text>
			</view>		
		</section>
		<section class="row just_btw resume">
			<view class="column just_arw" v-if="roleType == 1">
				<text class="f_48">{{info.count}}</text>
				<text class="f_36">完善简历提高您的录取率</text>
				<text class="btn" @click="toNext('/pages/resume/index')">去完善简历</text>
			</view>
			<view class="column just_arw" v-if="roleType == 2">
				<text class="f_36"><text class="f_46">70%</text>的求职者会查看主页</text>
				<text class="f_28">剩余2步完成</text>
				<text class="btn" @click="toNext('/pages/resume/index')">立即完善</text>
			</view>
			<!-- <canvas class="degree" canvas-id="degree"></canvas> -->
		</section>
		<section class="lists">
			<view class="list" @click="toNext('/pages/user/goldRecharge')" v-if="roleType == 1">
				<image class="icon" src="/static/icon/chongzhi_icon@2x.png" mode=""></image>充值<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/resume/delivery')" v-if="roleType == 1">
				<image class="icon" src="/static/icon/shoucang_icon@2x.png" mode=""></image>已投递简历<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/collection/personalCollect')" v-if="roleType == 1">
				<image class="icon" src="/static/icon/shoucang_icon@2x.png" mode=""></image>我的收藏<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/companySetting')" v-if="roleType == 2">
				<image class="icon" src="/static/icon/chongzhi_icon@2x.png" mode=""></image>企业设置<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="toNext('/pages/user/c_wallet')" v-if="roleType == 2">
				<image class="icon" src="/static/icon/shoucang_icon@2x.png" mode=""></image>我的钱包<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" v-if="roleType == 2" @click="toNext('/pages/collection/companyCollect')">
				<!-- 企业收藏 -->
				<image class="icon" src="/static/icon/qiehuangshe_icon@2x.png" mode=""></image>我的收藏<text class="iconfont icon-youjiantou"></text>
			</view>
			<view class="list" @click="changeRole">
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
	import { mapState } from 'vuex'
	import {api} from '../../lib/api'
import { setTimeout } from 'timers';
	export default{
		data(){
			return{
				avatar: '../../static/icon/moren.png',
				info: {},
				imgUrl: config.imgUrl
			}
		},
		components:{
		},
		methods:{
			// 切换角色
			changeRole () {
				const that = this
				const role = this.$store.state.roleType
				that.$axios({
					url: 'api/user/changeRole',
					method: 'post',
					data: {
						type: role
					}
				}).then( res=> {
					if(res.data.type == 1){ // 个人切换企业
						if(res.data.enterpriseFlag){ // 填写了企业资料
							this.$store.commit('changeRoleType', role == 1 ? 2 : 1)
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/index/index'
								})	
							},300)
						}else{
							uni.navigateTo({ // 先去填写企业职务资料
								url: '/pages/user/personalSetting?type=1'
							})
						}
					}else if(res.data.type == 2){ // 企业切换个人
						if(res.data.personalFlag){ // 填写了个人资料
							this.$store.commit('changeRoleType', role == 1 ? 2 : 1)
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/index/index'
								})	
							},300)
						}else{
							uni.navigateTo({
								url: '/page/basicInformation'
							})
						}
					}
				})	
			},
			toCompanyRole () { // 个人账号设置
				uni.navigateTo({
					url: '/pages/user/personalSetting'
				})
			},
			getUserInfo () {
				const that = this
				that.$axios({
					url: api().user_info,
					method: 'post'
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
								that.info.avatar = config.imgUrl + JSON.parse(uploadFileRes.data).data
								that.$axios({
									url: 'api/user/ajaxEditUser',
									method: 'post',
									data:{
										avatar: JSON.parse(uploadFileRes.data).data
									}
								}).then(res => {
									if(res.code == 1){
										uni.showToast({ title: '修改头像成功', icon: 'none' })
									}
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
			},
			...mapState(['roleType'])
		},
		watch: {
			roleType(){
				this.getUserInfo()
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