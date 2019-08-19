<template>
	<view class="editInformation">
        <view class="form" v-if="industy">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>企业名称</text>
					</view>
					<input name="name" type="text" value=""  placeholder="请输入企业名称" 
					placeholder-class="placeholder"/>
				</view> 
				<view class="list">
					<picker @change="bindPickerEnt_scale" :value="ent_scaleIndex" :range="basicConfig.ent_scale" name="scale">
						<view class="title f_24 c_999 row just_btw"><text>公司规模</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.ent_scale[ent_scaleIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerEnt_type" :value="ent_typeIndex" :range="basicConfig.ent_type" name="CompanyNatrue">
						<view class="title f_24 c_999 row just_btw"><text>公司性质</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.ent_type[ent_typeIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerIndusty" :value="industyIndex" :range="industy" range-key="name">
						<view class="title f_24 c_999 row just_btw"><text>所属行业</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{industy[industyIndex].name}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker mode="multiSelector" @change="regionChange" :value="multiIndex" :range="tt" @columnchange="change" range-key='name'>
						<view class="title f_24 c_999 row just_btw">
							<text>所属地区</text>
							<text class="iconfont icon-youjiantou"></text>
						</view>
						<text class="f_30">{{region}}</text>
					</picker>	
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>职位福利</text>
					</view>
					<checkbox-group @change="checkboxChange" class="row checkboxs">
                        <label class="row checkLabel" v-for="(item, index) in basicConfig.job_benefits"
                        :key="index">
                            <view>
                                <checkbox :value="item" :checked="item.checked" />
                            </view>
                            <view>{{item}}</view>
                        </label>
                    </checkbox-group>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系人姓名</text>
					</view>
					<input name="contact_name" type="text" value=""  placeholder="请输入联系人姓名" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系人电话</text>
					</view>
					<input name="contact_tel" type="text" value=""  placeholder="请输入联系人电话" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list" @click="chooseAddress">
					<view class="title f_24 c_999 row just_btw">
						<text>联系地址</text>
					</view>
					<input name="address" type="text" value=""  placeholder="请输入详细联系地址" 
					placeholder-class="placeholder" v-model="addr.address" disabled/>
				</view>
                <!-- <view class="list" @click="chooseAddress">
					<view class="title f_24 c_999 row just_btw">
						<text>地理坐标</text>
					</view>
					<text></text>
                    <text>我要标注</text>
				</view> -->
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>企业介绍</text>
					</view>
                    <editor id="editor" class="ql-container" placeholder="输入"
                    @ready="onEditorReady" @input="changeContent"></editor>
					<!-- <textarea name="content" id="" cols="20" rows="10" placeholder="请输入企业介绍"></textarea> -->
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>营业执照</text>
					</view>
					<view class="listImgs" @click="uploadImg(1)">
                        <text class="f_72 iconfont icon-tianjia globelColor" v-if="business_license_img==''"></text>
                        <img class="listImg" :src="business_license_img" alt="" v-else>
                    </view>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>公司logo</text>
					</view>
					<view class="listImgs" @click="uploadImg(2)">
                        <text class="f_72 iconfont icon-tianjia globelColor" v-if="avatar==''"></text>
                        <img class="listImg" :src="avatar" alt="" v-else>
                    </view>
				</view>
				<button class="formBtn" formType="submit">保存</button>
			</form>
		</view>
    </view>
</template>

<script>
	import config from '../lib/config'
	var  graceChecker = require("../lib/graceChecker.js");
	export default {
		name: 'companySetting',
		data () {
			return {
                ent_scaleIndex: 0,
                ent_typeIndex: 0,
                industyIndex: 0,
                industy: '',
                business_license_img: '', // 营业执照
				avatar: '',
				tt: [[], [], []],
				multiIndex: [],
				region: '',
				addr: ''
			};
		},
		methods: {
			formSubmit (e) {
				console.log(e)
				var rule = [
					{name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请输入企业名称"},
					{name:"contact_name", checkType: 'notnull',checkRule:"", errorMsg:"请输入联系人姓名"},
					{name:"contact_tel", checkType: 'phoneno',checkRule:"", errorMsg:"请输入正确联系人电话"},
					{name:"address", checkType: 'notnull',checkRule:"", errorMsg:"请输入地址"},
				];
				console.log(this.addr)
				var formData = e.detail.value
				formData.address = this.addr.address
				formData.addr_code = this.addr.longitude + ',' + this.addr.latitude
				formData.content = this.content
				// formData.fileupload = this.avatar //企业头像
				// formData.upload_license = this.business_license_img // 营业执照
				formData.scale = this.ent_scaleIndex + 1
				formData.type = this.ent_typeIndex + 1
				formData.category_id = this.industyIndex + 1 // 所属行业
				formData.CompanyNatrue = this.ent_typeIndex + 1 // 企业性质
				formData.province_id = this.province_id
				formData.city_id = this.city_id
				formData.district_id = this.district_id
				formData.tags = JSON.stringify(this.welfare) 
				if(!this.welfare){
					uni.showToast({ title: '请选择职位福利', icon: 'none' })
					return
				}
				console.log(formData)
				var checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					const that = this
					 uni.uploadFile({
						url: config.baseUrl + 'api/enterprise/apply', 
						header:{'Authorization': that.$store.state.Authorization},
						// header:{"Content-Type": "multipart/form-data"},
						filePath: that.avatar,
						name: 'fileupload',
						// files: [{name:'fileupload',uri: that.avatar},{name:'upload_license',uri:that.business_license_img}],						
						formData: {
							...formData
							// desc: '1235'
						},
						success: function (uploadFileRes) {
							
							console.log(uploadFileRes.data);
						}
					 })
					// that.$axios({
					// 	url: 'enterprise/apply',
					// 	method: 'post',
					// 	data:{
					// 		fileupload: that.avatar,
					// 		upload_license: that.business_license_img,
					// 		params: JSON.stringify(formData),
					// 		desc: '1235'
					// 	}
					// }).then(res => {
					// 	if(res.result){
					// 		uni.showToast({ title: '成功新建职位', icon: 'none' })
					// 		setTimeout(function(){
					// 			uni.navigateBack()
					// 		}, 1000)
					// 	}
					// })
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},
			getCompanyDetail () {
				//注释掉两行
				this.type = 1
				this.getProvinces()
				// const that = this
				// that.$axios({
				// 	url: 'api/enterprise/appEnterpriseEdit',
				// 	method: 'post'
				// }).then(res => {
				// 	console.log(res.data.length)
				// 	if(res.data.length == 0){
				// 		that.type = 1
				// 		this.getProvinces()
				// 	}
				// 	// console.log(res){code: 0,data: [],msg: "用户没有企业信息"}
				// })
			},
			chooseAddress () {
				const that = this
				uni.chooseLocation({
					success: function (res) {
						that.addr = res
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
            bindPickerEnt_scale (e) { // 公司规模
                this.ent_scaleIndex = e.detail.value
            },
            bindPickerEnt_type (e) { // 公司性质
                console.log(e)
                this.ent_typeIndex = e.detail.value
            },
            bindPickerIndusty (e) {
                this.industyIndex = e.detail.value
            },
            getIndusty () { // 获取行业
                const that = this
                that.$axios({
                    url: 'api/base/busyClass',
                }).then(res => {
                    that.industy = res.data
                })
            },
            checkboxChange: function (e) {
				console.log(e)
                var items = this.basicConfig.job_benefits,
					values = e.detail.value;
				this.welfare = values
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.value)){
                        this.$set(item, 'checked', true)
                    }else{
                        this.$set(item, 'checked', false)
                    }
				}
				
				console.log(this.welfare)
            },
            uploadImg (type) {
                const that = this
				uni.chooseImage({
					count: 1,
					success: function(res){
						if(type == 1){
							that.business_license_img = res.tempFilePaths[0]
						}else{
							that.avatar = res.tempFilePaths[0]
						}
						// that.avatar = res.tempFilePaths[0]
						// uni.uploadFile({
						// 	url: config.baseUrl + 'upload/ajaxUploads',
						// 	filePath: img,
						// 	name: 'fileUpload',
						// 	success: (uploadFileRes) => {
                        //         if(type == 1){
                        //             that.business_license_img = config.imgUrl + JSON.parse(uploadFileRes.data).data
                        //         }else{
                        //             that.avatar = config.imgUrl + JSON.parse(uploadFileRes.data).data
                        //         }	
						// 	}
						// });
					}
				})
            },
            changeContent (e) {
                console.log(e)
                this.content = e.detail.html
            },
            onEditorReady () {
                uni.createSelectorQuery().select('#editor').context((res) => {
                    this.editorCtx = res.context
                }).exec()
			},
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
					}else{
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.city){
								console.log(1212)
								that.multiIndex.push(i)
								that.city_id = res1.data[i].id
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
						that.district_id = res1.data[0].id
					}else{
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.district){
								that.multiIndex.push(i)
								that.district_id = res1.data[i].id
								break
							}
						}
					}
					that.region = that.tt[0][that.multiIndex[0]].name + "-" + that.tt[1][that.multiIndex[1]].name + "-" + res1.data[that.multiIndex[2]].name
				})
			},
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
        },
        onLoad () {
            console.log(this.basicConfig)
			this.getIndusty()
			this.getCompanyDetail()			
        },
		computed: {
            basicConfig: {
				get(){
					return this.$store.state.basicConfig.basicConfig
				},
				set(val){
					this.$store.state.basicConfig.basicConfig
				}
			},
		},
	}
</script>

<style lang="less">
@import url("../style/resume/editInformation");
@import url("../style/basicInformation/basicInformation");
.checkboxs{
    flex-wrap: wrap;
    .checkLabel{
        width: 33.33%;
        margin-bottom: 20upx;
    }
}
.listImgs{
    border: 1upx solid #ccc;
    height: 188upx;
    width: 300upx;
    line-height: 188upx;
    text-align: center;
    border-radius: 10upx;
    .listImg{
        width: 100%;
        height: 100%;
    }
}

</style>
