<template>
	<view class="postDetail" v-if="detail">
		<view class="top">
			<view class="row just_btw">
				<text class="f_48">{{detail.title}}</text>
				<text class="globelColor f_30">{{detail.salary}}</text>
			</view>
			<text class="other f_20">{{detail.job_type}} {{detail.work_exp}} {{detail.edu_level}}</text>
			<view class="address" @click="toAddress">
				<text><text class="iconfont icon-weizhi"></text>{{detail.work_address}} {{distance}}km</text>
				<text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
		<view class="content">
			<view class="title row ali_center">
				<text class="listTitleLine"></text>
				<text>职位信息</text>	
			</view>
			<view class="postDescribe">
				<rich-text :nodes="detail.content"></rich-text>
			</view>	
		</view>
		<view class="content" v-if="detail.validity">
			<view class="title row ali_center">
				<text class="listTitleLine"></text>
				<text>兼职详情</text>	
			</view>
			<view class="list">
				<view class="partTime f_26 column">
					<text>兼职类型：{{detail.validity}}</text>
					<text v-if="detail.short_validity_time">兼职日期：{{detail.short_validity_time}}</text>
				</view>
				<table class="column">
					<tr><th class="" v-for="item in week" :key="item">{{item}}</th></tr>
					<view class="row">
						<view class="column td">
							<text>上午</text>
							<text>下午</text>
							<text>晚上</text>
						</view>
						<view class="column td" v-for="(ite, index) in detail.part_time" :key="index">
							<text class="iconfont icon-duigou white" v-bind:class="{'globelColor': it} "
							v-for="(it,i) in ite" :key="i" @click="checked(index, i)"></text>                             
						</view>
					</view>
				</table>
			</view>	
		</view>
		<view class="footer">
			<view class="title row ali_center">
				<text class="listTitleLine"></text>
				<text>公司信息</text>	
			</view>
			<view class="row companyTxt" @click="toCompany(detail.enterprise_id)">
				<image class="companyAvatar" :src="imgUrl + detail.logo" mode=""></image>
				<view class="tocompany column just_btw">
					<text>{{detail.ent_name}}</text>
					<text>{{detail.ent_scale}} {{detail.ent_category}}</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
			</view>
		</view>
		<button type="primary" class="btn" @click="sendingResume">投递简历</button>
		<share :showMask="showMask" v-on:cancel="cancel"></share>
	</view>
</template>

<script>
	import share from '../components/share.vue'
	import config from '../lib/config'
	export default {
		name: 'postDetail',
		data() {
			return {
				collect: false,
				showMask: false,
				detail: '',
				imgUrl: config.imgUrl,
				longitude: '',
				latitude: '',
				distance: '',
				week: ['','周一','周二','周三','周四','周五','周六','周日'],
			};
		},
		onLoad (options) {
			this.id = options.id
			this.getDdtail()
			const that = this
			uni.getLocation({
				type: 'wgs84',
				success: function (res) {
					that.longitude = res.longitude
					that.latitude = res.latitude
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				},
				fail(res) {
					console.log(res)
				}
			})
		},
		methods:{
			cancel () { // 显示遮罩层
				this.showMask = false
			},
			getDdtail () {
				const that = this
				that.$axios({
					url: 'api/job/detail',
					data: {
						id: that.id
					}
				}).then(res => {
					that.detail = res.data
					that.collect = res.data.collection
					// #ifdef APP-PLUS
					var webView = that.$mp.page.$getAppWebview()
					if(that.collect){ // 更换收藏图标
						webView.setTitleNViewButtonStyle(0, {  text: '\ue657' })
					}else{
						webView.setTitleNViewButtonStyle(0, {  text: '\ue654' })
					}
					// #endif
					const address = res.data.addr_code.split(',')
					that.distance = that.GetDistance(that.latitude, that.longitude, address[1], address[0])
				})
			},
			GetDistance (lat1,lng1,lat2,lng2) {
				var radLat1 = this.Rad(lat1);
				var radLat2 = this.Rad(lat2);
				var a = radLat1 - radLat2;
				var  b = this.Rad(lng1) - this.Rad(lng2);
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
				Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
				s = s *6378.137 ;// EARTH_RADIUS;
				s = Math.round(s * 10000) / 10000; //输出为公里
				//s=s.toFixed(4);
				console.log(s)
				return s;
			},
			Rad(d){
       			return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    		},
			toAddress () {
				const that = this
				const address = that.detail.addr_code.split(',')
				uni.openLocation({
					latitude: Number(address[1]),
					longitude: Number(address[0]),
					name: that.detail.ent_name,
					address: that.detail.work_address,
					success: function (res) {
					}
				});
			},
			toCompany (id) {
				uni.navigateTo({
					url: '/pages/companyDetail?id=' + id
				})
			},
			sendingResume () { // 投递简历
				const that = this
				that.$axios({
					url: 'api/user/sendResume',
					method: 'post',
					data: {
						job_id: that.id,
						target_user: that.detail.ent_uid
					}
				}).then(res => {
					if(res.result){
						uni.showToast({ title: res.msg, icon: "none" })
						return
					}
					uni.showToast({ title: res.msg, icon: "none" })
				})
			}
		},
		onBackPress() {
			if(this.showMask){
				this.showMask = false
				return true
			}
		},
		computed:{
		},
		onNavigationBarButtonTap (val){
			const that = this
			if(val.index == 1){
				this.showMask = true
				console.log('点击了分享')
			}else{
				console.log('点击了收藏')
				var url = ''
				if(!this.collect){ // 更换收藏图标
					url = 'api/user/collectJob'
				}else{
					url = 'api/user/cancelCollectJob'
				}			
				that.$axios({
					url: url,
					method: 'post',
					data: {
						id: that.id
					}
				}).then(res => {
					if(res.code == 1){
						var webView = this.$mp.page.$getAppWebview()
						this.collect = !this.collect
						if(this.collect){ // 更换收藏图标
							webView.setTitleNViewButtonStyle(0, {  text: '\ue657' })
						}else{
							webView.setTitleNViewButtonStyle(0, {  text: '\ue654' })
						}		
						uni.showToast({ title: that.collect ? '收藏成功' : '取消收藏', icon: "none" })
					}
				})	
			}
		},
		components:{
			share
		}
	}
</script>

<style lang="less">
	@import '../style/personal/postDetail';
	.listTitleLine{
            height: 30upx;
            width: 6upx;
            background: #5E57EB;
            display: inline-block;
            margin-right: 16upx;
        }
</style>
