export default {
	state:{
		intentsion: [],
	},
	mutations:{
		changePartIntentsion(state, payload){ // 修改期望职位
			console.log(payload)
			state.intentsion = payload
		},
		resetPartIntentsion(state){ // 重置期望职位
			state.intentsion = []
		},
	},
	actions:{
		
	}
}