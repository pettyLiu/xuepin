<template>
	<view class="goldRecharge">
		<view class="bg"></view>
		<view class="content">
			<view class="top">
				<text>充值数量</text>
				<input type="number" value="" placeholder="请输入充值金币数量" placeholder-class="placeholder" @input="changeNum"/>
				<text class="tips f_20">金币和现金的比列是  1：{{Beliel}}</text>
			</view>
			<view class="border row just_btw ali_center">
				<text class="cir1"></text>
				<text class="line" v-for="item in 8"></text>
				<text class="cir"></text>
			</view>
			<view class="footer column">
				<text>需要支付现金</text>
				<text class="f_48 num">{{pay}}（元）</text>
			</view>
			<view class="types">
				<text class="f_24">选择支付方式</text>
				<radio-group name="radio" class="column" @change="radioChange">
					<label class="row just_btw type" v-for="(item,index) in providerList" :key="index">
						<text><text class="iconfont " :class="item.name=='支付宝' ? 'icon-z-alipay' : 'icon-weixin2'"></text>{{item.name}}</text>
						<radio :value="item.name"  color="#5E57EB"/>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="btn f_36" :class="{ opacity: showBtn }" @click="excharge">确认兑换</view>
	</view>
</template>

<script>
	import { getProvider } from '@/lib/getProvider.js'
	export default {
		name: 'goldRecharge',
		data() {
			return {
				showBtn: false,
				Beliel: 1,
				pay: 0,
				providerList: '',
				checkRadio: ''
			};
		},
		methods: {
			changeNum (e) {
				if (e.detail.value.length > 0) {
					if(this.checkRadio != ''){
						this.showBtn = true
					}
					this.pay = this.Beliel * e.detail.value
				}else {
					this.pay = 0
					this.showBtn = false
				}
			},
			radioChange (e) {
				this.providerList.map((item,index) =>{
					if(item.name == e.detail.value){
						this.checkRadio = index
					}
				})
				if (this.pay > 0) {
					console.log(4565)
					this.showBtn = true
				}
			},
			excharge () { // 确认兑换
				if(this.showBtn){
					console.log(this.providerList[this.checkRadio].name + '支付')
					this.requestPayment(this.providerList[this.checkRadio], this.checkRadio)
				}
			},
			async requestPayment(e, index) {
			    let orderInfo = await this.getOrderInfo(e.id);
			    console.log("得到订单信息", orderInfo);
			    if (orderInfo.statusCode !== 200) {
			        console.log("获得订单信息失败", orderInfo);
			        uni.showModal({
			            content: "获得订单信息失败",
			            showCancel: false
			        })
			        return;
			    }
			    uni.requestPayment({
			        provider: e.id,
			        orderInfo: orderInfo.data,
			        success: (e) => {
			            console.log("success", e);
			            uni.showToast({
			                title: "支付成功！"
			            })
			        },
			        fail: (e) => {
			            console.log("fail", e);
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        },
			        complete: () => {
			            this.providerList[index].loading = false;
			        }
			    })
			},
			getOrderInfo(e) {
			    let appid = "";
			    // #ifdef APP-PLUS
			    appid = plus.runtime.appid;
			    // #endif
			    return new Promise((res) => {
					this.$axios({url:'https://arw.dev.intelgice.com/ucenter/ajaxUserInfo'}).then(result => {
						res(result)
					})
			    })
			},
		},
		onLoad() {
			this.providerList = getProvider()
			this.providerList=[{name: '支付宝',id: 1},{name: '微信',id: 3}] //测试用
		},
		computed: {
		},
	}
</script>

<style lang="less">
	@import url("../../style/user/excharge");
	.goldRecharge{
		.content{
			.footer,.types{
				border-bottom: @g_border;
				padding: 0;
				margin: 32upx
			}
			.types{
				padding-bottom: 30upx;
				.type{
					margin-top: 35upx;
					radio{
						transform:scale(0.7)
					}
					.iconfont{
						margin-right: 22upx;
						vertical-align: middle
					}
					.icon-z-alipay{
						color:skyblue;
						font-size: 26px
					}
					.icon-weixin2{
						color: seagreen;
						font-size: 24px
					}
				}
			}
		}
	}
</style>
