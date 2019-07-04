export default {
	state:{
		info: uni.getStorageSync('info') ? uni.getStorageSync('info') : {}
	},
	mutations:{
		changeInfo(state, payload){ // 修改个人基础信息
			const { key, value } = payload
			state.info[key] = value
		},
		resetInfo(state){
			state.info = uni.getStorageSync('info') ? uni.getStorageSync('info') : {}
		}
	},
	actions:{
		
	}
}