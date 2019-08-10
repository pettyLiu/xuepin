import Vue from 'vue'
import Vuex from 'vuex'
import footer_store from "./modules/footer_store.js"
import filterCompany from "./modules/filterCompany.js"
import information from "./modules/information"
import basicConfig from "./modules/basicConfig"
import fullTime from "./modules/fullTime"
import axios from '../lib/axios'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loading:'0',
		base_url:"https://cnodejs.org/api/v1",
		list:[],
		detail:'',
		Authorization: uni.getStorageSync('Authorization') ? uni.getStorageSync('Authorization') : '',
		JobIntension: {},
		city: uni.getStorageSync('city') ? JSON.parse(uni.getStorageSync('city')) : {id: 1266,name: "赣州市",parent_id: 15},
		district: '',
		category: '',
		roleType: uni.getStorageSync('roleType') ? uni.getStorageSync('roleType') : 2,
	},
	mutations: {
		switch_loading(state,status){
			console.log(status)
			if(status == "change"){
				if(state.loading=='0'){
					state.loading = '1'
				}else{
					state.loading = '0'
				}
			}else{
				state.loading = status;
			}	
		},
		loginIn(state, payload){
			state.Authorization = payload.Authorization
			uni.setStorageSync('Authorization', payload.Authorization)
			uni.setStorageSync('userInfo', JSON.stringify(payload.userInfo))
		},
		loginOut(){
			uni.removeStorageSync('Authorization')
			uni.removeStorageSync('userInfo')
		},
		changeCity (state, payload){
			state.city = payload
		},
		changeDistrict (state, payload) {
			state.district = payload
		},
		changeCategory (state, payload){
			state.category = payload
		},
		resetDistrict (state) {
			state.district = ''
		},
		resetCategory (state) {
			state.category = ''
		},
		changeRoleType (state, payload) {
			state.roleType = payload
		}
	},
	actions: {
	},
	modules:{
		footer_store,
		filterCompany, // 筛选公司规模性质
		information, // 个人基本信息
		basicConfig, // 基础配置
		fullTime, // 全职简历数据
	}
})

export default store
