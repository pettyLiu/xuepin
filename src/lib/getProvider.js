export function getProvider(){ // 支付
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
export function getShareProvider(){ // 分享
	uni.getProvider({
	    service: "share",
	    success: (e) => {
	        console.log("share success:" + JSON.stringify(e));
	        let providerList = [];
	        e.provider.map((value) => {
	            switch (value) {
	                case 'sinaweibo':
	                    providerList.push({
	                        name: '微博',
	                        id: value,
							icon: ''
	                    });
	                    break;
					case 'qq':
						providerList.push({
							name: 'QQ',
							id: value,
							icon: 'icon-qq'
						});
						break;
	                case 'weixin':
	                    providerList.push({
	                        name: '微信',
	                        id: value,
							icon: 'icon-weixin'
	                    });
	                    break;
	                default:
	                    break;
	            }
	        })
	        return providerList;
	    },
	    fail: (e) => {
	        console.log("获取分享通道失败：", e);
	    }
	});
}