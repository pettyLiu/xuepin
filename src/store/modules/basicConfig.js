import axios from '../../lib/axios'
export default {
	state:{
		basicConfig: ''
	},
	mutations:{
		resetJob_benefits(state){
			const tt = state.basicConfig
			for(var i=0;i<tt.job_benefits.length;i++){
				tt.job_benefits[i].checked = false
				// tags.push({name: tt.job_benefits[i],checked:false})
			}
			state.basicConfig = tt
		}
	},
	actions:{
		getBasicConfig(context){ // 获取基础配置
			axios({
				url: 'api/base/selectConfig',
				method: 'get'
			}).then(res => {
				const tt = {}
				const tags = []
				tt.age = Object.values(res.data.age)
				tt.bill_way = Object.values(res.data.bill_way)
				tt.edu_level = Object.values(res.data.edu_level)
				tt.ent_scale = Object.values(res.data.ent_scale)
				tt.ent_type = Object.values(res.data.ent_type)
				tt.bill_way = Object.values(res.data.bill_way)
				tt.identity = Object.values(res.data.identity)
				
				tt.job_benefits = Object.values(res.data.job_benefits)
				for(var i=0;i<tt.job_benefits.length;i++){
					tags.push({name: tt.job_benefits[i],checked:false})
				}
				tt.job_benefits = tags
				tt.salary = Object.values(res.data.salary)
				console.log(tt.salary)
				tt.sex = Object.values(res.data.sex)
				tt.work_exp = Object.values(res.data.work_exp)
				context.state.basicConfig = tt
				console.log(tt)
				console.log(res.data.salary)
				console.log(context.state.basicConfig)
			})
		},
	}
}