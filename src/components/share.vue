<template>
	<view class="masks" v-if="showMask">
		<view class="bg" @touchmove.stop.prevent="moveHandle"></view>
		<view class="mask column f_30">
			<view class="row just_arw">
				<view class="list column center" v-for="(item, index) in providerList" :key='index' @click="share(item)">
					<text class="iconfont" :class="item.icon"></text>
					<text class="">{{item.name}}</text>
				</view>
			</view>
			<text class="btn" @click="cancel">取消</text>
		</view>
	</view>
</template>

<script>
	import { getProvider } from '@/lib/getProvider.js'
	export default{
		name: 'share',
		props: ['showMask'],
		data(){
			return{
				providerList: '',
			}
		},
		methods:{
			cancel () { // 隐藏遮罩层
			    this.$emit('cancel')
			},
			share (data, index) { // 分享
				uni.share({
					provider: data.name,
					type: 1,
					summary: "分享微信！",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			moveHandle(){},
		},
		mounted(){
			this.providerList = getProvider()
			this.providerList=[{name: '微信', id: 1, icon:'icon-weixin'},{name: 'QQ',id: 3, icon:'icon-qq'}] //测试用
		}
	}
</script>

<style lang="less">
	@import '../style/common/mixin.less';
	.masks{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		.bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.2);
		}
		.mask{
			position: absolute;
			height: 280upx;
			width: 100%;
			bottom: 0;
			background: white;
			z-index: 10;			
			.list{
				.wh(100%, 33.33%);
				margin-bottom: 20upx;
				.iconfont{
					font-size: 72upx;
					margin: 20upx 0
				}
			}
			image{
				.wh(136upx,190upx);
			}
			.btn{
				.wh(88upx,100%);
				line-height: 88upx;
				text-align: center;
				border-top: @g_border
			}
		}
	}
</style>
