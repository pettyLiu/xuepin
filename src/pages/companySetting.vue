<template>
	<view class="editInformation">
        <view class="form" v-if="industy">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>企业名称</text>
					</view>
					<input name="name" type="text" :value="companyName"  placeholder="请输入企业名称" 
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
                                <checkbox :value="item.name" :checked="item.checked" />
                            </view>
                            <view>{{item.name}}</view>
                        </label>
                    </checkbox-group>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系人姓名</text>
					</view>
					<input name="contact_name" type="text" :value="contact_name"  placeholder="请输入联系人姓名" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系人电话</text>
					</view>
					<input name="contact_tel" type="text" :value="contact_tel"  placeholder="请输入联系人电话" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list" @click="chooseAddress">
					<view class="title f_24 c_999 row just_btw">
						<text>联系地址</text>
					</view>
					<input name="address" type="text" value=""  placeholder="请输入详细联系地址" 
					placeholder-class="placeholder" v-model="addr.address" disabled/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>企业介绍</text>
					</view>
                    <editor id="editor" class="ql-container" placeholder="输入" :read-only="readOnly"
                    @ready="onEditorReady" @input="changeContent" @click="changeReadOnly"></editor>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>营业执照</text>						
					</view>
					<view class="listImgs" @click="uploadImg(1)">						 
						<img class="listImg" :src="imgUrl + img1" alt="" v-if="img1!=''">
                        <text class="f_72 iconfont icon-tianjia globelColor" v-else-if="business_license_img==''"></text>
                        <img class="listImg" :src="imgUrl + business_license_img" alt="" v-else>
                    </view>
				</view>
				<view ref="input" class="input">  </view>  
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>公司logo</text>
					</view>
					<view class="listImgs" @click="uploadImg(2)">
						<img class="listImg" :src="imgUrl + img2" alt="" v-if="img2!=''">
                        <text class="f_72 iconfont icon-tianjia globelColor" v-else-if="avatar==''"></text>
                        <img class="listImg" :src="imgUrl + avatar" alt="" v-else>
                    </view>
				</view>
				<button class="formBtn" formType="submit">保存</button>
			</form>
		</view>
    </view>
</template>

<script>
	import config from '../lib/config'
	import basicConfig from '../store/modules/basicConfig';
