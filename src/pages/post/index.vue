<template>
    <view class="post">
        <text class="list" @click="toFull">新增全职职位</text>
        <text class="list" @click="toPart">新增兼职职位</text>
    </view>
</template>

<script>
export default {
    name: 'post',
    data () {
        return {
        }
    }, 

    components: {},

    computed: {},

    methods: {
        toFull () {
            uni.navigateTo({
                url: '/pages/post/fullPost'
            })
        },
        toPart () {
            uni.navigateTo({
                url: '/pages/post/partPost'
            })
        }
    }
}

</script>
<style lang='less' scoped>
.list{
    background: white;
    display: block;
    line-height: 184upx;
    height: 184upx;
    width: 100%;
    margin-bottom: 72upx;
    text-align: center
}
</style>
