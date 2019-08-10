<template>
	<view class="editInformation">
        <view class="form" v-if="industy">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>姓名</text>
					</view>
					<input name="name" type="text" value=""  placeholder="请输入姓名" 
					placeholder-class="placeholder"/>
				</view> 
				<view class="list">
					<picker @change="bindPickerEnt_scale" :value="ent_scaleIndex" :range="basicConfig.ent_scale" range-key="key" name="scale">
						<view class="title f_24 c_999 row just_btw"><text>公司规模</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.ent_scale[ent_scaleIndex+1]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerEnt_type" :value="ent_typeIndex" :range="basicConfig.ent_type" range-key="key" name="type">
						<view class="title f_24 c_999 row just_btw"><text>公司性质</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.ent_type[ent_typeIndex+1]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerIndusty" :value="industyIndex" :range="industy" range-key="name">
						<view class="title f_24 c_999 row just_btw"><text>所属行业</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{industy[industyIndex].name}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerIndusty" :value="industyIndex" :range="industy" range-key="name">
						<view class="title f_24 c_999 row just_btw"><text>所属地区</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{industy[industyIndex].name}}</text>
					</picker>	
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>职位福利</text>
					</view>
					<checkbox-group @change="checkboxChange" class="row checkboxs">
                        <label class="row checkLabel" v-for="(item, index) in basicConfig.job_benefits"
                        :key="index + 1">
                            <view>
                                <checkbox :value="item.key" :checked="item.checked" />
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
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系地址</text>
					</view>
					<input name="address" type="text" value=""  placeholder="请输入详细联系地址" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>地理坐标</text>
					</view>
					<text></text>
                    <text>我要标注</text>
				</view>
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
	export default {
		name: 'companySetting',
		data () {
			return {
                ent_scaleIndex: 0,
                ent_typeIndex: 0,
                industyIndex: 0,
                industy: '',
                business_license_img: '', // 营业执照
                avatar: ''
			};
		},
		methods: {
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
                var items = this.items,
                    values = e.detail.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.value)){
                        this.$set(item,'checked',true)
                    }else{
                        this.$set(item,'checked',false)
                    }
                }
            },
            uploadImg (type) {
                const that = this
				uni.chooseImage({
					count: 1,
					success: function(res){
						const img = res.tempFilePaths[0]
						uni.uploadFile({
							url: config.baseUrl + 'upload/ajaxUploads',
							filePath: img,
							name: 'fileUpload',
							success: (uploadFileRes) => {
                                if(type == 1){
                                    that.business_license_img = config.imgUrl + JSON.parse(uploadFileRes.data).data
                                }else{
                                    that.avatar = config.imgUrl + JSON.parse(uploadFileRes.data).data
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
                uni.createSelectorQuery().select('#editor').context((res) => {
                    this.editorCtx = res.context
                }).exec()
            },
        },
        onLoad () {
            console.log(this.basicConfig)
            this.getIndusty()
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
