<template>
    <div class="adress">
        <j-modelone @closeAllmodel='closeAllmodel'>
            <div slot="modelone">
                <!-- 填写个人地址 -->
                <div v-if="msgDetail1">
                    <div>
                        <img class="gerenMsg" src="./../../../../static/img/geren.png" alt="">
                        <input v-model="p_name" class="msg-name mtNmae" type="text" placeholder="收货人姓名">
                        <input v-model="p_tel" class="msg-name" type="text" placeholder="收货人手机号">
                    </div>
                    <div class="flexBox">
                        <div @click="OpenThrees(0)" class="msg-name threeS">{{adress_a | adress}}</div>
                        <div @click="OpenThrees(1)" class="msg-name threeS">{{adress_b | adress}}</div>
                        <div @click="OpenThrees(2)" class="msg-name threeS">{{adress_c | adress}}</div>
                    </div>
                    <input v-model="p_adr" class="msg-name" type="text" placeholder="具体街道地址">
                    <div>
                        <div @click="getGoods" class="ljbind mtadress">
                            <img width="65" src="./../../../../static/img/lq.png" alt="">
                        </div>
                    </div>
                </div>

                <!-- 领取wx现金红包 -->
                <div v-if="wxMoney">
                    <img class="yhqSucees" src="./../../../../static/img/lqcg.png" alt="">
                    <div class="money_lq">领取的红包将在规定时间内发放到你填写的微信号中,请注意查看</div>
                    <input v-model="wxmoneys" class="wxId" type="text" placeholder="请填写你的微信号">
                    <div>
                        <div @click="getMoney" class="ljbind money_input">
                            <img width="65" src="./../../../../static/img/ljtj.png" alt="">
                        </div>
                    </div>
                </div>

                <!-- 领取优惠券 -->
                <div v-if="yhqing">
                    <img class="yhqSucees" src="./../../../../static/img/lqcg.png" alt="">
                    <div class="Yhqdetial">
                        <div>
                            <img class="yhq_img" :src="$url+PrizeObj.logo" alt="">
                        </div>
                        <div>
                            <div class="money-yhq">{{Business_name}}</div>
                            <div class="time-yhq">请在活动结束前尽快领取</div>
                        </div>
                    </div>
                    <div class="cdks">
                        <span>CDK码:</span>
                        <input type="text" id="success_form_input" readonly="readonly" v-model="link" />
                        <button class="copyLink" ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">复制</button>
                    </div>

                    <div>
                        <div @click='tijiaoMse' class="ljbind cdsk_sucess">
                            <img width="65" src="./../../../../static/img/ljdh.png" alt="">
                        </div>
                    </div>
                </div>

                <!-- 信息提交成功 -->
                <div v-if="msgDetail2">
                    <div>
                        <img class="sucessMsg" src="./../../../../static/img/msgcg.png" alt="">
                    </div>
                    <div class="seeTo">请注意查看</div>
                    <div class="seeTt">奖品到账情况</div>
                    <div @click='backChoujiang' class="ljbind backC">
                        <img width="65" src="./../../../../static/img/backchou.png" alt="">
                    </div>
                </div>
            </div>
        </j-modelone>

        <!-- 三级联动 -->
        <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import { exchange,exchangeYhq } from "./../../../util.js/baseUrl.js";
