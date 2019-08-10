<template>
	<view class="">
		<view class="form">
			<view class="list" @click="toNext('school')">
				<view class="title f_24 c_999 row just_btw"><text>学校名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{education.school}}</text>
			</view>
			<view class="list">
				<picker :range="basic.edu_level" :value="eduIndex" @change="bindPickerEdu">
					<view class="title f_24 c_999 row just_btw"><text>学历</text><text class="iconfont icon-youjiantou"></text></view>
					<text class="f_30">{{basic.edu_level[eduIndex + 1]}}</text>
				</picker>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>在校时间</text><text class="iconfont icon-youjiantou"></text></view>
				<view class="row">
					<view class="date_item">
						<dyDatePicker placeholder="起始日期" :childValue="from" :minSelect="from_minSelect" :maxSelect="from_maxSelect"
						:iconshow="false" @getData="getFromData" timeType="month"></dyDatePicker>
					</view>
					<text>--</text>
					<view class="date_item">
						<dyDatePicker placeholder="结束日期" :minSelect="to_minSelect" :childValue="to" :maxSelect="to_maxSelect" :iconshow="false"
						@getData="getToData" timeType="month"></dyDatePicker>
					</view>
				</view>
			</view>
			
			<view class="list" @click="toNext('major')">
				<view class="title f_24 c_999 row just_btw"><text>专业</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{education.major}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import dyDatePicker from '../../components/dyDate.vue'
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
				eduIndex: 0
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
				this.from_maxSelect = time
				this.to = time
			},
		},
		onNavigationBarButtonTap (val){ // 点击保存
			const that = this
			const data = {}
			data.finish_school = this.education.school
			data.major = this.education.major
			data.text7 = this.to_minSelect + '-' + this.from_maxSelect
			console.log(data)
			// that.$axios({
			// 	url: 'api/resume/saveEduExperience',
			// 	method: 'post',
			// 	data: {
			// 		expect_jobs: 2,
			// 		expect_salary: that.jobIntensionIndex + 1,
			// 		desired_area: that.code
			// 	}
			// }).then(res =>{
			// 	if(res.code == 1){
			// 		// uni.navigateBack()
			// 	}
			// })
		},
		onLoad() {
			console.log(this.education)
			console.log(this.basic)
		},
		watch:{
			education:{
				handler () {
					console.log(4565)
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
		}
	}
</style>
