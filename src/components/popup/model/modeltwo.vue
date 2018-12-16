<template>
    <div ref="shaowT" class="zhezao">
        <div class="bindphone animated rollIn" :class="bgNum">
            <div class="bind-title" ref="mtTiltle">
                <img v-if="title === 1" width="80" src="./../../../../static/img/lq.png" alt="">
                <img v-if="title === 2" width="157" src="./../../../../static/img/nowin.png" alt="">
                <img v-if="title === 3" width="157" src="./../../../../static/img/get3.png" alt="">
            </div>
            <slot name='modeltwo'></slot>
            <div class="close" @click='closeAllmodel'>
                <img width="31" src="./../../../../static/img/xxx.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bgNum: ""
        };
    },
    props: {
        title: Number
    },
    mounted() {
        this.$refs.shaowT.style.height = this.$store.state.wHeight + "px";
        switch (this.$store.state.thems) {
            case "0":
                this.bgNum = "sd";
                break;
            case "1":
                this.bgNum = "yd";
                this.$refs.mtTiltle.style.marginTop = '4.4rem';
                break;
            case "2":
                this.bgNum = "cj";
                this.$refs.mtTiltle.style.marginTop = '4.5rem';
                break;
            case "3":
                this.bgNum = "ld";
                this.$refs.mtTiltle.style.marginTop = '5rem';
                break;
            case "4":
                this.bgNum = "dw";
                break;
            case "5":
                this.bgNum = "zq";
                this.$refs.mtTiltle.style.marginTop = '6.2rem';
                break;
            case "6":
                this.bgNum = "gq";
                this.$refs.mtTiltle.style.marginTop = '6.2rem';
                break;
            case "7":
                this.bgNum = "zdy";
                this.$refs.mtTiltle.style.marginTop = '4rem';
                break;
        }
    },
    methods: {
        closeAllmodel() {
            this.$emit("closeAllmodel");
        }
    }
};
</script>

<style scoped >
/* 
1  ydm
*/

.ymd {
    /* margin-bottom: 20px; */
    margin-top: 4.5rem !important;
}
.sd {
    background-image: url("./../../../assets/model2/sd.png");
}
.yd {
    background-image: url("./../../../assets/model2/yd.png");
}
.cj {
    background-image: url("./../../../assets/model2/cj.png");
}
.ld {
    background-image: url("./../../../assets/model2/ld.png");
}
.dw {
    background-image: url("./../../../assets/model2/dw.png");
}
.zq {
    background-image: url("./../../../assets/model2/zq.png");
}
.gq {
    background-image: url("./../../../assets/model2/gq.png");
}
.zdy {
    background-image: url("./../../../assets/model2/zdy.png");
}

.zhezao {
    position: absolute;
    top: 0;
    left: 0;
    /* height: 100vh; */
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.384);
    z-index: 40;
}
.bindphone {
    position: absolute;
    top: 10%;
    width: 19.375rem;
    height: 26.875rem;
    left: 50%;
    margin-left: -9.6875rem;
    letter-spacing: 0.0625rem;
    z-index: 999;
    /* background-image: url("./../../../../static/img/model2.png"); */
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
/* 关闭按钮 */
.close {
    font-size: 2.5rem;
    position: absolute;
    color: white;
    bottom: -4.375rem;
    left: 50%;
    margin-left: -1.25rem;
}
/* content */
.bind-title {
    font-size: 1.125rem;
    color: rgb(253, 253, 253);
    margin-top: 5.3rem;
}
.modelImg {
    /* transform: scale(0.5); */
}
</style>
