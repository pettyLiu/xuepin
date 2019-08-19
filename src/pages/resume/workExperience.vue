<template>
	<view class="">
		<view class="form">
			<view class="list" @click="toNext1('company')">
				<view class="title f_24 c_999 row just_btw"><text>公司名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30" v-if="work.company">{{work.company}}</text>
				<text class="f_30 c_666" v-else>请输入公司名称</text>
			</view>
			<view class="list" @click="toNext1('do_work')">
				<view class="title f_24 c_999 row just_btw"><text>岗位名称</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30" v-if="work.do_work">{{work.do_work}}</text>
				<text class="f_30 c_666" v-else>请输入岗位名称</text>
			</view>
			<view class="list">
				<view class="title f_24 c_999 row just_btw"><text>在职时间</text><text class="iconfont icon-youjiantou"></text></view>
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
			<view class="list" @click="toNext">
				<view class="title f_24 c_999 row just_btw"><text>工作描述</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30" v-if="work.work_desc">{{work.work_desc}}</text>
				<text class="f_30 c_666" v-else>请输入工作描述</text>
			</view>
		</view>
	</view>
</template>

<script>
	import dyDatePicker from '../../components/dyDate.vue'
	import { mapState } from 'vuex'
	export default {
		name: 'jobIntension',
		data() {
			return {
				workLines: [],
				from_minSelect: '1900/01/',
				from_maxSelect: '2050/12/',
				to_minSelect: '1900/01/',
				to_maxSelect: '2050/12/',
				from: '',
				to: '',
				ind: '',
			};
		},
		methods:{
			toNext () {
				uni.navigateTo({
					url: '/pages/resume/selfAssessment?title=' + 'work_desc'
				})
			},
			toNext1 (title) { // 跳转修改页
				uni.navigateTo({
					url:'/pages/resume/editList?title=' + title + '&type=3'
				})
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
		watch: {
			work: {
				handler (val) {
					console.log(val)
					console.log(4534)
				},
				deep: true
			}
		},
		onNavigationBarButtonTap (val){ // 点击保存
			const that = this
			const data = {}
			const workLines = this.workLines
			data.company = this.work.company
			data.do_work = this.work.do_work
			data.project_exp = this.from + '-' + this.to
			data.work_desc = this.work.work_desc
			console.log(data)
			if(data.company == ''){
				uni.showToast({ title: '请输入公司名称',icon: 'none' })
			}else if(data.major == ''){
				uni.showToast({ title: '请输入职位名称',icon: 'none' })
			}else if(this.from == ''){
				uni.showToast({ title: '请选择起始时间',icon: 'none' })
			}else if(this.to == ''){
				uni.showToast({ title: '请选择结束时间',icon: 'none' })
			}else if(this.work_desc == ''){
				uni.showToast({ title: '请输入工作描述',icon: 'none' })
			}else{
				console.log(data)
				console.log(workLines)
				if(this.ind != ''){
					workLines[this.ind] = data
				}else{
					console.log(545)
					workLines.push(data)
				}
				
				that.$axios({
					url: 'api/resume/saveWorkLines',
					method: 'post',
					data: {
						id: that.id,
						workLines: JSON.stringify(workLines)
					}
				}).then(res =>{
					if(res.code == 1){
						uni.navigateBack()
						that.$store.commit('resetWork')
					}
				})
			}
		},
		onBackPress() {  
			this.$store.commit('resetWork')
		}, 
		onLoad (options) {
			console.log(options)
			console.log(this.work)
			this.workLines = (JSON.parse(options.workLines) != null) ? JSON.parse(options.workLines) : []
			this.id = options.id
			if(options.index){
				const index = options.index
				this.ind = index	
				console.log(45454)		
				console.log(index)
				this.work.company = this.workLines[index].company
				this.work.do_work = this.workLines[index].do_work
				this.work.work_desc = this.workLines[index].work_desc
				this.from = this.workLines[index].project_exp.substr(0,7)
				this.to_minSelect = this.workLines[index].project_exp.substr(0,7)
				this.to = this.workLines[index].project_exp.substr(8,7)
				this.from_maxSelect = this.workLines[index].project_exp.substr(8,7)
				// this.$forceUpdate()
				console.log(this.work)
			}
		},
		computed:{
			work () {
				this.$forceUpdate()
				console.log(4568545454545)
				return this.$store.state.fullTime.work
			},
			...mapState(['fullTime'])
		},
		onShow(){
			// this.$forceUpdate()
			console.log(this.$store.state.fullTime.work)
			// this.work = this.$store.state.fullTime.work
			console.log(this.work)
			
		},
		components: {
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
