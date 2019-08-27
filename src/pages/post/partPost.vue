<template>
    <view class="partPost">
        <view class="form">
			<form @submit="formSubmit" @reset="formReset">				
				<view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>职位标题</text>
					</view>
					<input name="title" type="text" :value="detail.title"  placeholder="请输入职位标题" 
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
					<picker @change="bindPickerBill_way" :value="bill_wayIndex" :range="basicConfig.bill_way" name="bill_way">
						<view class="title f_24 c_999 row just_btw"><text>结算方式</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{basicConfig.bill_way[bill_wayIndex]}}</text>
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
					<input name="recruiting_numbers" type="number" :value="detail.recruiting_numbers"  placeholder="请输入招聘人数" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<picker @change="bindPickerTime" :value="timeIndex" :range="time" name="validity">
						<view class="title f_24 c_999 row just_btw"><text>兼职有效期</text><text class="iconfont icon-youjiantou"></text></view>
						<text class="f_30">{{time[timeIndex]}}</text>
					</picker>	
				</view>
                <view class="list" v-if="showTime">
                    <view class="title f_24 c_999 row just_btw"><text>短期兼职时间</text><text class="iconfont icon-youjiantou"></text></view>
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
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>兼职时间</text>
					</view>
                    <table class="column">
                        <tr>
                            <th class="" v-for="item in week" :key="item">{{item}}</th>
                        </tr>
                        <view class="row">
                            <view class="column td">
                                <text>上午</text>
                                <text>下午</text>
                                <text>晚上</text>
                            </view>
                            <view class="column td" v-for="(item, index) in dateCheck" :key="index">
                                <text class="iconfont icon-duigou white" v-bind:class="{'globelColor': it} "
                                v-for="(it,i) in item" :key="i" @click="checked(index, i)"></text>                             
                            </view>
                        </view>
                    </table>
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
					<input name="work_address" type="text" :value="detail.work_address"  placeholder="请输入详细地址" 
					placeholder-class="placeholder"/>
				</view>             
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系人</text>
					</view>
					<input name="contact_name" type="text" :value="detail.contact_name"  placeholder="请输入联系人" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系电话</text>
					</view>
					<input name="contact_tel" type="text" :value="detail.contact_tel"  placeholder="请输入联系电话" 
					placeholder-class="placeholder"/>
				</view>
                <view class="list">
					<view class="title f_24 c_999 row just_btw">
						<text>联系邮箱</text>
					</view>
					<input name="contact_email" type="text" :value="detail.contact_email"  placeholder="请输入联系邮箱" 
					placeholder-class="placeholder"/>
				</view>
				<button class="formBtn" formType="submit">保存</button>
			</form>
        </view>
    </view>
</template>

