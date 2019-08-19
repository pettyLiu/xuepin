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
				const tt = {}
				tt.age = Object.values(res.data.age)
				tt.bill_way = Object.values(res.data.bill_way)
				tt.edu_level = Object.values(res.data.edu_level)
				tt.ent_scale = Object.values(res.data.ent_scale)
				tt.ent_type = Object.values(res.data.ent_type)
				tt.bill_way = Object.values(res.data.bill_way)
				tt.identity = Object.values(res.data.identity)
				tt.job_benefits = Object.values(res.data.job_benefits)
				tt.salary = Object.values(res.data.salary)
				tt.sex = Object.values(res.data.sex)
				tt.work_exp = Object.values(res.data.work_exp)
				context.state.basicConfig = tt
				console.log(context.state.basicConfig)
			})
		},
	}
}