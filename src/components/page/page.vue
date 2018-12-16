<template>
  <!-- <van-pull-refresh @refresh="onRefresh"> -->
  <!-- <van-pull-refresh v-model="isLoading"> -->
   <div>
      <div v-show="home === 0" class="containers" ref="bgImg" :class="themsBg">&nbsp;
        <div class="rock">
          <img @click="getTm" class="animated tada infinite" src="./../../../static/img/rock.png" alt>
        </div>
        <!-- <div style="font-size:20px;position:absolute;top:20px;">{{arr}}</div>
        <div style="font-size:20px;position:absolute;top:40px;">{{arrs}}</div> -->
        <img @click="Menuclose" class="shrarBtn" :src="meun" alt>
        <!-- 右上角菜单 -->
        <j-share @backHome='backHome' @shareWqvh="shareWqvh" @Ruleclose="Ruleclose" :hiddenN="hiddenN"></j-share>

        <j-countdown></j-countdown>
        <!-- <j-winprize></j-winprize> -->
        <j-winpeople></j-winpeople>

        <div class="award">
          <img class="awardTile" :src="titleImg" alt>
          <img class="award" :class="kaiguan === 2?'animated wobble infinite':''" :src="happyImg" alt>
        </div>

        <j-btn @backHome='backHome' @getPrize="getPrize" @showLogin="showLogin" @showEndh="showEndh" class="jsbtn"></j-btn>

        <p v-if="userId" class="changeNum" ref="colorZ">{{userTel | toSt}},您还有{{Blsums}}次机会</p>
        <p v-else class="changeNum" ref="colorZ">请先绑定手机号</p>

        <!-- 绑定手机 -->
        <j-bindphones v-if="bindphone" @closeAllmodel="closeAllmodel"></j-bindphones>
        <!-- 规则-->
        <j-rules v-if="rule" @closeAllmodel="closeAllmodel"></j-rules>
        <!-- 中大奖 -->
        <j-win @backHome='backHome' :prizeLogo="prizeLogo" v-if="win" @closeAllmodel="closeAllmodel"></j-win>
        <!-- 没中奖 -->
        <j-nowin @backHome='backHome' v-if="nowin" @closeAllmodel="closeAllmodel"></j-nowin>
        <!-- 次数用完了 -->
        <j-noney @backHome='backHome' v-if="noney" @closeAllmodel="closeAllmodel"></j-noney>
        <!-- 活动已结束 -->
        <j-end @seeRule="seeRule" v-if="endh" :timeJQ="timeJQ" @closeAllmodel="closeAllmodel"></j-end>
        <!-- 分享弹框 -->
        <wxqqshare v-if="wxqq" @shareWqvh="shareWqvh" :wxqqshare="wxqqshare"></wxqqshare>
      </div>
      <get-prize @backHome='backHome' v-if="home === 1"></get-prize>
      <myprizes @backHome='backHome' v-if="home === 2"></myprizes>
      <tongji @backHome='backHome' v-if="home === 3"></tongji>
      
   </div>
  <!-- </van-pull-refresh> -->
</template>

<script>
import {
  getActivity,
  activeState,
  drawLottery,
  getSecond,
  getTime,
  login
} from "./../../util.js/baseUrl.js";
import Shake from 'shake.js'
import { mapState } from 'vuex'
import { PullRefresh } from "vant";
import wxqqshare from "./../gettime/bg/sharewxqq";
import jWinpeople from "./prize/winpeople";
import jEnd from "./../popup/end";
import jNoney from "./../popup/noney";
import jNowin from "./../popup/nowin";
import jWin from "./../popup/win";
import jBindphones from "./../popup/bindphones";
import jRules from "./../popup/rules";
import jShare from "./btn/share";
import jBtn from "./btn/btn";
import jCountdown from "./countdown/countdown";

