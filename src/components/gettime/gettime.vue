<template>
    <div>
        <j-bg @backhome="backhome" class="gettime" :titleName='titleName'>
            <div slot="contents" class="soter">
                <div class="buyGroup">
                    <!-- <div :class="exchange === true?'changeColor':''" @click='change(true)'>积分兑换</div>
                    <div :class="exchange === false?'changeColor':''" @click='change(false)'>购买次数</div> -->
                    <div :class="exchange === true?'changeColor':''">
                        <img v-if="exchange === true" width="70" src="./../../../static/img/a1.png" alt="">
                        <img v-if="exchange === false" width="47" src="./../../../static/img/a2.png" alt="">
                    </div>
                    <!-- <div :class="exchange === false?'changeColor':''">
                        <img v-if="exchange === false" width="70" src="./../../../static/img/b1.png" alt="">
                        <img v-if="exchange === true" width="47" src="./../../../static/img/b2.png" alt="">
                    </div> -->
                </div>
                <div>
                    <img class="hr-img" :class="exchange === true?'rotateHr':''" src="./../../../static/img/linear.png" alt="">
                </div>

                <!-- 积分兑换 -->
                <div v-if="exchange">
                    <div v-if="this.$store.state.exchange == 1" class="flex-jifen">
                        <div>
                            <img width="15" src="./../../../static/img/jifen.png" alt="">
                        </div>
                        <div class="jifen-count">{{integral}}</div>
                    </div>
                    <div v-if="this.$store.state.exchange == 1" class="win-jifen">
                        参与抽奖,获取积分
                    </div>
                    <div v-if="this.$store.state.exchange == 1">
                        <input v-model="excInt" class="inp" type="text" placeholder="输入您兑换的次数">
                    </div>

                    <div v-if="this.$store.state.exchange == 1" @click="excScs" class="ljbind mtdh">
                        <img width="65" src="./../../../static/img/ljdh.png" alt="">
                    </div>

                    <div v-if="this.$store.state.exchange == 1" class="dhRule">
                        积分兑换规则
                    </div>
                    <div v-if="this.$store.state.exchange == 1" class="tl"><span class="j-radius">●</span> 按比例兑换,{{exchange_rules}}个积分兑换一次摇奖数;</div>
                    <div v-if="this.$store.state.exchange == 1" class="tl"><span class="j-radius">●</span> 在此次积分兑换活动中,每个用户最多只能使用{{exchange_limit}}积分,兑换摇奖次数,超出兑换上限则不能再次兑换;</div>
                    <div v-if="this.$store.state.exchange == 0" class="tl"><span class="j-radius">●</span>本次活动不支持积分兑换</div>

                </div>
                <!-- 购买积分 -->
                <div v-if="!exchange">
                    <div v-if="this.$store.state.purchase == 1">
                        <input v-model="buycounts" class="inp mtbuy" type="text" placeholder="输入您购买的次数(1-1000)">
                    </div>
                    <div v-if="this.$store.state.purchase == 1" class="fs10">{{saleMoney}}元兑换一次抽奖机会</div>

                    <div @click="buybuycount" v-if="this.$store.state.purchase == 1" class="ljbind buyTop">
                        <img width="65" src="./../../../static/img/ljdh.png" alt="">
                    </div>
                    <div v-if="this.$store.state.purchase == 1" class="dhRule mtm">
                        推荐购买
                    </div>
                    <div v-if="this.$store.state.purchase == 1" class="buyJf-scoll">
                        <div>
                            <div class="buy-menu">
                                <j-buyfen @buycount='buycount' v-for="(item,index) in buyCount" :key='index' :index='index' :item='item'></j-buyfen>
                            </div>
                        </div>
                    </div>
                    <div v-if="this.$store.state.purchase == 0" class="tl"><span class="j-radius">●</span>本次活动不支持购买</div>
                </div>
            </div>

        </j-bg>
        <!-- 1=>兑换成功  else=>购买成功-->
        <j-dsuccse @backhome='backhome' v-if="gAndbuy" :dGou='dGou' @closeAllmodel='closeAllmodel'></j-dsuccse>
    </div>
</template>

