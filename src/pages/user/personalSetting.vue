<template>
	<view class="editInformation">
        <view class="form">
			<form @submit="formSubmit" @reset="formReset">
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>头像</text>
					</view>
					<view class="listImgs" @click="uploadImg()">
                        <text class="f_72 iconfont icon-tianjia globelColor" v-if="info.avatar==''"></text>
                        <img class="listImg" :src="imgUrl + info.avatar" alt="" v-else>
                    </view>
				</view>				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>姓名</text>
					</view>
					<input name="true_name" type="text" :value="info.name"  placeholder="请输入您的姓名" 
					placeholder-class="placeholder"/>
				</view> 
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>所在公司</text>
					</view>
					<input name="enterpriseName" type="text" :value="info.enterprise_name"  placeholder="请输入所在公司" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>所任职务</text>
					</view>
					<input name="post" type="text" :value="info.post"  placeholder="请输入所任职务" 
					placeholder-class="placeholder"/>
				</view>
                
				<button class="formBtn" formType="submit">保存</button>
			</form>
		</view>
    </view>
</template>

<script>
	import config from '../../lib/config'
	import basicConfig from '../../store/modules/basicConfig';
	var  graceChecker = require("../../lib/graceChecker.js");
	export default {
		name: 'personalSetting',
		data () {
			return {
				avatar: '',
                imgUrl: config.imgUrl,
                info: {},
                type: '', // 从哪来，1为从切换企业角色来，其他为创建企业角色后修改信息，不传type，应默认''
			};
		},
		methods: {
			changeReadOnly(){
				this.readOnly = false
			},
			formSubmit (e) {
				console.log(e)
				var rule = [
                    {name:"avatar", checkType: 'notnull',checkRule:"", errorMsg:"请上传头像"},
					{name:"true_name", checkType : "notnull", checkRule:"",  errorMsg:"请输入真实姓名"},
					{name:"enterpriseName", checkType: 'notnull',checkRule:"", errorMsg:"请输入公司名称"},
					{name:"post", checkType: 'notnull',checkRule:"", errorMsg:"请输入所任职务"},	
				];
				var formData = e.detail.value
                formData.avatar = this.avatar // 头像
                console.log(formData)
                var checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					const that = this
					that.$axios({
						url: 'api/user/EnterPriseUserEdit',
						method: 'post',
						data:{						
							...formData
						} 
					}).then(res => {
                        console.log(res)
                        if(that.type == 1){
                            uni.navigateTo({ // 先去填写企业职务资料
                                url: '/pages/companySetting?type=1'
                            })
                        }else{
                            uni.showToast({ title: '修改资料成功！', icon: 'none' })
                        }
                        
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" })
				}
			},
			getCompanyDetail () {
				const that = this
				that.$axios({
					url: 'api/user/EnterPriseUserEdit',
					method: 'get'
				}).then(res => {
                    console.log(res)
					if(res.code == 1){							
						that.info = res.data
					}
				})
			},
            uploadImg (type) {
                const that = this
				uni.chooseImage({
					count: 1,
					success: function(res){
						var img = res.tempFilePaths[0]
						that.avatar = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + 'upload/ajaxUploads',
							filePath: img,
							name: 'fileUpload',
							success: (uploadFileRes) => { 
                                that.avatar = JSON.parse(uploadFileRes.data).data	
							}
						});
					}
				})
            }
        },
        onLoad (options) {
			if(options.type){	
				this.type = 1
			}
			this.getCompanyDetail()			
        }
    }
</script>

<style lang="less">
@import url("../../style/resume/editInformation");
@import url("../../style/basicInformation/basicInformation");
.listImgs{
    border: 1upx solid #ccc;
    height: 100upx;
    width: 100upx;
    line-height: 100upx;
    text-align: center;
    border-radius: 50%;
    .listImg{
        width: 100%;
        height: 100%;
        border-radius: 50%
    }
}
</style>