//获取次数
import getPrize from './../gettime/gettime'
//我的奖品
import myprizes from './../myprize/myprize'
//统计
import tongji from './../tongji/tongji'
export default {
  inject: ["reload"],
  data() {
    return {
      count: 0,
      isLoading: false, //下拉刷新功能
      hiddenN: false, //菜单开启关闭
      rule: false, //规则
      bindphone: false, //绑定手机
      win: false, //中大奖
      nowin: false, //未中奖
      noney: false, //没有次数
      endh: false, //活动结束
      wxqq: false, //微信分享
      kaiguan: 1,
      bs: 0, //开奖控制！！！
      titleImg: "", //摇动模型title
      happyImg: "", //主题y
      themsBg: "", //背景
      meun: "", //菜单开关
      prizeLogo: "", //奖品logo
      wxqqshare: true, //控制2个分享的显示
      status_v: false,
      timeJQ: 1, //判断在时间段内 或者 整次活动的选择

      getPri: true,
      x: 0,
      y: 0,
      z: 0,
      last_x: 0,
      last_y: 0,
      last_z: 0,
      SHAKE_THRESHOLD: 1000,
      last_update: 0,
      acceleration: "",
      bl: true,
      fn: this.jumpAction,

      Blsums:0,      //次数
      arr:[],         //判断
      arrs:[],        //判断
      home:0,         //显示页面
    };
  },
  mounted() {
    //活动时间段
    getTime().then(res => {
      this.$store.state.openTimein = res.data.data[0].lottery_open;
      this.$store.state.openTimeout = res.data.data[0].lottery_end;
      this.$store.state.start_time = res.data.data[0].start_time;
      this.$store.state.end_time = res.data.data[0].end_time;
    });

    //页面高度计算 适应屏幕视口
    if (!this.$store.state.wHeight) {
      this.$store.state.wHeight = document.getElementsByTagName(
        "body"
      )[0].offsetHeight;
      // this.$store.state.wHeight = screen.height;
      this.$refs.bgImg.style.height = this.$store.state.wHeight + "px";
    } else {
      this.$refs.bgImg.style.height = this.$store.state.wHeight + "px";
    }

    //获取主题等信息
    if (!this.$store.state.thems) {
      getActivity().then(res => {
        if (res.status === 200 && res.data.data === 0) {
          this.$store.state.Purchase_price = 0;
          this.$store.state.exchange = 0;
          this.$store.state.thems = "2";
          this.swichThems();
          return;
        }
        this.$store.state.Purchase_price = res.data.data[0].Purchase_price;
        this.$store.state.exchange = res.data.data[0].exchange;
        this.$store.state.purchase = res.data.data[0].purchase;
        this.$store.state.purchase = res.data.data[0].purchase;
        this.$store.state.activity_name = res.data.data[0].activity_name;
        document.title = res.data.data[0].activity_name;
        this.$store.state.activity_rules = res.data.data[0].activity_rules;
        this.$store.state.share = res.data.data[0].share;
        this.$store.state.exchange = res.data.data[0].exchange;
        this.$store.state.exchange_limit = res.data.data[0].exchange_limit;
        this.$store.state.exchange_rules = res.data.data[0].exchange_rules;
        this.$store.state.thems = res.data.data[0].themes;
        switch (this.$store.state.thems) {
          case "0":
            this.happyImg = require("./../../assets/happyImg/sd.png");
            this.titleImg = require("./../../assets/title/sd.png");
            this.themsBg = "sd";
            this.meun = require("./../../../static/img/muen.png");
            break;
          case "1":
            this.happyImg = require("./../../assets/happyImg/yd.png");
            this.titleImg = require("./../../assets/title/yd.png");
            this.themsBg = "yd";
            this.$refs.colorZ.style.color = "#535354";
            this.meun = require("./../../../static/img/muen.png");
            break;
          case "2":
            this.happyImg = require("./../../assets/happyImg/cj.png");
            this.titleImg = require("./../../assets/title/cj.png");
            this.themsBg = "cj";
            this.meun = require("./../../../static/img/muen.png");
            break;
          case "3":
            this.happyImg = require("./../../assets/happyImg/ld.png");
            this.titleImg = require("./../../assets/title/ld.png");
            this.themsBg = "ld";
            this.$refs.colorZ.style.color = "#535354";
            this.meun = require("./../../../static/img/muen1.png");
            break;
          case "4":
            this.happyImg = require("./../../assets/happyImg/dw.png");
            this.titleImg = require("./../../assets/title/dw.png");
            this.themsBg = "dw";
            this.$refs.colorZ.style.color = "#093d07";
            this.meun = require("./../../../static/img/muen1.png");
            break;
          case "5":
            this.happyImg = require("./../../assets/happyImg/zq.png");
            this.titleImg = require("./../../assets/title/zq.png");
            this.themsBg = "zq";
            this.meun = require("./../../../static/img/muen.png");
            break;
          case "6":
            this.happyImg = require("./../../assets/happyImg/gq.png");
            this.titleImg = require("./../../assets/title/gq.png");
            this.themsBg = "gq";
            this.$refs.colorZ.style.color = "#535354";
            this.meun = require("./../../../static/img/muen1.png");
            break;
          case "7":
            this.$store.state.imgurl = res.data.data[0].imgurl;
            this.$refs.bgImg.style.backgroundImage = `url(${
              res.data.data[0].imgurl
            })`;
            this.happyImg = require("./../../assets/happyImg/zdy.png");
            this.titleImg = require("./../../assets/title/zdy.png");
            this.$refs.colorZ.style.color = "#535354";
            this.meun = require("./../../../static/img/muen1.png");
            break;
        }
      });
    } else {
      this.swichThems();
    }

    //判断活动结束
    activeState().then(res => {
      if (res.data.msg === "暂没有活动") {
        this.endh = true;
        this.status_v = false;
        this.$store.state.status_s = false;
        return;
      } else {
        this.status_v = true;
        this.$store.state.status_s = true;
      }
    });

    //摇一摇功能事件绑定   （废弃 保留）
    // window.addEventListener("devicemotion", this.handleScroll, false);
    // window.addEventListener("devicemotion", this.deviceMotionHandler, false);


    /**
     * 异步 同步(IOS首次无法获取原生{自动登录}方法)
     * 是否拥有登录信息
     * @param {!tmAndroidInf.getMobile()} true => 去登录
     */
    
    setTimeout(()=>{
      if (!this.userId) {
        try {
          if (!tmAndroidInf.getMobile()) {
            this.bindphone = true;
          } else {
            login({ tel: tmAndroidInf.getMobile() }).then(res => {
              if (res.status === 200) {
                if (res.data.data[0].id) {
                  this.$store.state.id = res.data.data[0].id;
                  this.$store.state.sums = res.data.data[0].sums;
                  this.$store.state.tel = res.data.data[0].tel;
                  localStorage.setItem("tel", res.data.data[0].tel);
                  localStorage.setItem("id", res.data.data[0].id);
                  this.binding = false;
                  //储存登录日期
                  let timeOut = new Date();
                  let timeLongin =
                    String(timeOut.getMonth() + 1) + String(timeOut.getDate());
                  localStorage.setItem("timeLogin", timeLongin);
                }
              }
            });
          }
        } catch (err) {
          setTimeout(()=>{
            this.getInfos()
          },300)
        }
     }
    },500)

    //拥有登录信息  更新次数
    // if (this.userId) {
    //   setTimeout(()=>{
    //     this.getnowCount();
    //   },300)
    // }
    setTimeout(()=>{
        if(this.userId){
          this.getnowCount();
        }
    },1000)

    //vue  摇动监听
    window.removeEventListener("shake", this.shakeEventDidOccur, false);
        let myShakeEvent = new Shake({
          threshold:12,
          timeout:500
       });
      myShakeEvent.start();
      window.addEventListener("shake", this.shakeEventDidOccur, false);
    },
  methods: {
    //摇动事件
    shakeEventDidOccur() {
      if (
        this.rule === false &&
        this.bindphone === false &&
        this.win === false &&
        this.nowin === false &&
        this.noney === false &&
        this.endh === false &&
        this.wxqq === false) {
        this.arr.push(1)
        if(this.arr.length === 1){
            this.arrs.push(1);
            
            // this.arr = [];
            // this.arrs = [];
            setTimeout(()=>{
              this.arr = [];
            this.arrs = [];
            },2000)
          if (this.openIng()) {
          } else {
            this.endh = true;
            // this.arrs = [];
            return
          }
          if (!this.userId) {
            // this.arrs = [];
            this.showLogin();
            return
          }
          //无次数
          if (this.Blsums <= 0) {
            // this.arrs = [];
            this.noney = true;
            return;
          }
          // this.bl = false;
          if(this.arrs[0] && this.bl){
            this.bl = false;
              // this.arrs = [];
            this.kaiguan = 2;
          setTimeout(() => {
            this.kaiguan = 1;
            this.jumpAction();
          }, 2000);


            }          
          }
      }
     
     
     
      // this.arr.push(1)
      //    if(this.arr.length === 1){
      //      this.arrs.push(1)
      // }
      
    },
    //（废弃）
    deviceMotionHandler(eventData) {
      var acceleration = eventData.accelerationIncludingGravity;
      var curTime = new Date().getTime();
      if (curTime - this.last_update > 100) {
        var diffTime = curTime - this.last_update;
        this.last_update = curTime;
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
        var speed = (Math.abs(this.x + this.y + this.z - this.last_x - this.last_y - this.last_z) / diffTime) * 10000;

        if (speed > this.SHAKE_THRESHOLD && this.bl) {
          this.bl = false;
          setTimeout(()=>{
            this.jumpAction()
          },1000)
          
        }
        this.last_x = this.x;
        this.last_y = this.y;
        this.last_z = this.z;

      
      }
    },
    //刷新 (废弃)
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.getnowCount()
      }, 200);
    },
    //关闭all菜单
    closeAllmodel() {
      this.bindphone = false;
      this.rule = false;
      this.bindphone = false;
      this.win = false;
      this.nowin = false;
      this.noney = false;
      this.endh = false;
      this.getnowCount();0
    },
    //开关菜单
    Menuclose() {
      this.hiddenN = !this.hiddenN;
    },
    Ruleclose() {
      //开启规则
      if (this.rule === false) {
        this.rule = true;
      }
    },
    //获得奖品
    jumpAction() {
      if (true) {
        let Gdata = {
          id: this.userId,
          tel: this.userTel
        };
        //出奖控制
        let that = this;
        drawLottery({ data: Gdata })
          .then(res => {
            // alert('抽奖')
              this.bl = true;
            if (res.data.data.prize === "未中奖") {
              that.nowin = true;
              that.getnowCount();
              return;
            } else if (res.data.data.prize === "次数不足") {
              that.noney = true;
              return;
            } else if (res.data.data.prize > 0) {
              this.win = true;
              that.prizeLogo = res.data.data.logo;
              that.getnowCount();
              return;
            } else {
              this.status_v = false;
              this.endh = true;
            }
          })
          .catch(err => {
            // this.reload();
          });
      }
      // }, 2000);
    },
    //主要功能事件 =(废弃)
    handleScroll() {
      if (
        this.rule === false &&
        this.bindphone === false &&
        this.win === false &&
        this.nowin === false &&
        this.noney === false &&
        this.endh === false &&
        this.wxqq === false
      ) {
        this.acceleration = event.accelerationIncludingGravity;
        this.x = this.acceleration.x;
        this.b = this.x;
        if (this.x > 20  &&  this.bl) {
          this.x = 0;
          if (this.openIng()) {
          } else {
            this.endh = true;
            return;
          }
          if (!this.userId) {
            this.showLogin();
            return;
          }
          //无次数
          if (this.$store.state.sums <= 0) {
            this.noney = true;
            return;
          }
          this.bl = false;

          this.kaiguan = 2;
          setTimeout(() => {
            this.kaiguan = 1;
            this.jumpAction();
          }, 2000);

        }
      }
    },
    //按钮触发摇动事件
    getPrize() {
      if (this.openIng()) {
      } else {
        this.endh = true;
        return;
      }
      if (!this.$store.state.id) {
        this.showLogin();
        return;
      }
      if (this.Blsums <= 0) {
        this.noney = true;
        return;
      }
      //无次数
      if (this.bl) {
        this.bl = false;
        this.kaiguan = 2;
        setTimeout(() => {
          this.kaiguan = 1;
          this.jumpAction();
        }, 2000);
      }
    },
    //未登录弹起
    showLogin() {
      this.bindphone = true;
    },
    //活动关闭
    showEndh() {
      this.endh = true;
    },
    //切换主题
    swichThems() {
      switch (this.$store.state.thems) {
        case "0":
          this.happyImg = require("./../../assets/happyImg/sd.png");
          this.titleImg = require("./../../assets/title/sd.png");
          this.themsBg = "sd";
          this.meun = require("./../../../static/img/muen.png");
          break;
        case "1":
          this.happyImg = require("./../../assets/happyImg/yd.png");
          this.titleImg = require("./../../assets/title/yd.png");
          this.themsBg = "yd";
          this.$refs.colorZ.style.color = "#535354";
          this.meun = require("./../../../static/img/muen.png");
          break;
        case "2":
          this.happyImg = require("./../../assets/happyImg/cj.png");
          this.titleImg = require("./../../assets/title/cj.png");
          this.themsBg = "cj";
          this.meun = require("./../../../static/img/muen.png");
          break;
        case "3":
          this.happyImg = require("./../../assets/happyImg/ld.png");
          this.titleImg = require("./../../assets/title/ld.png");
          this.themsBg = "ld";
          this.$refs.colorZ.style.color = "#535354";
          this.meun = require("./../../../static/img/muen1.png");
          break;
        case "4":
          this.happyImg = require("./../../assets/happyImg/dw.png");
          this.titleImg = require("./../../assets/title/dw.png");
          this.themsBg = "dw";
          this.$refs.colorZ.style.color = "#093d07";
          this.meun = require("./../../../static/img/muen1.png");
          break;
        case "5":
          this.happyImg = require("./../../assets/happyImg/zq.png");
          this.titleImg = require("./../../assets/title/zq.png");
          this.themsBg = "zq";
          this.meun = require("./../../../static/img/muen.png");
          break;
        case "6":
          this.happyImg = require("./../../assets/happyImg/gq.png");
          this.titleImg = require("./../../assets/title/gq.png");
          this.themsBg = "gq";
          this.$refs.colorZ.style.color = "#535354";
          this.meun = require("./../../../static/img/muen1.png");
          break;
        case "7":
          this.$refs.bgImg.style.backgroundImage = `url(${
            this.$store.state.imgurl
          })`;
          this.happyImg = require("./../../assets/happyImg/gq.png");
          this.titleImg = require("./../../assets/title/gq.png");
          this.$refs.colorZ.style.color = "#535354";
          this.meun = require("./../../../static/img/muen1.png");
          break;
      }
    },
    //更新次数
    getnowCount() {
      getSecond({
        id: this.$store.state.id,
        tel: this.$store.state.tel
      }).then(res => {
        this.Blsums = res.data.data.sums ? res.data.data.sums : 0;
      });
    },
    //查看规则
    seeRule() {
      this.endh = false;
      this.rule = true;
    },
    //显示隐藏分享
    shareWqvh() {
      if (this.wxqq) {
        this.getnowCount()
      }
      this.wxqq = !this.wxqq;
    },
    //开启活动时间 判断
    openIng() {
      let NOW = new Date(this.nowtimes);
      let h = NOW.getHours() < 10 ? 0 + String(NOW.getHours()) : NOW.getHours();
      let m =
        NOW.getMinutes() < 10 ? 0 + String(NOW.getMinutes()) : NOW.getMinutes();
      let s =
        NOW.getSeconds() < 10 ? 0 + String(NOW.getSeconds()) : NOW.getSeconds();
      let Nowstring = String(h) + String(m) + String(s);
      if (
        this.$store.state.openTimein < Nowstring &&
        Nowstring < this.$store.state.openTimeout &&
        this.$store.state.start_time * 1000 < NOW.getTime() &&
        NOW.getTime() < this.$store.state.end_time * 1000 &&
        this.status_v
      ) {
        return true;
      } else if (
        this.$store.state.start_time * 1000 < NOW.getTime() &&
        NOW.getTime() < this.$store.state.end_time * 1000 &&
        this.status_v
      ) {
        // this.status_v = false;
        this.timeJQ = 0;
        return false;
      } else {
        // console.log("活动结束");
        this.timeJQ = 1;
        this.status_v = false;
        return false;
      }
    },
    getMobile() {
      return "18482169004";
    },
    //回到首页
    backHome(val) {
      this.home = val;
      this.getnowCount();
    },
    //获取用户信息
    getInfos() {
       if (!this.userId) {
        try {
          if (!tmAndroidInf.getMobile()) {
            this.bindphone = true;
          } else {
            login({ tel: tmAndroidInf.getMobile() }).then(res => {
              if (res.status === 200) {
                if (res.data.data[0].id) {
                  this.$store.state.id = res.data.data[0].id;
                  this.$store.state.sums = res.data.data[0].sums;
                  this.$store.state.tel = res.data.data[0].tel;
                  this.binding = false;
                }
              }
            });
          }
        } catch (err) {
          this.bindphone = true;
          // alert('错误响应')
        }
     }
    },
    getTm() {
    }
  },
  filters:{
    toSt(val) {
      return String(val)
    }
  },
  components: {
    jCountdown,
    jBtn,
    jShare,
    jBindphones,
    jRules,
    jWin,
    jNowin,
    jNoney,
    jEnd,
    jWinpeople,
    wxqqshare,
    getPrize,
    myprizes,
    tongji
  },
  computed: {
    ...mapState(['nowtimes','addFn']),
    sumss() {
      return this.$store.state.sums;
    },
    userId() {
      return this.$store.state.id;
    },
    userTel() {
      return this.$store.state.tel;
    }
  }
};
</script>

