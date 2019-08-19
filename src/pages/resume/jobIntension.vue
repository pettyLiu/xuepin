<template>
	<view class="form">
		<view class="list" @click="showIntension" >
			<view class="title f_24 c_999 row just_btw"><text>期望职位</text><text class="iconfont icon-youjiantou"></text></view>
			<text class="f_30 listJob" v-for="(item, index) in jobIntension" 
			:key="index">{{item.name}}</text>
			<text class="f_30 c_666" v-if="jobIntension.length == 0">请选择期望职位</text>
		</view>
		<view class="list">
			<picker :range="basic.salary" :value="jobIntensionIndex" @change="bindPickerSalary">
				<view class="title f_24 c_999 row just_btw"><text>期望薪资</text><text class="iconfont icon-youjiantou"></text></view>
				<text class="f_30">{{basic.salary[jobIntensionIndex]}}</text>
			</picker>
		</view>
		<view class="list">
			<picker mode="multiSelector" @change="regionChange" :value="multiIndex" :range="tt" @columnchange="change" range-key='name'>
				<view class="title f_24 c_999 row just_btw">
					<text>期望区域</text>
					<text class="iconfont icon-youjiantou"></text>
				</view>
				<text class="f_30">{{region}}</text>
			</picker>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'jobIntension',
		data() {
			return {
				jobIntensionIndex: 0,
				show: false,
				tt: [[], [], []],
				multiIndex: [],
				region: '',
				type: 1, // 1:新建，2：修改
			};
		},
		methods:{
			getProvinces () { // 获取省份
				var that = this
				this.$axios({
					url: 'api/base/province',
					method: 'get',
				}).then(function(res){
					that.tt[0] = (res.data)
					if(that.type == 1){
						that.multiIndex.push(0)
						that.province_id = res.data[0].id
					}else{
						for(let i = 0; i < res.data.length; i++){
							if(res.data[i].name == that.info.province){
								that.multiIndex.push(i)
								that.province_id = res.data[i].id
								break
							}
						}
					}
					that.getCity()	
				})
			},
			getCity () {
				const that = this
				that.$axios({
					url: 'api/base/ajaxCity',
					method: 'get',
					data: {
						id: that.province_id
					}
				}).then(function(res1){
					that.tt.splice(1, 1, res1.data)
					if(that.type == 1){
						that.multiIndex.push(0)
						that.city_id = res1.data[0].id
						that.city_code = res1.data[0].code
					}else{
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.city){
								console.log(1212)
								that.multiIndex.push(i)
								that.city_id = res1.data[i].id
								that.city_code = res1.data[i].code
								break
							}
						}
					}
					that.getDistrict()
				})
			},
			getDistrict () {
				const that = this
				that.$axios({
					url: 'api/base/ajaxDistrict',
					method: 'get',
					data: {
						id: that.city_id
					}
				}).then(function(res1){
					that.tt.splice(2, 1, res1.data)
					if(that.type == 1){
						that.multiIndex.push(0)
						that.code = res1.data[0].code
					}else{
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.district){
								that.multiIndex.push(i)
								that.code = res1.data[i].code
								break
							}
						}
					}
					console.log(that.tt)
					console.log(that.multiIndex)
					that.code = { code: that.tt[2][that.multiIndex[2]].code, name: that.tt[2][that.multiIndex[2]].name }
					that.region = that.tt[1][that.multiIndex[1]].name + " " + res1.data[that.multiIndex[2]].name
				})
			},
			regionChange(e) {
				var indexArray = e.detail.value
				var region = ''
				var that = this
				indexArray.forEach(function(item, index){
					if(that.tt[index].length > 0 && index > 0){
						region += that.tt[index][item].name + '-'
						that.region_id = that.tt[index][item].id
					}	
				})
				this.province_id = that.tt[0][indexArray[0]].id
				this.city_id = that.tt[1][indexArray[1]].id
				that.region = region.slice(0, region.length -1 )
				that.code = { code: that.tt[2][indexArray[2]].code, name: that.tt[2][indexArray[2]].name }
			},
			change (e){
				var id = 0
				var that = this
				if(e.detail.column == 0){
					that.province_id = this.tt[0][e.detail.value].id					
					this.$axios({
						url: 'api/base/ajaxCity',
						method: 'get',
						data: {
							id: that.province_id
						}
					}).then(function(res){
						if(res.code == 1){
							that.multiIndex[0] = e.detail.value
							that.tt.splice(1, 1, res.data)
						}
						that.$axios({
							url: 'api/base/ajaxDistrict',
							method: 'get',
							data: {
								id: res.data[0].id
							}
						}).then(function(res1){
							that.tt.splice(2, 1, res1.data)
						})
					})
				}else if(e.detail.column == 1){
					that.city_id = this.tt[1][e.detail.value].id	
					that.$axios({
						url: 'api/base/ajaxDistrict',
						method: 'get',
						data: {
							id: that.city_id
						}
					}).then(function(res1){
						that.tt.splice(2, 1, res1.data)
					})			
					that.multiIndex[1] = e.detail.value
				}else if(e.detail.column == 2){
					that.multiIndex[2] = e.detail.value
				}
			},
			showIntension () {
				console.log(this.alias)
				if(this.alias){
					uni.navigateTo({
						url: '/pages/common/choosePartIntension'
					})
				}else{
					uni.navigateTo({
						url: '/pages/common/chooseIntension'
					})
				}
				
			},
			bindPickerSalary (e) { // 薪资选择器
				this.jobIntensionIndex = e.detail.value
			},
		},
		onNavigationBarButtonTap (val){ // 点击保存
			const that = this
			console.log(that.code)
			console.log(that.jobIntension)
			var expect_jobs = []
			for(let i = 0; i< that.jobIntension.length; i++){
				console.log(123)
				expect_jobs.push(that.jobIntension[i].id)
			}
			console.log(expect_jobs)
			if(this.alias){
				that.$axios({
					url: 'api/resume/saveJobAim',
					method: 'post',
					data: {
						id: that.id,
						expect_jobs: expect_jobs.join(','),
						expect_salary: that.jobIntensionIndex + 1,
						desired_area: JSON.stringify([that.code]) 
					}
				}).then(res =>{
					if(res.code == 1){
						uni.navigateBack()	
					}
				})
			}else{
				that.$axios({
					url: 'api/resume/saveJobAim',
					method: 'post',
					data: {
						id: that.id,
						expect_jobs: expect_jobs.join(','),
						expect_salary: that.jobIntensionIndex + 1,
						desired_area: JSON.stringify([that.code]) 
					}
				}).then(res =>{
					if(res.code == 1){
						uni.navigateBack()	
					}
				})
			}
			
		},
		onBackPress() { // 返回时，重置store的期望职位
			console.log('back')
			this.$store.commit('resetIntentsion')
		},
		onLoad (options){
			console.log(options.desired_area)
			this.id = options.id
			if(options.alias){ // 区分全职还是兼职简历
				this.alias = options.alias
			}
			if(options.salary){
				this.jobIntensionIndex = options.salary - 1
			}
			if(options.type){
				this.type = options.type
			}
			if(options.desired_area){
				this.info = JSON.parse(options.desired_area)
				this.info.province = this.info.ifrstAreaName
				this.info.city = this.info.twoAreaName
				this.info.district = this.info.name
				delete this.info.ifrstAreaName
				delete this.info.twoAreaName
				delete this.info.name
				console.log(this.info)
			}
			this.getProvinces()
			console.log(this.$store.state.fullTime.intentsion)
		},
		computed:{
			basic () {
				return this.$store.state.basicConfig.basicConfig
			},
			jobIntension () {
				return this.$store.state.fullTime.intentsion
			}
		},
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
			.listJob{
				margin-right: 10upx
			}
		}
	}
</style>
