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
		token:'',
		JobIntension: {}
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
	},
	actions: {
		changeJobIntension(context, payload){
			
		},	
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
