<template>
	<view class="editInformation">
		<text class="iconfont icon-jiantou3" :style="{top: statusBarHeight + 'px'}" @click="back" v-if="showBack"></text>
		<text class="bigTitle f_46">完善信息</text>
		<view class="avatarList" @click="chooseImg">
			<image class="avatar" :src="avatar" mode=""></image>
			<text class="iconfont icon-xiangji"></text>
		</view>		
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>姓名</text>
						<text class="iconfont icon-youjiantou"></text>
					</view>
					<input name="true_name" type="text" value=""  placeholder="请输入姓名" 
					placeholder-class="placeholder"/>
				</view>
				<view class="list">
					<picker @change="bindPickerSex" :value="sexIndex" :range="basicConfig.sex" range-key="key" name="sex">
						<view class="title f_24 c_999 row just_btw"><text>性别</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.sex[sexIndex+1]}}</text>
					</picker>	
				</view>
				<view class="list">
					<picker @change="bindPickerIdentity" :value="identityIndex" :range="basicConfig.identity" name="identity">
						<view class="title f_24 c_999 row just_btw"><text>身份</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.identity[identityIndex+1]}}</text>
					</picker>	
				</view>
				<view class="list">
					<picker @change="bindPickerQualification" :value="qualificationIndex" :range="basicConfig.edu_level" name="edu_level">
						<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.edu_level[qualificationIndex+1]}}</text>
					</picker>	
				</view>
				<view class="list">
					<picker mode="multiSelector" @change="bindBirthDateChange" :value="indexInterval" :range="dateInterval">
						<view class="title f_24 c_999 row just_btw"><text>出生年份</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{birthDate}}</text>
					</picker>	
				</view>
				<view class="list">
					<picker mode="multiSelector" @change="bindWorkDateChange" :value="indexInterval" :range="dateInterval">
						<view class="title f_24 c_999 row just_btw"><text>参加工作时间</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{workDate}}</text>
					</picker>	
				</view>
				<view class="list">
					<view class="title f_24 c_999 row just_btw"><text>邮箱</text><text class="iconfont icon-youjiantou"></text></view>
					<input type="text" value="" placeholder="请输入邮箱" placeholder-class="placeholder" name="email"/>
				</view>
				<view class="list">
					<picker mode="multiSelector" @change="regionChange" :value="multiIndex" :range="tt" @columnchange="change" range-key='name'>
						<view class="title f_24 c_999 row just_btw">
							<text>现居住城市</text>
							<text class="iconfont icon-youjiantou"></text>
						</view>
						<text class="f_30">{{region}}</text>
					</picker>	
				</view>
				<button class="formBtn" formType="submit">保存</button>
			</form>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	var  graceChecker = require("../lib/graceChecker.js");
	import config from '../lib/config'
	import { getDate, getDateInterval } from '../lib/util.js'
	export default {
		name: 'editInformation',
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				info: {},
				avatar: '/static/icon/moren.png',
				sex: [{name: '男',id:' 1'}, {name: '女',id: '2'}],
				identity: ['学生', '非学生'],
				qualification: ['本科','中专'],
				sexIndex: 0,
				sexname: '',				
				identityIndex: 0,				
				qualificationIndex: 0,
				date: currentDate,
				showBack: false,
				birthDate: currentDate,
				workDate: currentDate,
				tt: [[], []],
				multiIndex: [0, 0],
				region: '',
				province_id: '', // 现居地址-省
				city_id: '', // 现居地址-市
			};
		},
		onNavigationBarButtonTap (val){
			uni.navigateBack({
				delta:1
			})
		},
		mounted(){
			// this.$store.commit('changeInfo',{ name:this.info.name, email:this.info.email })
		},
		
		methods:{
			formSubmit (e) {
				
				var rule = [
					{name:"true_name", checkType : "string", checkRule:"1,5",  errorMsg:"姓名应为1-5个字符"},
					{name:"email", checkType : "email", checkRule:"",  errorMsg:"请输入email"}
				];
				// 进行表单检查
				var formData = e.detail.value
				formData.brithday = this.birthDate +'-01'
				formData.start_work_time = this.workDate+'-01'
				formData.sex = formData.sex + 1
				formData.identity = formData.identity + 1
				formData.edu_level = formData.edu_level + 1
				formData.province_id = this.province_id
				formData.city_id = this.city_id
				console.log(e.detail.value)
				var checkRes = graceChecker.check(formData, rule)
				if(checkRes){
					// uni.showToast({title:"验证通过!", icon:"none"})
					const that = this
					that.$axios({
						url: 'api/user/ajaxEditUser',
						method: 'post',
						data:{
							...formData
						}
					}).then(res => {
						console.log(res)
						if (res.code == 1) {
							uni.showToast({title:"保存成功!", icon:"none"})
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}, 1000)
							uni.setStorageSync('userInfo', JSON.stringify(res.data.original.data))
						}
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}	
			},
			getProvinces () { // 获取省份
				var that = this
				this.$axios({
					url: 'api/base/province',
					method: 'get',
				}).then(function(res){
					that.tt[0] = (res.data)
					that.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: res.data[0].id
						}
					}).then(function(res1){
						that.tt.splice(1, 1, res1.data)
						that.province_id = res.data[0].id
						that.city_id = res1.data[0].id
						that.region = res.data[0].name + " " + res1.data[0].name
					})
				})
			},
			// 选中地区点击确定
            regionChange(e) {
				var indexArray = e.detail.value
				var region = ''
				var that = this
				indexArray.forEach(function(item, index){
					if(that.tt[index].length > 0){
						region += that.tt[index][item].name + '-'
						that.region_id = that.tt[index][item].id
					}	
				})
				this.province_id = that.tt[0][indexArray[0]].id
				this.city_id = that.tt[1][indexArray[1]].id
				that.region = region.slice(0, region.length -1 )
			},
			change (e){
				var id = 0
				var that = this
				if(e.detail.column == 0){
					id = this.tt[0][e.detail.value].id					
					this.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: id
						}
					}).then(function(res){
						if(res.code == 1){
							that.multiIndex[0] = e.detail.value
							that.tt.splice(1, 1, res.data)
						}
					})
				}else if(e.detail.column == 1){				
					that.multiIndex[1] = e.detail.value
				}	
			},
			chooseImg () { // 上传图片
				const that = this
				uni.chooseImage({
					count: 1,
					success: function (res) {
						that.avatar = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + 'upload/ajaxUploads',
							filePath: that.avatar,
							name: 'fileUpload',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				})
			},
			bindPickerChange () {
				console.log(444)
			},
			toNext (title) {
				uni.navigateTo({
					url:'/pages/resume/editList?title=' + title + '&type=1'
				})
			},
			bindPickerSex (e) { // 性别选择器		
				console.log(e)	
				this.sexIndex = e.detail.value
			},
			bindPickerIdentity(e){ // 身份选择器
				this.identityIndex = e.detail.value
			},
			bindPickerQualification (e) {// 学历选择器
				this.qualificationIndex = e.detail.value
			},
			bindBirthDateChange (e) { // 出生日期选择
				const ind = e.detail.value
				this.birthDate = this.dateInterval[0][ind[0]].replace('年','') + '-' + this.dateInterval[1][ind[1]].replace('月','')
			},
			bindWorkDateChange (e) { // 工作时间选择
				const ind = e.detail.value
				this.workDate = this.dateInterval[0][ind[0]].replace('年','') + '-' + this.dateInterval[1][ind[1]].replace('月','')
			},
			bindCityChange (e) { // 城市选择器
				
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				// return `${year}-${month}-${day}`;
				return `${year}-${month}`;
			},
			back () {
				uni.navigateBack({
					delta:1
				})
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapState(['information']),
			basicConfig: {
				get(){
					return this.$store.state.basicConfig.basicConfig
				},
				set(val){
					this.$store.state.basicConfig.basicConfig
				}
			},
			dateInterval(){
				return getDateInterval('date')
			},
			indexInterval(){
				return getDateInterval('index')
			},
		},
		watch:{
			basicConfig(val){
				console.log(val)
			}
		},
		onLoad() {
			this.$store.dispatch('getBasicConfig')
			this.basic = this.basicConfig
			console.log(this.basic)
			console.log(this.basic.age)
			this.getProvinces()
			console.log(this.dateInterval)
			console.log(this.indexInterval)
			this.showBack = getCurrentPages().length > 1 ? true : false
		}
	}
</script>

<style lang="less">
@import url("../style/resume/editInformation");
@import url("../style/basicInformation/basicInformation");
</style>