<style scoped >
.sd {
  background-image: url("./../../assets/page_bg/sd.png");
}
.yd {
  background-image: url("./../../assets/page_bg/yd.png");
}
.cj {
  background-image: url("./../../assets/page_bg/cj.png");
}
.ld {
  background-image: url("./../../assets/page_bg/ld.png");
}
.dw {
  background-image: url("./../../assets/page_bg/dw.png");
}
.zq {
  background-image: url("./../../assets/page_bg/zq.png");
}
.gq {
  background-image: url("./../../assets/page_bg/gq.png");
}
.custom {
  /* background-image: url("./../../../../static/model1/custom.png"); */
}

.containers {
  width: 100%;
  height: 100%;
  font-size: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.rock {
  width: 11.25rem;
  height: 4.375rem;
  margin: 2.9375rem auto 0 auto;
}
.rock img {
  width: 100%;
  height: 100%;
}
/* 分享按钮 */
.shrarBtn {
  width: 1.875rem;
  height: 1.5rem;
  position: absolute;
  top: 1.75rem;
  right: 1.25rem;
}
/* 圣诞老人 */
.awardTile {
  display: block;
  /* height: 15%; */
  width: 12.09375rem;
  margin: 1.125rem auto 0.5rem auto;
}
.award {
  display: block;
  height: 12.5rem;
  margin: 0 auto;
}
.changeNum {
  font-size: 0.75rem;
  color: white;
  height: 1.25rem;
  margin: 0;
}
/* 遮罩 */
.shade {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.384);
  z-index: 20;
}

</style>
