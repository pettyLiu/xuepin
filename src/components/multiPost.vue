<template>
	<view class="area ">
		<view class="top row ali_center">
			<text class="list globelColor" v-for="(item, index) in choose" :key="index">
				{{item.name}}
				<text class="iconfont icon-del" @click="del(index)"></text>
			</text>
			<text class="c_999 f_24 tips" v-if="choose.length == 0">请选择期望职位！</text>
		</view>
		<view class="content row" v-if="lastId!=''">
			<scroll-view scroll-y="true" class="areaLeft column">
				<view class="areaItem"  v-for="(item, index) in topCategory"
				:key="index" :class="{active: categoryId == item.id}" @click="showNext(index, item.id)">{{item.name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaCenter column">
				<view class="areaItem" v-for="(item, index) in area" :key="index" 
				@click="changeTwo(index, item.id)" :class="{active: areaId == item.id}">{{item.name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="areaRight">
				<view class="areaItem" v-for="(item, index) in last" :key="item.id" 
				:class="{active: item.checked}" @click="chooseIntension(item, item.id, index)">{{item.name}}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'post',
		data () {
			return{
				area: ['零售'],
				subArea: '',
				activeArea: 0,
				thirActiveArea: 0,
				choose: [],
				last: '',
				area: '',
				topCategory: '',
				alias: 'full_rec',
				areaId: '',
				lastId: '',
			}
		},
		props:['limit'],
		mounted() {
			console.log(this.intension)
			this.choose = this.intension
			this.getArea()
		},
		methods:{
			moveHandle () {
			},
			del (index) {	
				for(let j=0; j< this.last.length; j++){
					if(this.choose[index].name == this.last[j].name){
						this.last[j].checked = false
						break;
					}
				}
				this.choose.splice(index, 1)
			},			
			getArea () {
				const that = this
				that.$axios({
					url: 'api/base/oneJob',
					data: {
						type: that.alias == 'full_rec' ? 1 : 2
					}
				}).then(res => {
					that.topCategory = res.data
					const category = that.$store.state.category
					console.log(category)
					if(category){
						if (that.alias == 'full_rec'&& category.alias=='full_rec') { // 全职
							that.categoryId = category.parent_id
							that.areaId = category.id
						}else{ // 兼职
							that.areaId = category.id
						}
					}else{
						that.categoryId = res.data[0].id
					}	
					that.showNext(0, that.categoryId)
				})
			},
			showNext (index, id) {
				const that = this
				that.activeArea = 0
				that.$axios({
					url: 'api/base/twoJob',
					data: {
						id: id
					}
				}).then(res => {
					that.area = res.data
					if(that.alias == 'full_rec'){
						that.areaId = res.data[0].id
						that.showLast(that.areaId)
					}					
				})
				this.categoryId = id	
			},
			showLast (id) { // 第三级
				const that = this
				that.$axios({
					url: 'api/base/twoJob',
					data: {
						id: id
					}
				}).then(res => {
					that.last = res.data
					that.lastId = res.data[0].id
					for(let i = 0; i< that.choose.length; i++){
						for(let j=0; j< that.last.length; j++){
							if(this.choose[i].name == that.last[j].name){
								that.last[j].checked = true
								this.choose[i].id = that.last[j].id
								break;
							}
						}
					}	
				})
			},
			changeTwo (index, id) {
				this.areaId = id
				this.showLast(id)
			},
			chooseIntension (name, id, index) {				
				this.lastId = id
				if(this.last[index].checked){
					this.last[index].checked = false
					for(let i = 0; i< this.choose.length; i++){
						if(this.choose[i].name == this.last[index].name){
							this.choose.splice(i, 1)
							break;
						}
					}	
				}else{
					if(this.choose.length<this.limit){
						this.last[index].checked = true
						this.choose.push(name)
					}else{
						uni.showToast({title: '最多只能选择' + this.limit + '个期望职位', icon: 'none'});
					}
				}
			},
		},
		
		watch:{
			choose(val, oldval){
				this.$emit('choose', val)
			}
		},
		computed: {
			intension () {
				return this.$store.state.fullTime.intentsion
			}
		}
	}
</script>

<style lang="less">
	@import '../style/common/mixin.less';
	uni-page-body{
		height: 100%}
	.area,.content{
		height: 100%;
		.top{
			width: 100%;
			min-height: 80upx;
			padding: 20upx 0 ;
			background: white;
			border-bottom: @g_border;
			flex-wrap: wrap;
			.list{
				.h(52upx, 52upx, center);
				// width: 152upx;
				padding: 6upx;
				background: #f4f4f4;
				margin: 0 0 20upx 32upx;
				position: relative;
				.icon-del{
					position: absolute;
					top: -20upx;
					right: 0;
					font-size: 14upx
				}
			}
			.tips{
				padding-left: 32upx
			}
		}
		.areaLeft,.areaCenter,.areaRight{
			width: 25%;
			height: calc(100% - 130upx);
			background: #f4f4f4;
			z-index: 4;
			padding-bottom: 130upx;
			.areaItem{
				.h(120upx,120upx,center);
			}
			.active{
				color: @g_color
			}
		}
		.areaCenter{
			width: 32%;
			background: white;
			border-right: @g_border;
		}
		.areaRight{
			width: 43%;
			background: white;
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
	}
</style>