import jModelone from "./../../popup/model/modelone";
export default {
    data() {
        return {
            msgDetail1: false, //领取填写地址
            wxMoney: false, //领取微信红包
            yhqing: false, //领取优惠券
            msgDetail2: false, //领取成功提示
            show: false,
            wxmoneys: "", //微信号
            p_name: "",
            p_tel: "",
            p_adr: "",

            actions: [],
            exc: [],
            excs: [],
            adress_a: "省",
            adress_b: "市",
            adress_c: "县",
            change_num: "", //区分三级联动 类型,
            copyBtn: "",
            link: "",   //复制内容
            toUrl:'',   //领奖地址
            Business_name:'',//优惠券名称
        };
    },
    props: {
        PrizeObj: Object
    },
    filters: {
        adress(val) {
            if (val.length > 6) {
                return val.slice(0, 4) + "...";
            }
            return val;
        }
    },
    mounted() {
        //show 积分
        if (this.PrizeObj.type_id === 1) {
            let obj = {
                Prizeid: this.PrizeObj.Prize_id,
                id: this.PrizeObj.id,
                userId: this.$store.state.id
            };
            exchange(obj).then(res => {
                if (res.status === 200) {
                    this.msgDetail2 = true;
                    return;
                }
            });
        }
        //show 微信红包
        if (this.PrizeObj.type_id === 2) {
            this.wxMoney = true;
            return;
        }
        //show 优惠券
        if (this.PrizeObj.type_id === 3) {
            var obj = {
                Prizeid: this.PrizeObj.Prize_id,
                id: this.PrizeObj.id,
                userId: this.PrizeObj.user_id,
            }
            exchangeYhq(obj)
            .then(res=>{
                this.link = res.data.data[0].cdk;
                this.toUrl = res.data.data[0].url;
                this.Business_name = res.data.data[0].Business_name;
            })
            this.yhqing = true;

            //复制功能 异步开启
            var that = this;
            setTimeout(()=>{
                that.copyBtn = new this.clipboard(this.$refs.copy);
            },1000)
            return;
        }
        //show 实物
        if (this.PrizeObj.type_id === 4) {
            this.msgDetail1 = true;
            return;
        }
    },
    components: {
        jModelone
    },
    methods: {
        //提交信息
        tijiaoMse() {
            // alert(this.toUrl)
            // console.log(this.toUrl)
            location.href = this.toUrl
        },
        //返回抽奖
        backChoujiang() {
            this.$emit('backhome')
            // this.$router.push({ path: "/page" });
        },
        //关闭model
        closeAllmodel() {
            this.$emit("closeAllmodel");
        },
        //触发三级联动
        OpenThrees(res) {
            if (res === 0) {
               this.actions = [];
                this.$axios({
                    method: "get",
                    url: "/application/kxk01xyyj_nhqey/h5/static/addressdata.json",
                    dataType: "json",
                    crossDomain: true,
                    cache: false
                }).then(resolve => {

                    for (let index in resolve.data) {
                        this.actions.push(resolve.data[index]);
                    }
                    this.show = true;
                    this.change_num = res;
                    this.adress_b = '市';
                    this.adress_c = '县';
                });
            }
            if (res === 1) {
                this.show = true;
                this.change_num = res;
                this.adress_c = '县';
                this.actions = [];
                for (let index in this.exc) {
                    this.actions.push(this.exc[index]);
                }
            }
            if (res === 2) {
                this.show = true;
                this.change_num = res;
                this.actions = [];
                for (let index in this.excs) {
                    this.actions.push({ name: this.excs[index] });
                }
            }
        },
        //三级联动数据
        onSelect(res) {
            if (this.change_num === 0) {
                this.adress_a = res.name;
                this.exc = res.child;
                // setTimeout(() => {
                //     this.actions = [];
                // }, 500);
            } else if (this.change_num === 1) {
                this.adress_b = res.name;
                this.excs = res.child;
            } else {
                this.adress_c = res.name;
            }
            this.show = false;
        },
        //领取现金红包
        getMoney() {
            let obj = {
                wx: this.wxmoneys,
                Prizeid: this.PrizeObj.Prize_id,
                id: this.PrizeObj.id,
                userId: this.$store.state.id
            };
            exchange(obj).then(res => {
                if (res.status === 200) {
                    this.wxMoney = false;
                    this.msgDetail2 = true;
                }
            });
        },
        //领取实物
        getGoods() {
            if(!this.adress_a || !this.adress_b || !this.adress_c || !this.p_adr || !this.p_name || !this.p_tel){
                // console.log('输入完整信息');
                return
            }
            let obj = {
                name: this.p_name,
                tel: this.p_tel,
                adr: this.adress_a + this.adress_b + this.adress_c + this.p_adr,
                Prizeid: this.PrizeObj.Prize_id,
                id: this.PrizeObj.id,
                userId: this.$store.state.id
            };
            exchange(obj).then(res => {
                if (res.status === 200) {
                    this.msgDetail1 = false;
                    this.msgDetail2 = true;
                }
            });
        },
        //领取优惠券
        getCoupon() {

        },
        //copy link内容
        copyLink() {
            let _this = this;
            let clipboard = _this.copyBtn;
            clipboard.on("success", function() {
                Toast.success('复制成功');
            });
            clipboard.on("error", function() {
            });
        }
    }
};
</script>

