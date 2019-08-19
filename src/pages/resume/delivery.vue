<template>
    <view>
        <postList :list="list"></postList>
    </view>
</template>

<script>
import postList from '@/components/postList'
export default {
    data () {
        return {
            list: [1,2]
        }
    },
    methods: {
        getList () {
            const that = this
            that.$axios({
                url: '',
                method: 'post'
            }).then(res => {
                if(res.code == 1){
                    that.list = res.data
                }
            })
        }
    },
    onLoad(){
        this.getList()
    },
    components: {
        postList
    },

    computed: {},

}

</script>
<style lang='less' scoped>
</style>
