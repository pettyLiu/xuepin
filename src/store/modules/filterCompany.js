export default {
	state:{
		filter: {
			nature: '',
			scale: '',
		}
	},
	mutations:{
		change_filter(state,data){
			state.filter = data
		},
		reset_filter(state,index){
			state.filter = {nature:'', scale:''}
		}
	},
	actions:{
		filterCompany(context, payload){
		}
	}
}