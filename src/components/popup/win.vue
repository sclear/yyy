<template>
    <j-mdeltwo :title='title' @closeAllmodel='closeAllmodel'>
        <div slot="modeltwo">
            <div class="priImg">
                <img :src="$url+prizeLogo" alt="">
            </div>
            <div class="mtprize">
                <img width="84" src="./../../../static/img/gxn.png" alt="">
            </div>
            <div class="winP">
                成功摇到了一个奖品耶
            </div>
            <div @click="toMyprize" class="ljbind">
                <img width="65" src="./../../../static/img/lq.png" alt="">
            </div>
        </div>
    </j-mdeltwo>
</template>

<script>
import jMdeltwo from "./model/modeltwo";
export default {
    data() {
        return {
            title: 1
        };
    },
    props: {
        prizeLogo:String
    },
    components: {
        jMdeltwo
    },
    methods: {
        closeAllmodel() {
            this.$emit("closeAllmodel");
        },
        toMyprize(){
            this.$emit("closeAllmodel");
            this.$emit('backHome',2)
            // this.$router.push({path:'/myprize'})
        }
    }
};
</script>

<style scoped >
.winPriimg{
    width:4.9375rem;
}
.priImg {
    width: 6.375rem;
    margin: 2rem auto 0 auto;
}
.priImg img {
    max-height: 6.375rem;
    max-width: 6.375rem;
}
.mtprize {
    margin-top: 0.8rem;
}
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 1.25rem;
}
.winP {
    font-size: 0.75rem;
    margin-top: 1.25rem;
}
</style>
