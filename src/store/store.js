import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
/**
 *@param {thems}
 * 0=>圣诞
 * 1=>元旦
 * 2=>春节
 * 3=>劳动
 * 4=>端午
 * 5=>中秋
 * 6=>国庆
 * 7=>自定义
 */

const state = {
  thems: '',
  id: '',           //登录人ID
  tel: '',          //登录人tel
  exchange: '',      //是否支持积分兑换
  purchase: '',      //是否支持购买
  exchange_rules: '',//积分兑换比例
  exchange_limit: '',//积分兑换最大值
  share: '',          //分享可得次数
  sums: 0,           //抽奖机会
  activity_rules: '', //规则
  activity_name:'',   //活动名称

  wHeight:'',     //页面高度
  imgurl:'',      //页面自定义主题背景
  Purchase_price:'',//单价

  openTimein:'',    //活动开启时间段  IN
  openTimeout:'',    //活动结束时间段  OUT
  start_time:'',    //活动开启时间
  end_time:'',      //活动结束时间
  status_s:'',     //活动是否开启
  nowtimes:'',    //服务器当前时间

  addFn:true

}
const mutations = {
  addnub(state, n) {
    state.sums = 4;
  }

}

const actions = {
  addnub(ctx, n) {
    setTimeout(() => {
      ctx.commit("addnub", n)
    }, 0)
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
