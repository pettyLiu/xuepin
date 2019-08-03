import axios from '../../lib/axios'
export default {
	state:{
		basicConfig: ''
	},
	mutations:{
		
	},
	actions:{
		getBasicConfig(context){ // 获取基础配置
			axios({
				url: 'api/base/selectConfig',
				method: 'get'
			}).then(res => {
				context.state.basicConfig = res.data
				console.log(res)
			})
		},
	}
}