<style scoped >
input {
    font: icon !important;
    border-radius: 0.375rem;
    border: none;
    padding-left: 0.9375rem;

    background:no-repeat 0 0 scroll #fff;
    border:none;
    outline:medium;
    border:0.2px solid rgba(136, 136, 136, 0.199);

}
input::-webkit-input-placeholder {
    color: #535354;
    font-size: 0.75rem;
    text-align: left;
}
#success_form_input {
    font: icon !important;
    border-radius: 0.375rem;
    border: none;
    box-shadow: none;
    width: 40%;
    background-color: #f3f3f3;
    padding-left: 0;
    font-size: 12px;

    background:no-repeat 0 0 scroll #fff;
    border:none;
    outline:medium;
    border:0.2px solid rgba(136, 136, 136, 0.199);
}
.copyLink{
    border:none;
    background-color:#f3f3f3;
}
.msg-name {
    height: 2.25rem;
    width: 80%;
    margin-top: 0.4375rem;

    background:no-repeat 0 0 scroll #fff;
    border:none;
    outline:medium;
    border:0.2px solid rgba(136, 136, 136, 0.199);
}
.mtNmae {
    margin-top: 1.875rem;
}
.mt7 {
    margin-top: .4375rem;
}
select {
    width: 30%;
    height: 3.9375rem;
}

.gerenMsg {
    width: 6.5625rem;
    margin-top: 2.3rem;
}
/* bind btn*/
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 1rem;
}
.mtadress{
    margin-top: 1.7rem;
}

/* 提交信息成功 */
.sucessMsg {
    width: 11.0625rem;
    margin-top: 5rem;
}
.seeTo {
    margin-top: 2.8125rem;
}
.seeTt {
    margin-top: 1.25rem;
}
.backC {
    margin-top: 3.75rem;
}
.boxR {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.divBox {
    width: 70px;
    height: 2.25rem;
    border-radius: 0.375rem;
    position: relative;
    line-height: 2.25rem;
    /* text-align: center; */
}
.divBox1 {
    margin-left: 1.5rem;
}
.divBox3 {
    margin-right: 1.5rem;
}
.divBox:after {
    content: "";
    width: 14px;
    height: 8px;
    position: absolute;
    right: 5px;
    top: 40%;
    pointer-events: none;
    background: url("./../../../../static/img/xiala.png") no-repeat center;
    background-size: 100% 100%;
}
.group-select {
    position: absolute;
    top: 2.25rem;
    left: 0;
    height: 11.25rem;
    width: 98%;
    overflow: auto;
}
.group-selectdetail {
    height: 2.25rem;
    width: 98%;
    background-color: beige;
}
.threeS {
    width: 27%;
    height: 2.375rem;
    line-height: 2.375rem;
    display: inline-block;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    background-color: white;
    /* box-shadow: 0.0625rem 0.0625rem 0.625rem #888; */
}
/* 领取优惠券 */
.yhqSucees {
    width: 7.1875rem;
    margin-top: 3.125rem;
}
.Yhqdetial {
    margin: 30px auto 0 auto;
    width: 14.4375rem;
    height: 4.0625rem;
    background-color: #f9db92;
    border-radius: 0.3125rem;
}
.Yhqdetial > div {
    float: left;
    height: 3.3rem;
}
.Yhqdetial > div:first-child {
    width: 3.3rem;
    border-radius: 0.3125rem;
    background-color: white;
    margin: 0.3812rem 0 0 0.3812rem;
}
.money-yhq {
    text-align: left;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    margin-left: 0.625rem;
    color: #535354;
}
.time-yhq {
    text-align: left;
    font-size: 0.625rem;
    margin-top: 1.1rem;
    margin-left: 0.625rem;
    color: #535354;
}
.cdks {
    margin-top: 2.8125rem;
    font-size: .75rem;
}
.cdsk_sucess {
    margin-top: 2.1875rem;
}
.yhq_img {
    height: 100%;
    width: 100%;
}
/* 微信现金红包 */
.wxId {
    margin-top: 3.4rem;
    width: 70%;
    height: 2.4375rem;
}
.money_lq {
    margin: 0 auto;
    margin-top: 0.9375rem;
    font-size: 0.75rem;
    width: 80%;
    color: #535354;
}
.money_input {
    margin-top: 2.5rem;
}
.van-actionsheet{
    height:50% !important;
}
.flexBox{
    /* width:80%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between; */
}
</style>
