import axios from 'uni-request'
import config from '@/lib/config'
import store from '@/store/index'

const Qs = require('qs')
axios.defaults.baseURL = ''

axios.interceptors.request.use(config => {
	config.headers['Authorization'] = store.state.Authorization
	return config
}, error => {
	return Promise.reject(error)
})
// 请求响应拦截器
axios.interceptors.response.use(res => {
    return Promise.resolve(res)
}, error => {
    return Promise.reject(error)
})

export default function (options) {
	console.log(options)
    if (/post/i.test(options.method) && !options.headers) {
        options.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        options.data = Qs.parse(options.data)
    }
    if (!/json/.test(options.url)) {
        options.url = config.baseUrl + options.url
    }
	var tt = uni.getStorageSync('info')
    return new Promise((resolve, reject) => {		
        axios.request(options).then(res => {
            if (res.data.code == 0 && !res.data.msg.indexOf('token无效')) {
				uni.reLaunch({
					url: '/pages/login/index'
				})
            }else if(res.data.data.type == 1 && res.data.msg == '注册成功'){
                uni.showToast({ title: res.msg, icon: "none" })
                store.commit('loginIn', { 
                    token : res.data.data.token, 
                    Authorization: res.data.data.Authorization,
                    userInfo: res.data.data.userInfo
                })
				setTimeout(function(){
					uni.reLaunch({
						url: '/pages/basicInformation'
					})
				}, 1500)
			} else if(res.data.data.type == 0 && res.data.data.userinfo.email == null){
                store.commit('loginIn', { 
                    token : res.data.data.token, 
                    Authorization: res.data.data.Authorization,
                    userInfo: res.data.data.userInfo
                })
				uni.redirectTo({
					url: '/pages/basicInformation'
				})
            } else{
				resolve(res.data)
			}
        }, error => {
            reject(error)
        })
    })
}