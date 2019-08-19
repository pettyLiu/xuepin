<template>
	<view class="mealPage">
		<view class="lists" :class="activeIndex == index?'active':''" v-for="(item, index) in lists" 
		:key="index" @click="chooseMeal(index)">
			<text class="name">{{item.name}}</text>
			<view class="f_24 c_666">
				<rich-text :nodes="item.desc"></rich-text>
			</view>
			<text class="price globelColor f_52">{{item.price}}<text class="f_26">元</text></text>
		</view>
		<view class="btns row just_btw ali_center">
			<text>共计：<text class="globelColor f_30">{{money}}元</text></text>
			<text class="btn">立即购买</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'meal',
		data() {
			return {
				activeIndex: 0,
				lists: [],
				money: 0
			};
		},
		methods:{
			getList () {
				const that = this
				that.$axios({
					url: 'api/user/showVipService',
					method: 'post',
				}).then(res => {
					that.lists = res.data
					that.money = res.data[0].price
				})
			},
			chooseMeal (index) {
				this.activeIndex = index
				this.money = this.lists[index].price
			},

		},
		onLoad () {
			this.getList()
		},
		computed:{
		},
	}
</script>

<style lang="less">
@import url("../../style/company/meal.less");
</style>