import { setTimeout } from 'timers';
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
				multiIndex: [0,0,0],
				region: '',
				addr: {},
				contact_name: '',
				contact_tel: '',
				imgUrl: config.imgUrl,
				img1: '',
				img2: '',
				companyName: '',
				editorCtx: '',
				readOnly: true,
				type: 2
			};
		},
		methods: {
			changeReadOnly(){
				this.readOnly = false
			},
			formSubmit (e) {
				console.log(e)
				var rule = [
					{name:"name", checkType : "notnull", checkRule:"",  errorMsg:"请输入企业名称"},
					{name:"contact_name", checkType: 'notnull',checkRule:"", errorMsg:"请输入联系人姓名"},
					{name:"contact_tel", checkType: 'phoneno',checkRule:"", errorMsg:"请输入正确联系人电话"},
					{name:"address", checkType: 'notnull',checkRule:"", errorMsg:"请输入地址"},
				];
				var formData = e.detail.value
				formData.address = this.addr.address
				formData.addr_code = this.addr.longitude + ',' + this.addr.latitude
				formData.content = this.content
				formData.fileupload = this.avatar //企业头像
				formData.upload_license = this.business_license_img // 营业执照
				formData.scale = this.ent_scaleIndex + 1
				formData.type = this.ent_typeIndex + 1
				formData.category_id = this.industyIndex + 1 // 所属行业
				formData.CompanyNatrue = this.ent_typeIndex + 1 // 企业性质
				formData.province_id = this.province_id
				formData.city_id = this.city_id
				formData.district_id = this.district_id
				formData.tags = JSON.stringify(this.welfare)
				formData.web_url = ''
				if(!this.welfare){
					uni.showToast({ title: '请选择职位福利', icon: 'none' })
					return
				}
				console.log(formData)
				var checkRes = graceChecker.check(formData, rule)
				var url = this.type == 1 ? 'api/enterprise/apply' : 'api/enterprise/appEnterpriseEdit'
				if (checkRes) {
					const that = this
					that.$axios({
						url: url,
						method: 'post',
						data:{						
							...formData
						} 
					}).then(res => {
						if(res.code == 1){
							const role = this.$store.state.roleType
							uni.showToast({ title: res.msg, icon: 'none' })							
							if(this.type == 1){
								this.$store.commit('changeRoleType', role == 1 ? 2 : 1)
								setTimeout(function(){
									uni.reLaunch({
										url: '/pages/index/index'
									})	
								}, 1000)
							}else{
								setTimeout(function(){
									uni.navigateBack()
								}, 1000)
							}	
						}
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},
			getCompanyDetail () {
				const that = this
				that.$axios({
					url: 'api/enterprise/appEnterpriseEdit',
					method: 'get'
				}).then(res => {
					if(res.code == 1){							
						const datas = res.data.enterpriseRes
						console.log(datas)		
						that.type = 2
						var info = {}
						info.province = datas.province_name
						info.city = datas.city_name
						info.district = datas.district_name
						that.info = info
						that.companyName = datas.name
						that.ent_scaleIndex = datas.scale - 1
						that.ent_typeIndex = datas.CompanyNatrue - 1
						that.industyIndex = datas.category_id - 1
						that.contact_name = datas.contact_name
						that.contact_tel = datas.contact_tel
						that.region = datas.province_name + '-' + datas.city_name + '-' + datas.district_name
						that.addr.address = datas.address
						that.addr.longitude = Number(datas.addr_code.split(',')[0])
						that.addr.latitude = Number(datas.addr_code.split(',')[1])
						console.log(datas.addr_code.split(','))
						that.content = datas.content
						if(that.editorCtx){
							that.editorCtx.setContents({
								html: that.content,
							})
						}
						that.img2 = datas.logo
						that.img1 = datas.business_license_img
						that.welfare = datas.tags
						that.addr_code = datas.addr_code
						for(var i = 0; i < datas.tags.length; i++){
							for(let j= 0;j<that.basicConfig.job_benefits.length;j++){
								if(datas.tags[i] == that.basicConfig.job_benefits[j].name){
									that.$set(that.basicConfig.job_benefits[j], 'checked', true)
									break;
								}
							}
						}
						that.getProvinces()
					}else if(res.code == 0 && res.data.length == 0){
						that.type = 1
						this.getProvinces()
					}
				})
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
                var items = this.basicConfig.job_benefits,
					values = e.detail.value;
				this.welfare = values
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
                    if(values.includes(item.name)){
                        this.$set(item, 'checked', true)
                    }else{
                        this.$set(item, 'checked', false)
                    }
				}
            },
            uploadImg (type) {
                const that = this
				uni.chooseImage({
					count: 1,
					success: function(res){
						var img = res.tempFilePaths[0]
						if(type == 1){
							that.img1 = ''
							that.business_license_img = res.tempFilePaths[0]
						}else{
							that.img2 = ''
							that.avatar = res.tempFilePaths[0]
						}
						that.avatar = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + 'upload/ajaxUploads',
							filePath: img,
							name: 'fileUpload',
							success: (uploadFileRes) => { 
								console.log(232)
                                if(type == 1){
                                    that.business_license_img = JSON.parse(uploadFileRes.data).data
                                }else{
                                    that.avatar = JSON.parse(uploadFileRes.data).data
                                }	
							}
						});
					}
				})
            },
            changeContent (e) {
                console.log(e)
                this.content = e.detail.html
            },
            onEditorReady () {
				const that = this
				// #ifdef APP-PLUS
                uni.createSelectorQuery().select('#editor').context((res) => {				
					that.editorCtx = res.context
					if(that.content){
						that.editorCtx.setContents({
							html: that.content,
						})
					}	
					that.blur()		
				}).exec()
				// #endif	
			},
			getProvinces () { // 获取省份
				var that = this
				this.$axios({
					url: 'api/base/province',
					method: 'get',
				}).then(function(res){
					that.tt[0] = (res.data)
					if(that.type == 1){
						that.multiIndex[0] = 0
						that.province_id = res.data[0].id
					}else{
						console.log(that.type)
						for(let i = 0; i < res.data.length; i++){
							if(res.data[i].name == that.info.province){
								that.multiIndex[0] = i
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
						that.multiIndex[1] = 0
						that.city_id = res1.data[0].id
					}else{
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.city){
								console.log(1212)
								that.multiIndex[1] = i
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
						that.multiIndex[2] = 0
						that.district_id = res1.data[0].id
					}else{
						for(let i = 0; i < res1.data.length; i++){
							if(res1.data[i].name == that.info.district){
								that.multiIndex[2] = i
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
				this.district_id = that.tt[2][indexArray[2]].id
				that.region = region.slice(0, region.length -1 )
				that.code = { code: that.tt[2][indexArray[2]].code, name: that.tt[2][indexArray[2]].name }
			},
			change (e){
				console.log(this.multiIndex)
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
        onLoad (options) {
			this.getIndusty()
			if(options.type){	
				this.type = 1
			}
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
			}
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
input:disabled{
	color: #333 !important
}

</style>
