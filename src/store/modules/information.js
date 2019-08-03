export default {
	state:{
		userInfo: uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : ''
	},
	mutations:{
		changeInfo(state, payload){ // 修改个人基础信息
			const { key, value } = payload
			state.userInfo[key] = value
		},
		resetInfo(state){
			state.userInfo = uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : ''
		}
	},
	actions:{
		
	}
}