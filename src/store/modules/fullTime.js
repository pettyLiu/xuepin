export default {
	state:{
		intentsion: [],
		education: {}
	},
	mutations:{
		changeIntentsion(state, payload){ // 修改期望职位
			console.log(payload)
			state.intentsion = payload
		},
		resetIntentsion(state){ // 重置期望职位
			state.intentsion = []
		},
		changeEducation(state, payload){ // 修改教育经历
			console.log(payload)
			const { key, value } = payload
			state.education[key] = value
		},
		resetEducation(state){ // 重置教育经历
			state.education = { school: '', major: '' }
		}
	},
	actions:{
		
	}
}