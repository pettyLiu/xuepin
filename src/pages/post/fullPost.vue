<template>
    <view class="fullPost">
        <view class="form">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>职位标题</text>
					</view>
					<input name="title" type="text" value=""  placeholder="请输入职位标题" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list" @click="showIntension">
					<view class="title f_24 c_999 row just_btw">
						<text>职位分类</text>
					</view>
					<text class="f_30 listJob" v-for="(item, index) in jobIntension" 
				    :key="index">{{item.name}}</text>
                    <text class="f_30 listJob" v-if="jobIntension.length == 0">请选择职位分类</text>
				</view> 
                <view class="list">
					<picker @change="bindPickerSalary" :value="salaryIndex" :range="basicConfig.salary" name="salary">
						<view class="title f_24 c_999 row just_btw"><text>薪资待遇</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.salary[salaryIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerAge" :value="ageIndex" :range="basicConfig.age" name="age">
						<view class="title f_24 c_999 row just_btw"><text>年龄要求</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.age[ageIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker mode="multiSelector" @change="regionChange" :value="multiIndex" :range="tt" @columnchange="change" range-key='name'>
						<view class="title f_24 c_999 row just_btw">
							<text>工作地区</text>
							<text class="iconfont icon-youjiantou"></text>
						</view>
						<text class="f_30">{{region}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerEdu_level" :value="edu_levelIndex" :range="basicConfig.edu_level" name="edu_level">
						<view class="title f_24 c_999 row just_btw"><text>学历要求</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.edu_level[edu_levelIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerWork_exp" :value="work_expIndex" :range="basicConfig.work_exp" name="work_exp">
						<view class="title f_24 c_999 row just_btw"><text>经验要求</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.work_exp[work_expIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<picker @change="bindPickerSex" :value="sexIndex" :range="basicConfig.sex" name="sex">
						<view class="title f_24 c_999 row just_btw"><text>性别</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.sex[sexIndex]}}</text>
					</picker>	
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>招聘人数</text>
					</view>
					<input name="recruiting_numbers" type="number" value=""  placeholder="请输入招聘人数" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>职位福利</text>
					</view>
					<checkbox-group @change="checkboxChange" class="row checkboxs">
                        <label class="row checkLabel" v-for="(item, key, index) in basicConfig.job_benefits"
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
						<text>职位描述</text>
					</view>
                    <editor id="editor" class="ql-container" placeholder="输入"
                    @ready="onEditorReady" @input="changeContent"></editor>
					<!-- <textarea name="content" id="" cols="20" rows="10" placeholder="请输入企业介绍"></textarea> -->
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>详细地址</text>
					</view>
					<input name="work_address" type="text" value=""  placeholder="请输入详细地址" 
					placeholder-class="placeholder"/>
				</view>             
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系人</text>
					</view>
					<input name="contact_name" type="text" value=""  placeholder="请输入联系人" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系电话</text>
					</view>
					<input name="contact_tel" type="text" value=""  placeholder="请输入联系电话" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系邮箱</text>
					</view>
					<input name="contact_email" type="text" value=""  placeholder="请输入联系邮箱" 
					placeholder-class="placeholder"/>
				</view>
				<button class="formBtn" formType="submit">保存</button>
			</form>
        </view>
    </view>
</template>

<script>
import { setTimeout } from 'timers';
var  graceChecker = require("../../lib/graceChecker.js");
export default {
    name: 'fullPost',
    data () {
        return {
            salaryIndex: 0,
            ageIndex: 0,
            edu_levelIndex: 0,
            work_expIndex: 0,
            sexIndex: 0,
            tt: [[], [], []],
            multiIndex: [],
            region: '',
            type: 1, // 1:新建，2：修改,
            welfare: [],
            content: ''
        }
    },
    onLoad () {
        this.getProvinces()
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
        jobIntension () {
            return this.$store.state.fullTime.intentsion
        }
    },

    methods: {
        formSubmit (e){
            var rule = [
                {name:"title", checkType : "notnull", checkRule:"",  errorMsg:"请输入职位标题"},
                {name:"recruiting_numbers", checkType : "notnull", checkRule:"",  errorMsg:"请输入招聘人数"},
                {name:"contact_name", checkType: 'notnull',checkRule:"", errorMsg:"请输入联系人姓名"},
                {name:"contact_tel", checkType: 'phoneno',checkRule:"", errorMsg:"请输入正确联系人电话"},
                {name:"category_id", checkType: 'notnull',checkRule:"", errorMsg:"请选择职位分类"},
            ];
            var formData = e.detail.value
            formData.category_id = this.jobIntension.length > 0 ? this.jobIntension[0].id : ''
            formData.welfare = JSON.stringify(this.welfare)
            formData.content = this.content
            var checkRes = graceChecker.check(formData, rule)
            if (checkRes) {
                const that = this
                that.$axios({
                    url: 'api/job/fullPost',
                    method: 'post',
                    data:{
                        param: JSON.stringify(formData) 
                    }
                }).then(res => {
                    if(res.result){
                        uni.showToast({ title: '成功新建职位', icon: 'none' })
                        setTimeout(function(){
                            uni.navigateBack()
                        }, 1000)
                    }
                })
            }else{
                uni.showToast({ title: graceChecker.error, icon: "none" })
            }
        },
        showIntension () { // 职位选择
            uni.navigateTo({
                url: '/pages/common/chooseIntension?limit=' + 1
            })
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
                    that.city_code = res1.data[0].code
                }else{
                    for(let i = 0; i < res1.data.length; i++){
                        if(res1.data[i].name == that.info.city){
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
                        if(res1.data[i].name == that.info.city){
                            that.multiIndex.push(i)
                            that.code = res1.data[i].code
                            break
                        }
                    }
                }
                that.code = { code: that.tt[2][that.multiIndex[2]].code, name: that.tt[2][that.multiIndex[2]].name }
                that.region = that.tt[0][that.multiIndex[0]].name + "-"+that.tt[1][that.multiIndex[1]].name + "-" + res1.data[that.multiIndex[2]].name
            })
        },
        regionChange(e) {
            var indexArray = e.detail.value
            var region = ''
            var that = this
            indexArray.forEach(function(item, index){
                if(that.tt[index].length > 0){
                    region += that.tt[index][item].name + '-'
                    console.log(index)
                    that.region_id = that.tt[index][item].id
                }	
            })
            this.province_id = that.tt[0][indexArray[0]].id
            this.city_id = that.tt[1][indexArray[1]].id
            that.region = region.slice(0, region.length -1 )
            // that.code = { code: that.tt[2][indexArray[2]].code, name: that.tt[2][indexArray[2]].name }
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
        bindPickerSalary (e) { // 薪资选择器
            this.salaryIndex = e.detail.value
        },
        bindPickerAge (e) { // 年龄选择器
            this.ageIndex = e.detail.value
        },
        bindPickerEdu_level (e){ // 学历要求
            this.edu_levelIndex = e.detail.value
        },
        bindPickerWork_exp (e) { // 工作经验
            this.work_expIndex = e.detail.value
        },
        bindPickerSex (e) { // 性别选择器
            this.sexIndex = e.detail.value
        },
        checkboxChange: function (e) { // 职位福利
            var items = this.basicConfig.job_benefits,
                values = e.detail.value;
            this.welfare = values
            for (var i = 0, lenI = items.length; i < lenI; ++i) {
                const item = items[i]
                if(values.includes(item.value)){
                    this.$set(item,'checked',true)
                }else{
                    this.$set(item,'checked',false)
                }
            }          
            console.log(values)
        },
        changeContent (e) { // 职位描述
            console.log(e)
            this.content = e.detail.html
        },
        onEditorReady () {
            uni.createSelectorQuery().select('#editor').context((res) => {
                this.editorCtx = res.context
            }).exec()
        },
        onBackPress() { // 返回时，重置store的期望职位
			console.log('back')
			this.$store.commit('resetIntentsion')
		},
    }
}

</script>
<style lang='less' scoped>
@import url("../../style/company/fullPost");
</style>
