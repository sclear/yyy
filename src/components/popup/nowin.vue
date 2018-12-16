<template>
    <j-mdeltwo :title='title' @closeAllmodel='closeAllmodel'>
        <div slot="modeltwo">
            <div class="priImg">
                <img src="./../../../static/img/ku.png" alt="">
            </div>
            <div class="mtprize">
                <img width="84" src="./../../../static/img/nowin1.png" alt="">
            </div>
            <div class="winP">
                没有摇中奖品,再摇一次吧
            </div>
            <div @click="closeAllmodel" class="ljbind">
                <img width="65" src="./../../../static/img/zyyc.png" alt="">
            </div>
        </div>
    </j-mdeltwo>
</template>

<script>
import jMdeltwo from "./model/modeltwo";
export default {
    data() {
        return {
            title: 2
        };
    },
    components: {
        jMdeltwo
    },
    methods: {
        closeAllmodel() {
            this.$emit("closeAllmodel");
        }
    }
};
</script>

<style scoped >
.priImg {
    width: 6.375rem;
    margin: 2.25rem auto 0 auto;
    margin-top: 3.2rem;
}
.priImg img {
    max-width: 6.375rem;
}
.mtprize {
    margin-top: 1.25rem;
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