<script>
import { setTimeout } from 'timers';
import dyDatePicker from '../../components/dyDate.vue'
var  graceChecker = require("../../lib/graceChecker.js");
export default {
    name: 'partPost',
    data () {
        return {
            salaryIndex: 0,
            ageIndex: 0,
            edu_levelIndex: 0,
            work_expIndex: 0,
            sexIndex: 0,
            tt: [[], [], []],
            multiIndex: [0, 0, 0],
            region: '',
            type: 1, // 1:新建，2：修改,
            content: '',
            time: ['短期兼职', '长期兼职'],
            timeIndex: 0,
            from_minSelect: '1950/01/',
            from_maxSelect: '2040/12/',
            to_minSelect: '1950/01/',
            to_maxSelect: '2040/12/',
            from: '',
            to: '',
            showTime: true,
            bill_wayIndex: 0,
            week: ['','周一','周二','周三','周四','周五','周六','周日'],
            dateCheck :{Mon:[false,false,false],Tue:[false,false,false],Wed:[false,false,false],
            Thu:[false,false,false],Fri:[false,false,false],Sat:[false,false,false],Sun:[false,false,false]},
            detail: {
                title: '',
                contact_name: '',
                contact_tel: '',
                recruiting_numbers: '',
                work_address: '',
                contact_email: ''
            },
            info: {}
        }
    },
    onLoad (options) {
        if(options.type){
            this.type = 2
            uni.setNavigationBarTitle({
                title: '修改职位内容'
            })
            this.jobId = options.id
            this.getPostDetail(options.id)
        }else{
            this.getProvinces()
        } 
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
        formSubmit (e) {
            var rule = [
                {name:"title", checkType : "notnull", checkRule:"",  errorMsg:"请输入职位标题"},
                {name:"recruiting_numbers", checkType : "notnull", checkRule:"",  errorMsg:"请输入招聘人数"},
                {name:"contact_name", checkType: 'notnull',checkRule:"", errorMsg:"请输入联系人姓名"},
                {name:"contact_tel", checkType: 'phoneno',checkRule:"", errorMsg:"请输入正确联系人电话"},
                {name:"category_id", checkType: 'notnull',checkRule:"", errorMsg:"请选择职位分类"},
                {name:"part_time", checkType: 'notcheck',checkRule:"", errorMsg:"请选择兼职时间"},
            ];
            console.log(e)
            var formData = e.detail.value
            formData.category_id = this.jobIntension.length > 0 ? this.jobIntension[0].id : ''
            formData.content = this.content ? this.content : '好好工作，认真读书'
            formData.part_time = this.dateCheck // 要验证，先数组验证
            formData.province_id = this.province_id
            formData.city_id = this.city_id
            formData.district_id = this.district_id
            formData.validity = formData.validity == 0 ? '短期兼职' : '长期兼职'
            formData.salary = this.salaryIndex + 1
            formData.age = this.ageIndex + 1
            formData.edu_level = this.edu_levelIndex + 1
            formData.work_exp = this.work_expIndex + 1
            formData.sex = this.sexIndex + 1
            formData.bill_way = this.bill_wayIndex + 1
            formData.job_type = 2
            if(this.type == 2){
                formData.jobId = this.jobId
            }
            console.log(formData.validity)
            if(formData.validity == '短期兼职'){
                formData.short_validity_time = this.from + '-' + this.to
                if(this.from == ''){
                    uni.showToast({ title: '请输入短期兼职开始时间', icon: 'none' })
                    return false
                }else if(this.to == ''){
                    uni.showToast({ title: '请输入短期兼职结束时间', icon: 'none' })
                    return false
                }  
            }

            var checkRes = graceChecker.check(formData, rule)
            if (checkRes) {
                const that = this
                formData.part_time = JSON.stringify(this.dateCheck)
                that.$axios({
                    url: 'api/job/partPost',
                    method: 'post',
                    data:{
                        ...formData
                    }
                }).then(res => {
                    if(res.code == 1){
                        const title = that.type == 2 ? '修改成功' : '成功新建职位'
                        uni.showToast({ title: title, icon: 'none' })
                        setTimeout(function(){
                            uni.reLaunch({
                                url: '/pages/company/index'
                            })
                        }, 1000)
                    }else{
                        uni.showToast({ title: res.msg, icon: 'none' })
                    }
                })
            }else{
                console.log(graceChecker.error)
                uni.showToast({ title: graceChecker.error, icon: "none" })
            }
        },
        getPostDetail (id) {
            const that = this
            that.$axios({
                url: 'api/job/fullPost',
                data: {
                    id: id
                }
            }).then(res => {
                if(res.code == 1){
                    const data = res.data
                    that.salaryIndex = data.salary - 1
                    that.ageIndex = data.age - 1
                    that.edu_levelIndex = data.edu_level - 1
                    that.work_expIndex = data.work_exp - 1
                    that.salaryIndex = data.sex - 1
                    that.detail = data
                    that.region = data.province_name + '-' + data.city_name + '-' + data.district_name
                    if(data.short_validity_time){
                         that.from = data.short_validity_time.substr(0,7)
                        that.to = data.short_validity_time.substr(8,7)
                    }
                    let expect_jobs = []
                    expect_jobs.push({id: data.category_id, name: data.category_name})

                    that.dateCheck = JSON.parse(JSON.parse(data.part_time) ) 
                    console.log(that.dateCheck)
                    this.$store.commit('changeIntentsion', expect_jobs)
                    if(that.editorCtx){
                        that.editorCtx.setContents({
                            html: that.content,
                        })
                    }
                    that.info.province = data.province_name
                    that.info.city = data.city_name
                    that.info.district = data.district_name
                    data.tags = JSON.parse(data.tags)
                    if(data.tags){
                        for(var i = 0; i < data.tags.length; i++){
                            for(let j= 0; j<that.basicConfig.job_benefits.length; j++){
                                if(data.tags[i] == that.basicConfig.job_benefits[j].name){
                                    that.$set(that.basicConfig.job_benefits[j], 'checked', true)
                                    break;
                                }
                            }
                        }
                    } 
                    this.getProvinces()   
                }
            })
        },
        checked (type, index) { // 
            var date = this.dateCheck
            date[type][index]= !date[type][index]
            console.log(date[type][index])
            this.$forceUpdate()
            console.log(date)
            this.dateCheck = date
        },
        showIntension () { // 职位选择
            uni.navigateTo({
                url: '/pages/common/choosePartIntension?limit=' + 1
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
                    that.multiIndex[0]= 0
                    that.province_id = res.data[0].id
                }else{
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].name == that.info.province){
                            that.multiIndex[0]= i
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
                    that.multiIndex[1]= 0
                    that.city_id = res1.data[0].id
                    that.city_code = res1.data[0].code
                }else{
                    for(let i = 0; i < res1.data.length; i++){
                        if(res1.data[i].name == that.info.city){
                            that.multiIndex[1]= i
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
                    that.multiIndex[2]= 0
                    that.district_id = res1.data[0].id
                }else{
                    for(let i = 0; i < res1.data.length; i++){
                        if(res1.data[i].name == that.info.district){
                            that.multiIndex[2]= i
                            that.district_id = res1.data[i].id
                            break
                        }
                    }
                }
                // that.code = { code: that.tt[2][that.multiIndex[2]].code, name: that.tt[2][that.multiIndex[2]].name }
                that.region = that.tt[0][that.multiIndex[0]].name + "-"+that.tt[1][that.multiIndex[1]].name + "-" + res1.data[that.multiIndex[2]].name
            })
        },
        regionChange(e) {
            var indexArray = e.detail.value
            var region = ''
            var that = this
            console.log(e)
            indexArray.forEach(function(item, index){
                if(that.tt[index].length > 0){
                    region += that.tt[index][item].name + '-'
                    console.log(index)
                    that.region_id = that.tt[index][item].id
                }	
            })
            this.province_id = that.tt[0][indexArray[0]].id
            this.city_id = that.tt[1][indexArray[1]].id
            this.district_id = that.tt[2][indexArray[2]].id
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
            for (var i = 0, lenI = items.length; i < lenI; ++i) {
                const item = items[i]
                if(values.includes(item.value)){
                    this.$set(item,'checked',true)
                }else{
                    this.$set(item,'checked',false)
                }
            }
            this.welfare = values
            console.log(values)
        },
        bindPickerTime (e) { // 兼职有效期
            this.timeIndex = e.detail.value
            this.showTime = !this.showTime
        },
        bindPickerBill_way (e) { // 结算方式
            this.bill_wayIndex = e.detail.value
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
    },
    components:{
        dyDatePicker
    }
}

</script>
<style lang='less' scoped>
@import url("../../style/company/fullPost");
</style>
