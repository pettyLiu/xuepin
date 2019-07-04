export default {
	state:{
		filter: {
			nature: '全部',
			scale: '全部',
		}
	},
	mutations:{
		change_filter(state,data){
			state.filter = data
		},
		reset_filter(state,index){
			state.filter = {nature:'全部',scale:'全部'}
		}
	},
	actions:{
		filterCompany(context, payload){
		}
	}
}