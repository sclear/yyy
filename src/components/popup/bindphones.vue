<template>
    <j-modelone @closeAllmodel='closeAllmodel'>
        <div slot="modelone">

            <!-- 提示绑定 -->
            <div v-if="bind">
                <div class="bind-po">
                    <img width="88" src="./../../../static/img/bindphoen.png" alt="">
                </div>
                <div class="mtl">
                    <img width="176.5" src="./../../../static/img/nobind.png" alt="">
                </div>
                <div class="mtt">在进行操作前需要先绑定手机呢</div>
                <div @click="bingBefor" class="ljbind">
                    <img width="65" src="./../../../static/img/lbingd.png" alt="">
                </div>
            </div>
            <!-- 开始绑定 -->
            <div v-if="binding">
                <input class="sr-input telTop" v-model="tel" type="text" placeholder="手机号码">
                <input v-model="getMsg" class="ss-input mt7" type="text" placeholder="验证码">
                <div v-if="!thisbd" class="yan-z mt7" @click='sendNum'>发送验证码</div>
                <div v-if="thisbd" class="yan-z mt7">{{number}}</div>
                <div @click="bingingZ" class="ljbind bingding">
                    <img width="65" src="./../../../static/img/lbingd.png" alt="">
                </div>
                <!-- <div class="xy-ty">点击绑定代表同意 <span class="xy-x">《协议》</span></div> -->
            </div>
            <!-- 绑定成功 -->
            <div v-if="bindsucees">
                <div>
                    <img class="bing-cg1" width="111" src="./../../../static/img/gou.png" alt="">
                </div>
                <div>
                    <img class="bing-cg2" width="68" src="./../../../static/img/bindsucees.png" alt="">
                </div>
                <div class="goOn">你可以继续参与摇一摇抽奖了噢</div>
                <div @click="closeAllmodel" class="ljbind mt-xg">
                    <img width="65" src="./../../../static/img/backchou.png" alt="">
                </div>
            </div>
        </div>
    </j-modelone>
</template>

<script>
import { Toast } from 'vant';
import { login,sendMsg,checkCode } from "./../../util.js/baseUrl.js";
import jModelone from "./model/modelone";
export default {
    data() {
        return {
            bind: true, //绑定
            binding: false, //绑定中
            bindsucees: false, //绑定成功
            tel: "",
            number: 60,
            demo:'',
            thisbd:false,   //倒计时
            getMsg:''   //验证码
        };
    },
    components: {
        jModelone
    },
    methods: {
        pay() {
            // tmAndroidInf.pay(String(this.demo));
            // console.log('pay')
            var obj = {
                title:'title',
                img:"img",
                des:"des",
                url:"www.baidu.com"
            }

            tmAndroidInf.share(JSON.stringify(obj))

        },
        closeAllmodel() {
            this.$emit("closeAllmodel");
        },
        bingBefor() {
            this.bind = false;
            this.binding = true;
        },
        //绑定手机
        bingingZ() {
            // console.log(this.tel)
            // this.login()
            // return
            if(this.getMsg === '' || this.tel === ''){
                Toast.fail('验证失败');
                return
            }
            checkCode({code:this.getMsg,
                      mobile:this.tel
            })
            .then(res=>{
                if(res.data.msg === "验证通过"){
                    this.login()
                }
                else{
                    Toast.fail('验证失败');
                }
            })
            .catch(err=>{
                Toast.fail('验证失败');
            })
        },
        //匹配验证码
        sendNum() {
            let tels = /^0?1[3-9][0-9]\d{8}$/.test(this.tel);
            if (tels === false) {
                return
            } else{
                this.thisbd = true;
                let obj = {
                    mobile:this.tel,
                    state:5
                }
                sendMsg(obj)
                .then(res=>{
                })
            }

            var clearSetinterval = setInterval(() => {
                this.number--;
                if (this.number === 0) {
                    this.thisbd = false;
                    this.number = 60;
                    clearInterval(clearSetinterval);
                }
            }, 1000);
        },
        login() {
            login({ tel: this.tel }).then(res => {
                if (res.status === 200) {
                    // console.log(res)
                    if (res.data.data[0].id) {
                        this.$store.state.id = res.data.data[0].id;
                        this.$store.state.sums = res.data.data[0].sums?res.data.data[0].sums:0;
                        this.$store.state.tel = res.data.data[0].tel;
                        localStorage.setItem("tel", res.data.data[0].tel);
                        localStorage.setItem("id", res.data.data[0].id);

                        this.binding = false;
                        this.bindsucees = true;

                        //储存登录日期
                        let timeOut = new Date();
                        let timeLongin =
                            String(timeOut.getMonth() + 1) +
                            String(timeOut.getDate());
                        localStorage.setItem("timeLogin", timeLongin);
                    }
                }
            });
        }
    }
};
</script>

<style scoped >
.bind-po {
    margin-top: 3.4rem;
}
.mtl {
    /* margin-top: 42.0.3125rem; */
    margin-top: 3.5rem;
}
.mtt {
    /* 358 78 */
    margin-top: 0.75rem;
    font-size: 0.75rem;
}
/* bind btn*/
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 2.1875rem;
}
.bingding {
    margin-top: 3.75rem;
}
/* 开始绑定 */
.van-field {
    margin-top: 6.25rem;
    height: 2.25rem;
    width: 13.75rem;
    border-radius: 0.625rem;
    border: 1px solid rgb(235, 227, 227);
}
.fo {
    font-size: 3.125rem;
}
input {
    font: icon !important;
    border-radius: 0.375rem;
    background:no-repeat 0 0 scroll #fff;
    border:none;
    outline:medium;
    border:0.2px solid rgba(136, 136, 136, 0.199);
    padding-left: 0.9375rem;
}
input::-webkit-input-placeholder {
    color: rgb(83, 83, 84);
    font-size: 0.75rem;
    text-align: left;
}
.sr-input {
    width: 14.25rem;
    height: 2.25rem;
}
.ss-input {
    height: 2.25rem;
    width: 9rem;
}
.yan-z {
    width: 4.3125rem;
    height: 2.25rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    color: rgb(83, 83, 84);
    line-height: 2.25rem;
    text-align: center;
    display: inline-block;
    margin-left: 0.9375rem;

    background:no-repeat 0 0 scroll #fff;
    border:none;
    outline:medium;
    border:0.2px solid rgba(136, 136, 136, 0.199);
}
.mt-top {
    margin-top: 5rem;
}
.telTop {
    margin-top: 6.875rem;
}
.mt7 {
    margin-top: 20px;
}
.mt-xg {
    margin-top: 0.625rem;
}
/* 协议 */
.xy-ty {
    font-size: 0.75rem;
    margin-top: 10px;
}
.xy-x {
    color: rgb(253, 25, 35);
}

.bing-cg1 {
    margin-top: 2.6rem;
}
.bing-cg2 {
    margin-top: 2.7rem;
    margin-left: -0.9375rem;
}
.goOn {
    font-size: 0.75rem;
    margin-top: 0.625rem;
}
.mt-xg {
    margin-top: 2.3rem;
}
</style>
