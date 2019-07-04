<template>
	<view class="editInformation">		
		<view class="form">
			<view class="list" @click="toNext('nickName')">
				<view class="title f_24 c_999 row just_btw"><text>姓名</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{info.nickName}}</text>
			</view>
			<view class="list">
				<picker @change="bindPickerSex" :value="info.sex" :range="sex" range-key="name">
                    <view class="title f_24 c_999 row just_btw"><text>性别</text><text class="iconfont icon-youjiantou"></text></view>
                    <text class="f_30">{{sex[info.sex].name}}</text>
                </picker>	
			</view>
			<view class="list">
				<picker @change="bindPickerIdentity" :value="info.identity" :range="identity">
					<view class="title f_24 c_999 row just_btw"><text>身份</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{identity[info.identity]}}</text>
				</picker>	
			</view>
			<view class="list">
				<picker @change="bindPickerQualification" :value="qualificationIndex" :range="qualification">
					<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{qualification[info.qualification]}}</text>
				</picker>	
			</view>
			<view class="list">
				<picker mode="date" :value="info.birthDate" :start="startDate" :end="endDate" @change="bindBirthDateChange" fields="month">
					<view class="title f_24 c_999 row just_btw"><text>出生年份</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{info.birthDate}}</text>
				</picker>	
			</view>
			<view class="list">
				<picker mode="date" :value="info.workDate" :start="startDate" :end="endDate" @change="bindWorkDateChange" fields="month">
					<view class="title f_24 c_999 row just_btw"><text>参加工作时间</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{info.workDate}}</text>
				</picker>	
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>手机</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">12355</text>
			</view>
			<view class="list" @click="toNext('email')">
				<view class="title f_24 c_999 row just_btw"><text>邮箱</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{info.email}}</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>现居住城市</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">江西 赣州</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>户口所在地</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">赣州</text>
			</view>
			<!-- <button formType="submit" @click="submitForm">保存</button>	 -->
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getDate } from '../../lib/util.js'
	export default {
		name: 'editInformation',
		data() {
			const currentDate = getDate({format: true})
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				sex: [{name: '男',id:' 1'}, {name: '女',id: '2'}],
				identity: ['学生', '非学生'],
				qualification: ['本科','中专'],
				sexIndex: 1,
				sexname: '',				
				identityIndex: 0,				
				qualificationIndex: 0,
				edit: false
			};
		},
		onNavigationBarButtonTap (val){
			uni.navigateBack({
				delta:1
			})
		},
		mounted(){
		},
		
		methods:{
			toNext (title) { // 跳转修改页
				uni.navigateTo({
					url:'/pages/resume/editList?title=' + title
				})
			},
			bindPickerSex (e) { // 性别选择器
				this.info.sex = e.detail.value
			},
			bindPickerIdentity(e){ // 身份选择器
				this.info.identity = e.detail.value
			},
			bindPickerQualification (e) {// 学历选择器
				
			},
			bindBirthDateChange (e) { // 生日时间选择
				this.info.birthDate  = e.detail.value
			},
			bindWorkDateChange (e) { // 工作时间选择
				this.info.workDate  = e.detail.value
			},
			bindCityChange (e) { // 城市选择器
				
			}
		},
		onBackPress(e){ // 返回提示是否取消修改
			const that = this
			if(that.edit){
				uni.showModal({
					content: '确定取消修改内容？',
					success(res) {
						if(res.confirm){
							that.edit = false
							uni.navigateBack()
							that.$store.commit('resetInfo')
						}
					}
				})
				return true
			}
		},
		onLoad() {
			console.log(78)
		},
		watch:{
			info: { // 检查是否修改过内容
				handler () {
					this.edit = true
				},
				deep: true
			}
		},
		computed: {
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			},
			info(){
				return this.$store.state.information.info
			}
		},
	}
</script>

<style lang="less">
@import url("../../style/resume/editInformation");
</style>
