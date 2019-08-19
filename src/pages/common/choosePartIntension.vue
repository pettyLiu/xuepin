<template>
	<view class="chooseIntension" v-if="list">
        <view class="content">
            <view class="contentList" v-for="(item, index) in list" :key="index" >
                <text class="contentTxt" :class="{active: item.check}" 
                @click="changeActive(index)">{{item.name}}</text>
            </view>
        </view>
		<view class="btn row ali_center just_btw">
			<text class="reset" @click="reset()">重置</text>
			<text class="comfirm" @click="comfirm()">确定</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'chooseIntension',
		data() {
			return {
				limit: 3,
                choose:'',
                list: [],
                checks: []
			};
		},
		methods:{
            changeActive (index) {
                if(this.list[index].check){
                    this.list[index].check = false
                    for(var i=0;i<this.checks.length;i++){
                        if(this.list[index].name == this.checks[i].name){
                            this.checks.splice(i, 1)
                            break
                        }
                    }
                }else{
                    console.log(this.checks)
                    if(this.checks.length>this.limit -1){
                        uni.showToast({ title: '最多选择'+this.limit+'项', icon: 'none' })
                    }else{
                        this.list[index].check = true
                        this.checks.push(this.list[index])
                    } 
                }
                console.log(this.intension)
                this.$forceUpdate()
            },
            getIntension () {
                const that = this
                that.$axios({
                    url: 'api/base/oneJob',
                    method: 'get',
                    data: {
                        type: 2
                    }
                }).then(res =>{
                    that.list = res.data
                    for(var i=0;i<that.checks.length;i++){
                        for(let j=0;j<that.list.length;j++){
                             if(that.list[j].name == that.checks[i].name){
                                that.list[j].check = true
                                break
                            }
                        }
                       
                    }
                })
            },
            reset () {
                this.checks = []
                for(var i=0; i<this.list.length; i++){
                    this.list[i].check = false
                    this.$forceUpdate()
                }
            },
            comfirm () {
                this.$store.commit('changeIntentsion', this.checks)
			    uni.navigateBack()
            }
		},
		computed: {
            intension () {
				return this.$store.state.fullTime.intentsion
			}
		},
		onLoad(options){
            console.log(this.intension)
            this.checks = this.intension 
            this.getIntension()
            if(options.limit){
                this.limit = options.limit
            }
		},
		components:{

		}
	}
</script>

<style lang="less">
@import '../../style/common/mixin.less';
	.chooseIntension{
        height: 100%;
        		.content{
			display: flex;
			flex-wrap: wrap;
			.contentList{
				width: 50%;
				text-align: center;
				height: 70upx;
				padding: 10upx 0;
				.contentTxt{
					height: 100%;
					line-height: 70upx;
					width: 90%;
					display: inline-block;
					background: #efefef;
					border-radius: 4upx
				}
			}
			.active{
				background: @g_color !important;
				color:white
			}
		}
    }
    .btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: calc(100% - 68upx);
        z-index: 100;
        padding: 20upx 34upx;
        border-top: @g_border;
        background: white;
        .reset{
            .wh(78upx,196upx);
            border-radius: 12upx;
            background: #e0e0e0;
            text-align: center;
            line-height: 78upx
        }
        .comfirm{
            .wh(78upx,426upx);
            border-radius: 12upx;
            background: @g_color;
            text-align: center;
            line-height: 78upx;
            color:white;
        }
    }
</style>
