<template>
	<view class="">
		<view class="form">
			<view class="list" @click="toNext('school')">
				<view class="title f_24 c_999 row just_btw"><text>学校名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30" v-if="education.school">{{education.school}}</text>
				<text class="f_30 c_666" v-else>请输入学校名称</text>
			</view>
			<view class="list">
				<picker :range="basic.edu_level" :value="eduIndex" @change="bindPickerEdu">
					<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{basic.edu_level[eduIndex]}}</text>
				</picker>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>在校开始时间</text><text class="iconfont icon-youjiantou"></text></view>
				<view class="row">
					<view class="date_item">
						<dyDatePicker placeholder="起始日期" :childValue="from" :minSelect="from_minSelect" :maxSelect="from_maxSelect"
						:iconshow="false" @getData="getFromData" timeType="month"></dyDatePicker>
					</view>
					<!-- <text>--</text>
					<view class="date_item">
						<dyDatePicker placeholder="结束日期" :minSelect="to_minSelect" :childValue="to" :maxSelect="to_maxSelect" :iconshow="false"
						@getData="getToData" timeType="month"></dyDatePicker>
					</view> -->
				</view>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>在校结束时间</text><text class="iconfont icon-youjiantou"></text></view>
				<view class="row">
					<!-- <view class="date_item">
						<dyDatePicker placeholder="起始日期" :childValue="from" :minSelect="from_minSelect" :maxSelect="from_maxSelect"
						:iconshow="false" @getData="getFromData" timeType="month"></dyDatePicker>
					</view>
					<text>--</text> -->
					<view class="date_item">
						<dyDatePicker placeholder="结束日期" :minSelect="to_minSelect" :childValue="to" :maxSelect="to_maxSelect" :iconshow="false"
						@getData="getToData" timeType="month"></dyDatePicker>
					</view>
				</view>
			</view>
			
			<view class="list" @click="toNext('major')">
				<view class="title f_24 c_999 row just_btw"><text>专业</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30" v-if="education.major">{{education.major}}</text>
				<text class="f_30 c_666" v-else>请输入专业名称</text>
			</view>
		</view>
	</view>
</template>

<script>
	import dyDatePicker from '../../components/dyDate.vue'
	var  graceChecker = require("../../lib/graceChecker.js");
	export default {
		name: 'eduIntension',
		data() {
			return {
				from_minSelect: '1900/01/',
				from_maxSelect: '2050/12/',
				to_minSelect: '1900/01/',
				to_maxSelect: '2050/12/',
				from: '',
				to: '',
				eduIndex: 0,
				eduLines: [],
				ind: ''
			};
		},
		methods:{
			toNext (title) { // 跳转修改页
				uni.navigateTo({
					url:'/pages/resume/editList?title=' + title + '&type=2'
				})
			},
			bindPickerEdu (e) {
				this.eduIndex = e.detail.value
			},
			getFromData(time) {
				this.to_minSelect = time
				this.from = time
			},
			getToData(time) {
				console.log(time)
				this.from_maxSelect = time
				this.to = time
			},
		},
		onNavigationBarButtonTap (val){ // 点击保存
			const that = this
			const data = {}
			const eduLines = this.eduLines
			data.finish_school = this.education.school
			data.major = this.education.major
			data.text7 = this.from + '-' + this.to
			data.edu_level = this.eduIndex
			data.edu_levelName = this.basic.edu_level[this.eduIndex]
			if(data.finish_school == ''){
				uni.showToast({ title: '请输入学校名称',icon: 'none' })
			}else if(data.major == ''){
				uni.showToast({ title: '请输入专业名称',icon: 'none' })
			}else if(this.from == ''){
				uni.showToast({ title: '请选择起始时间',icon: 'none' })
			}else if(this.to == ''){
				uni.showToast({ title: '请选择结束时间',icon: 'none' })
			}else{
				if(this.ind != ''){
					eduLines[this.ind] = data
				}else{
					eduLines.push(data)
				}
				that.$axios({
					url: 'api/resume/saveEduExperience',
					method: 'post',
					data: {
						id: that.id,
						eduLines: JSON.stringify(eduLines)
					}
				}).then(res =>{
					if(res.code == 1){
						uni.navigateBack()
						that.$store.commit('resetEducation')
					}
				})
			}
		},
		onBackPress() {  
			this.$store.commit('resetEducation')
		}, 
		onLoad(options) {	
			console.log(options) 	
			this.eduLines = (JSON.parse(options.eduLines) != null) ? JSON.parse(options.eduLines) : []
			this.id = options.id
			if(options.index){
				const index = options.index
				this.ind = index				
				this.education.school = this.eduLines[index].finish_school
				this.eduIndex = this.eduLines[index].edu_level
				this.education.major = this.eduLines[index].major
				this.from = this.eduLines[index].text7.substr(0,7)
				this.to_minSelect = this.eduLines[index].text7.substr(0,7)
				this.to = this.eduLines[index].text7.replace(/\s+/g,"").substr(8,7)
				this.from_maxSelect = this.eduLines[index].text7.replace(/\s+/g,"").substr(8,7)
				console.log(this.$store.state.fullTime)
			}	
		},
		watch: {
			education: {
				handler () {
					console.log(4534)
				},
				deep: true
			}
		},
		onShow(){
			console.log(this.education.school)
			this.$forceUpdate()
		},
		computed:{
			education () {
				return this.$store.state.fullTime.education
			},
			basic () {
				return this.$store.state.basicConfig.basicConfig
			}
		},
		components:{
			dyDatePicker
		}
	}
</script>

<style lang="less">
	@import '../../style/common/mixin.less';
	.form{
		margin: 24upx 0;
		background: white;
		padding: 0 32upx 0 44upx;
		.list{
			border-bottom: @g_border;
			padding-bottom: 22upx;
			.title{
				.h(63upx, 63upx, none)
			}
			.date_item{
				width: 100%
			}
		}
	}
</style>
