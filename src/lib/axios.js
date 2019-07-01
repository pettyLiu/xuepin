import axios from 'uni-request'
import config from '@/lib/config'
import store from '@/store/index'

const Qs = require('qs')
axios.defaults.baseURL = ''
console.log(axios)
axios.interceptors.request.use(config => {
	console.log(config)
	config.headers['valToken'] = '4542'
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
        options.data = Qs.stringify(options.data)
    }
    if (!/json/.test(options.url)) {
        options.url = config.baseUrl + options.url
    }
    return new Promise((resolve, reject) => {		
        axios.request(options).then(res => {
			console.log(res)
            if (res.data.code == 503 || res.data.msg == 'token过期') {
				uni.redirectTo({
					url: '/pages/login/index'
				})
                // store.state.currRouter.instance.push({ name: 'login' })
            }else if(false){
				uni.redirectTo({
					url: '/pages/basicInformation'
				})
			} else {
                resolve(res.data)
            }
        }, error => {
            reject(error)
        })
    })
}