<template>
	<view class="editInformation">		
		<view class="form" v-if="info">
			<view class="list" @click="toNext('true_name')">
				<view class="title f_24 c_999 row just_btw"><text>姓名</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{info.true_name}}</text>
			</view>
			<view class="list">
				<picker @change="bindPickerSex" :value="info.sex_id - 1" :range="basic.sex">
                    <view class="title f_24 c_999 row just_btw"><text>性别</text><text class="iconfont icon-youjiantou"></text></view>
                    <text class="f_30">{{basic.sex[info.sex_id - 1]}}</text>
                </picker>	
			</view>
			<view class="list">
				<picker @change="bindPickerIdentity" :value="info.identity_id - 1" :range="basic.identity">
					<view class="title f_24 c_999 row just_btw"><text>身份</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{basic.identity[info.identity_id - 1]}}</text>
				</picker>	
			</view>
			<view class="list">
				<picker @change="bindPickerQualification" :value="info.edu_level_id - 1" :range="basic.edu_level">
					<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{basic.edu_level[info.edu_level_id - 1]}}</text>
				</picker>
			</view>
			<view class="list">
				<picker @change="bindPickerwork_exp" :value="info.work_exp_id - 1" :range="basic.work_exp">
					<view class="title f_24 c_999 row just_btw"><text>工作经验 </text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{basic.work_exp[info.work_exp_id - 1]}}</text>
				</picker>
			</view>
			<view class="list">
				<picker class="picker" mode="multiSelector" @change="bindBirthDateChange" :value="evalInterval" :range="dateInterval" >
					<view class="title f_24 c_999 row just_btw"><text>出生年份</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{info.brithday.substr(0,7)}}</text>
				</picker>	
			</view>
			<!-- <view class="list">
				<picker mode="date" :value="info.workDate" :start="startDate" :end="endDate" @change="bindWorkDateChange" fields="month">
					<view class="title f_24 c_999 row just_btw"><text>参加工作时间</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{info.workDate}}</text>
				</picker>	
			</view> -->
			<view class="list">
				<picker class="picker" mode="multiSelector" @change="bindWorkDateChange" :value="evalInterval1" :range="dateInterval" >
				    <view class="title f_24 c_999 row just_btw"><text>参加工作时间</text><text class="iconfont icon-youjiantou"></text></view>
				    <text class="f_30">{{info.start_work_time.substr(0,7)}}</text>
				</picker>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>手机</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{tel}}</text>
			</view>
			<view class="list" @click="toNext('email')">
				<view class="title f_24 c_999 row just_btw"><text>邮箱</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{info.email}}</text>
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
			<view class="list">
				<picker mode="multiSelector" @change="regionChange1" :value="multiIndex1" :range="tt1" @columnchange="change1" range-key='name'>
					<view class="title f_24 c_999 row just_btw">
						<text>户口所在地</text>
						<text class="iconfont icon-youjiantou"></text>
					</view>
					<text class="f_30">{{region1}}</text>
				</picker>
			</view>
			<!-- <button formType="submit" @click="submitForm">保存</button>	 -->
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getDate, getDateInterval } from '../../lib/util.js'
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
				edit: false,
				dates: [["a","b"], ["c","d"]],
				datesIndex: [0,0],	
				tt: [[], []],
				region: '', // 居住地
				multiIndex: [],
				province_id: '',
				city_id: '', 
				tt1: [[], []],
				region1: '', // 户口所在地
				multiIndex1: [],
				province_id1: '',
				city_id1: '',
				info: '',
				tel: uni.getStorageSync('tel')
			};
		},
		onNavigationBarButtonTap (val){
			const that = this
			var data = {}
			data.true_name = this.info.true_name
			data.sex = this.info.sex_id
			data.identity = this.info.identity_id
			data.edu_level = this.info.edu_level_id
			data.brithday = this.info.brithday + '-01'
			data.start_work_time = this.info.start_work_time + '-01'
			data.email = this.info.email
			data.province_id = this.province_id
			data.city_id = this.city_id
			data.census_province_id = this.province_id1
			data.census_city_id = this.city_id1
			data.work_experience = this.info.work_exp_id
			that.$axios({
				url: 'api/user/ajaxEditUser',
				method: 'post',
				data: data
			}).then( res =>{
				if (res.code == 1) {
					uni.showToast({ title: '保存成功', icon: 'none' })
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					}, 1500)
					uni.setStorageSync('userInfo', JSON.stringify(res.data.original.data))
					that.$store.commit('resetInfo')
				}
			})
			
		},
		mounted(){},		
		methods:{
			getProvinces () { // 获取省份
				var that = this
				this.$axios({
					url: 'api/base/province',
					method: 'get',
				}).then(function(res){
					that.tt[0] = (res.data)
					for(let i = 0; i < res.data.length; i++){
						if(res.data[i].name == that.info.province){
							that.multiIndex.push(i)
							that.province_id = res.data[i].id
							break
						}
					}
					that.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: that.province_id
						}
					}).then(function(res1){
						that.tt.splice(1, 1, res1.data)
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.city){
								that.multiIndex.push(i)
								that.city_id = res1.data[i].id
								break
							}
						}
						that.region = res.data[that.multiIndex[0]].name + " " + res1.data[that.multiIndex[1]].name
					})
				})
			},
			getProvinces1 () { // 获取省份
				var that = this
				this.$axios({
					url: 'api/base/province',
					method: 'get',
				}).then(function(res){
					that.tt1[0] = (res.data)
					if(that.info.census_province != 'null'){
						for(let i = 0; i < res.data.length; i++){
							if(res.data[i].name == that.info.census_province){
								that.multiIndex1.push(i)
								that.province_id1 = res.data[i].id
								break
							}
						}
					}else{
						that.multiIndex1.push(0)
						that.province_id1 = res.data[0].id
					}					
					that.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: that.province_id1
						}
					}).then(function(res1){
						that.tt1.splice(1, 1, res1.data)
						if(that.info.census_city != 'null'){
							for(let i = 0; i < res1.data.length; i++){
								if(res1.data[i].name == that.info.census_city){
									that.multiIndex1.push(i)
									that.city_id1 = res1.data[i].id
									break
								}
							}
						}else{
							that.multiIndex1.push(0)
							that.city_id1 = res1.data[0].id
						}	
						that.region1 = res.data[that.multiIndex1[0]].name + " " + res1.data[that.multiIndex1[1]].name
					})
				})
			},
			// 选中地区点击确定,居住地
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
			// 选中地区点击确定,居住地
            regionChange1(e) {
				var indexArray = e.detail.value
				var region = ''
				var that = this
				indexArray.forEach(function(item, index){
					if(that.tt[index].length > 0){
						region += that.tt1[index][item].name + '-'
						that.region_id1 = that.tt1[index][item].id
					}	
				})
				this.province_id1 = that.tt1[0][indexArray[0]].id
				this.city_id1 = that.tt1[1][indexArray[1]].id
				that.region1 = region.slice(0, region.length -1 )
			},
			change1 (e){
				var id = 0
				var that = this
				if(e.detail.column == 0){
					id = this.tt1[0][e.detail.value].id					
					this.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: id
						}
					}).then(function(res){
						if(res.code == 1){
							that.multiIndex1[0] = e.detail.value
							that.tt1.splice(1, 1, res.data)
						}
					})
				}else if(e.detail.column == 1){				
					that.multiIndex1[1] = e.detail.value
				}	
			},
			toNext (title) { // 跳转修改页
				uni.navigateTo({
					url:'/pages/resume/editList?title=' + title + '&type=1'
				})
			},
			bindPickerSex (e) { // 性别选择器
				this.info.sex_id = Number(e.detail.value) + 1
			},
			bindPickerIdentity(e){ // 身份选择器
				this.info.identity_id = Number(e.detail.value) + 1
			},
			bindPickerQualification (e) {// 学历选择器
				this.info.edu_level_id = Number(e.detail.value) + 1
			},
			bindPickerwork_exp (e) {
				this.info.work_exp_id = Number(e.detail.value) + 1
				this.$forceUpdate()
			},
			bindBirthDateChange (e) { // 生日时间选择
				const ind = e.detail.value
				this.info.brithday = this.dateInterval[0][ind[0]].replace('年','') + '-' + this.dateInterval[1][ind[1]].replace('月','')
			},
			bindWorkDateChange (e) { // 工作时间选择
				const ind = e.detail.value
				this.info.start_work_time = this.dateInterval[0][ind[0]].replace('年','') + '-' + this.dateInterval[1][ind[1]].replace('月','')
			},
		},
		onBackPress(e){ // 返回提示是否取消修改
			const that = this
			// if(that.edit){
			// 	uni.showModal({
			// 		content: '确定取消修改内容？',
			// 		success(res) {
			// 			if(res.confirm){
			// 				that.edit = false
			// 				uni.navigateBack()
			// 				that.$store.commit('resetInfo')
			// 			}
			// 		}
			// 	})
			// 	return true
			// }
		},
		onLoad() {
			const that = this
			this.$axios({
				url: 'api/user/ajaxEditUser',
				method: 'post'
			}).then(res=>{
				that.info = res.data.original.data
				that.region = that.info.province + ' ' + that.info.city
				that.region1 = that.info.census_province + ' ' + that.info.census_city
				console.log(that.info)
				that.getProvinces()
				that.getProvinces1()
			})
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
			userInfo(){
				return this.$store.state.information.userInfo
			},
			dateInterval(){
				return getDateInterval('date')
			},
			evalInterval(){
				return getDateInterval('eval',this.info.brithday)
			},
			evalInterval1(){
				return getDateInterval('eval', this.info.start_work_time)
			},
			basic(){
				return this.$store.state.basicConfig.basicConfig
			}
		},
	}
</script>

<style lang="less">
@import url("../../style/resume/editInformation");
</style>
