<template>
	<view class="editInformation">
		<text class="iconfont icon-jiantou3" :style="{top: statusBarHeight + 'px'}" @click="back" v-if="showBack"></text>
		<text class="bigTitle f_46">完善信息</text>
		<view class="avatarList">
			<image class="avatar" src="/static/icon/moren.png" mode=""></image>
			<text class="iconfont icon-xiangji"></text>
		</view>		
		<view class="form">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw"><text>姓名</text><text class="iconfont icon-youjiantou"></text></view>
					<input name="nickName" type="text" value=""  placeholder="请输入姓名" placeholder-class="placeholder"/>
				</view>
				<view class="list">
					<picker @change="bindPickerSex" :value="sexIndex" :range="info.sex" range-key="name" name="sex">
						<view class="title f_24 c_999 row just_btw"><text>性别</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{info.sex[sexIndex].name}}</text>
					</picker>	
				</view>
				<view class="list">
					<picker @change="bindPickerIdentity" :value="identityIndex" :range="info.identity" name="identity">
						<view class="title f_24 c_999 row just_btw"><text>身份</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{info.identity[identityIndex]}}</text>
					</picker>	
				</view>
				<view class="list">
					<picker @change="bindPickerQualification" :value="qualificationIndex" :range="info.qualification" name="qualification">
						<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">本科</text>
					</picker>	
				</view>
				<view class="list">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month" name="birthDate">
						<view class="title f_24 c_999 row just_btw"><text>出生年份</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">2019-06</text>
					</picker>	
				</view>
				<view class="list">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month" name="workDate">
						<view class="title f_24 c_999 row just_btw"><text>参加工作时间</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">2019-03</text>
					</picker>	
				</view>
				<view class="list">
					<view class="title f_24 c_999 row just_btw"><text>邮箱</text><text class="iconfont icon-youjiantou"></text></view>
					<input type="text" value="" placeholder="请输入邮箱" placeholder-class="placeholder" name="email"/>
				</view>
				<view class="list">
					<view class="title f_24 c_999 row just_btw"><text>现居住城市</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">江西 赣州</text>
				</view>
				<button class="formBtn" formType="submit">保存</button>
			</form>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		name: 'editInformation',
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				info:{
					sex: [{name: '男',id:' 1'}, {name: '女',id: '2'}],
					identity: ['学生', '非学生'],
					qualification: ['本科','中专'],
					name: '姚先生',
					email: '1245@qq.com'
				},
				sexIndex: 1,
				sexname: '',				
				identityIndex: 0,				
				qualificationIndex: 0,
				date: currentDate,
				showBack: false
			};
		},
		onNavigationBarButtonTap (val){
			uni.navigateBack({
				delta:1
			})
		},
		mounted(){
			this.$store.commit('changeInfo',{ name:this.info.name, email:this.info.email })
		},
		
		methods:{
			formSubmit (e) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			bindPickerChange () {
				console.log(444)
			},
			toNext (title) {
				uni.navigateTo({
					url:'/pages/resume/editList?title=' + title
				})
			},
			bindPickerSex (e) { // 性别选择器
				this.sexIndex = e.detail.value
			},
			bindPickerIdentity(e){ // 身份选择器
				this.identityIndex = e.detail.value
			},
			bindPickerQualification (e) {// 学历选择器
				
			},
			bindDateChange (e) { // 时间选择器
				
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
				return `${year}-${month}-${day}`;
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
			...mapState(['information'])
		},
		onLoad() {
			this.showBack = getCurrentPages().length > 1 ? true : false
			uni.hideTabBar()
		}
	}
</script>

<style lang="less">
@import url("../style/resume/editInformation");
@import url("../style/basicInformation/basicInformation");
</style>
