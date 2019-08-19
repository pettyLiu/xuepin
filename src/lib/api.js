import store from '../store'
export function api(){
    const type = store.state.roleType
    var apis = ''
    if(type == 1){
        apis = {
            user_info: 'api/user/index',
            company_data: 'api/enterprise/index',
            message_data: 'api/user/message'
        }
    }else{
        apis = {
            user_info: 'api/user/EnterPriseUser',
            company_data: 'api/job/jobList',
            message_data: 'api/enterprise/message'
        }
    }
    return apis
}
