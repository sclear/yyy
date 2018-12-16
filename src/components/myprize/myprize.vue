<template>
    <div class="myprize">
        <j-bg @backhome="backhome" :titleName='titleName'>
            <div slot="contents">
                <div class="Prize-continaer">
                    <div class="prize-detail" v-for="(item,index) in list" :key='index'>
                        <div class="first-prize">
                            <div class="prize-img">
                                <img :src="$url+item.logo" alt="">
                            </div>
                        </div>
                        <div>
                            <div class="prizes">{{item.goods}}</div>
                            <div class="getDate"><span>请在活动结束前领取</span></div>
                        </div>
                        <div id="getP" v-if="item.isexchange === '0'">
                            <div @click="exchangePrize(index)" class="getPrize">立即领取</div>
                        </div>
                        <div id="getP" v-if="item.isexchange === '1'">
                            <div class="getPrize afterEcchange">已兑换</div>
                        </div>
                    </div>
                    <!-- <jPrizedetail v-for="(item,index) in list" :key='index' :item='item' :index='index'></jPrizedetail> -->
                </div>
            </div>
        </j-bg>
        <!-- 填写地址 领取奖品=> 提交成功-->
        <j-adress @backhome='backhome' :PrizeObj='PrizeObj' v-if="adress" @closeAllmodel='closeAllmodel'></j-adress>

    </div>
</template>

<script>
import { myPrize } from "./../../util.js/baseUrl.js";
import { imgUrl } from "./../../util.js/img.js";

import jConpup from "./popupprize/conpup";
import jAdress from "./popupprize/adress";
import jPrizedetail from "./prizedetail/prizedetail";
import jBg from "./../gettime/bg/bg";
export default {
    data() {
        return {
            adress: false, //地址 model
            titleName: imgUrl.myprize, //title名 图片(我的奖品)
            list: [],
            PrizeObj: {} //单个奖品信息
        };
    },
    components: {
        jBg,
        jPrizedetail,
        jAdress,
        jConpup
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            myPrize({ id: this.$store.state.id }).then(res => {
                // console.log(res);
                this.list = res.data.data;
            });
        },
        closeAllmodel() {
            this.getInfo()
            this.adress = !this.adress;
        },
        //兑换奖品
        exchangePrize(index) {
            this.adress = true;
            this.PrizeObj = this.list[index];
        },
        backhome() {
          this.$emit('backHome',0)
      }
    }
};
</script>

<style scoped >

.Prize-continaer {
    box-sizing: border-box;
    overflow: scroll;
    height: 81vh;
    margin-top: 5vh;
    width: 100%;
    /* padding-top: 1rem; */
}

.prize-detail {
    position: relative;
    width: 100%;
    height: 3.5625rem;
    background: url("./../../../static/img/prizedetail.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 0.625rem;
}
.prize-detail > div {
    float: left;
}
.first-prize {
    width: 3.125rem;
}
.prize-img {
    height: 3.125rem;
    width: 100%;
    border-radius: 0.625rem;
    margin: 0.21875rem auto auto 0.3125rem;
}
.prize-img > img {
    width: 100%;
    max-height: 100%;
}
.prizes {
    text-align: left;
    font-size: 0.75rem;
    color: rgb(83, 83, 84);
    margin: 0.5rem auto auto 0.9375rem;
}
.getDate {
    text-align: left;
    font-size: 0.5625rem;
    color: rgb(83, 83, 84);
    margin: 0.5rem auto auto 0.9375rem;
}
.getPrize {
    font-size: 0.5625rem;
    color: rgb(255, 255, 255);
    height: 1.625rem;
    width: 4.875rem;
    background-color: #fdbe39;
    border-radius: 0.8125rem;
    margin-top: 0.8125rem;
    line-height: 1.625rem;
    text-align: center;
}
.afterEcchange {
    margin-top: 1rem;
    background-color: #909399;
}
#getP {
    position: absolute;
    right: 0.5rem;
}
</style>
