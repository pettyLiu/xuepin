import store from '../store'
console.log(store)
var api= ''
if(store.state.roleType == 1){
    api = {
        user_info: 'api/user/index'
    }
}else{
    console.log(454)
    api = {
        user_info: 'api/user/EnterPriseUser'
    }
}
export default api