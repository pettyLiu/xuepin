export default {
	state:{
		intentsion: '' 
	},
	mutations:{
		changeIntentsion(state, payload){ // 修改期望职位
			state.intentsion = payload
		},
		resetIntentsion(state){ // 重置期望职位
			state.intentsion = ''
		}
	},
	actions:{
		
	}
}