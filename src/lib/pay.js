export function getProvider(){
	console.log('come in')
	uni.getProvider({
	    service: "payment",
	    success: (e) => {
	        console.log("payment success:" + JSON.stringify(e));
	        let providerList = [];
	        e.provider.map((value) => {
	            switch (value) {
	                case 'alipay':
	                    providerList.push({
	                        name: '支付宝',
	                        id: value
	                    });
	                    break;
	                case 'wxpay':
	                    providerList.push({
	                        name: '微信',
	                        id: value
	                    });
	                    break;
	                default:
	                    break;
	            }
	        })
	        return providerList;
	    },
	    fail: (e) => {
	        console.log("获取支付通道失败：", e);
	    }
	});
}