<script>
import {
    getLookup,
    getBuy,
    getExch,
    purchase,
    hand
} from "./../../util.js/baseUrl.js";
import { imgUrl } from "./../../util.js/img.js";
import { Toast } from "vant";
import jDsuccse from "./popuptime/exsuccessful";
import jBuyfen from "./bg/buyfen";
import jDuihuanquan from "./bg/duiquan";
import jBg from "./bg/bg";
export default {
    data() {
        return {
            titleName: imgUrl.gettime,
            exchange: true, //积分兑换页面
            buyJf: false, //购买积分
            buyCount: [],
            gAndbuy: false, //兑换 购买 model
            dGou: 1, //model   1=>兑换成功 else=>购买成功
            exchange_rules: this.$store.state.exchange_rules,
            exchange_limit: this.$store.state.exchange_limit,
            integral: 0, //自身的积分
            excInt: "", //购买数量
            buycounts: ""
        };
    },
    mounted() {
        this.getInfo();
        getBuy().then(res => {
            if (res.status === 200) {
                this.buyCount = res.data.data;
            }
        });
    },
    methods: {
        getInfo() {
            getLookup({
                id: this.$store.state.id,
                tel: this.$store.state.tel
            }).then(res => {
                if (res.data.data.integral === null) {
                    this.integral = 0;
                    return
                }
                this.integral = res.data.data.integral;
            });
        },
        //控制兑换 or 购买
        change(res) {
            this.exchange = res;
        },
        closeAllmodel() {
            this.gAndbuy = false;
        },
        //积分兑换次数
        excScs() {
            var y = String(this.excInt).indexOf(".")
            if(y !== -1) return
            if(!this.excInt || this.excInt < 1) return
            if (this.integral < this.excInt * this.exchange_rules) {
                //高于自身积分限制
                Toast.fail('积分不足');
                return;
            }
            let obj = {
                id: this.$store.state.id,
                tel: this.$store.state.tel,
                sum: Number(this.excInt)
            };
            getExch(obj).then(res => {
                if (res.status === 200) {
                    if (res.data.msg === "兑换额度不足") {
                        Toast.fail(res.data.msg);
                        return;
                    }
                    this.gAndbuy = true;
                    this.dGou = 1;
                    this.getInfo();
                }
            });
        },
        //rmb购买次数
        buycount(res) {
            let obj = {
                id: this.$store.state.id,
                tel: this.$store.state.tel,
                sale: this.buyCount[res].id
            };
            purchase(obj).then(res => {
                this.gAndbuy = true;
                this.dGou = 2;
            });
        },
        //单次购买
        buybuycount() {
            let num = /^[0-9]*[1-9][0-9]*$/.test(Number(this.buycounts));
            if(!num)return
            if(Number(this.buycounts) > 1000){
                Toast.fail('购买失败');
                return
            }
            let obj = {
                sum: Number(this.buycounts),
                id: this.$store.state.id,
                tel: this.$store.state.tel
            };
            hand(obj).then(res => {
                if (res.data.msg === "购买成功") {
                    this.gAndbuy = true;
                    this.dGou = 2;
                }
            });
        },
        backhome() {
          this.$emit('backHome',0)
      }
    },
    components: {
        jBg,
        jDuihuanquan,
        jBuyfen,
        jDsuccse
    },
    computed: {
        saleMoney() {
            return this.$store.state.Purchase_price
        }
    }
};
</script>

<style scoped >
.buyGroup {
    margin-top: 3.125rem;
}
.buyGroup div {
    width: 50%;
    float: left;
    font-size: 0.75rem;
}
.hr-img {
    width: 115%;
}
.flex-jifen {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    line-height: 2.1875rem;
    margin-top: 0.8rem;
}
.flex-jifen div {
    margin-left: 0.9375rem;
}
.jifen-count {
    color: rgb(222, 192, 120);
    font-size: 1.5rem;
}
.win-jifen {
    font-size: 0.875rem;
    margin: 0.5rem 0 2rem 0;
}
.mt17 {
    margin-top: 1.0625rem;
}
.dhq-socll {
    width: 100%;
    height: 52.5vh;
    overflow: scroll;
}
/* 购买积分 */
.buyJf-scoll {
    height: 43vh;
    width: 100%;
    overflow: scroll;
}
.buy-menu {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.buy-menu:after {
    content: "";
    flex: auto;
}

/* 点击逻辑变换 */
.rotateHr {
    transform: rotatey(180deg);
    margin-left: -3.5rem;
}
.changeColor {
    font-size: 0.9375rem;
    color: rgb(222, 192, 120);
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

/* 修改 */
.dhRule {
    margin-top: 1.875rem;
    width: 100%;
    height: 1.875rem;
    background-image: url("./../../assets/modify/x.png");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 0.625rem;
    color: #f9dc8e;
}
.mtm {
    margin-top: 0.625rem;
}
.tl {
    width: 95%;
    text-align: left;
    margin-left: 2.5%;
    font-size: 0.75rem;
    text-indent: -0.75rem;
    color: #535354;
    line-height: 1.4375rem;
}
.tl:first-child {
    margin-top: 1.875rem;
}
.j-radius {
    color: red;
    font-size: 0.625rem;
}
.inp {
    font: icon !important;
    border-radius: 0.375rem;
    border: none;
    background-color: #f9dc8e;
    width: 100%;
    height: 2.375rem;
    padding-left: 1.25rem;
    box-sizing: border-box;
}
.inp::-webkit-input-placeholder {
    color: white;
    font-size: 0.75rem;
    text-align: left;
}
.mtdh {
    margin-top: 1.875rem;
}
/* buy modify */
.mtbuy {
    margin-top: 1.25rem;
}
.fs10 {
    margin-top: 0.3125rem;
    font-size: 0.625rem;
    text-align: right;
    color: #535354;
}
.buyTop {
    margin-top: 0.3125rem;
}
</style>
