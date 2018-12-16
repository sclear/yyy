<template>
    <j-mdeltwo :title='title' @closeAllmodel='closeAllmodel'>
        <div slot="modeltwo">
            <div class="priImg">
                <img src="./../../../static/img/get2.png" alt="">
            </div>
            <div class="mtprize">
                <img width="84" src="./../../../static/img/nowin1.png" alt="">
            </div>
            <div class="winP">
                今日免费抽奖次数用完了哦
            </div>
            <div @click="toGettime" class="ljbind">
                <img width="65" src="./../../../static/img/getc1.png" alt="">
            </div>
        </div>
    </j-mdeltwo>
</template>

<script>
import jMdeltwo from "./model/modeltwo";
export default {
    data() {
        return {
            title: 3
        };
    },
    components: {
        jMdeltwo
    },
    methods: {
        closeAllmodel() {
            this.$emit("closeAllmodel");
        },
        toGettime() {
            // alert('11')
            this.$emit('backHome',1)
            this.$emit("closeAllmodel");
            // this.$router.push({path: '/gettime'})
        }
    }
};
</script>

<style scoped >
.priImg {
    width: 8.4375rem;
    margin: 2.25rem auto 0 auto;
}
.priImg img {
    max-width: 8.4375rem;
}
.mtprize {
    margin-top: 0.6rem;
}
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 1rem;
}
.winP {
    font-size: 0.75rem;
    margin-top: 1.25rem;
}
</style>
