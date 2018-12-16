import { fetch } from './http'
import { ipurl } from './ipurl'

//==============================上传图片==========================
const upload = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Uploader/add',data,1);
}
//===================  首页=================
//绑定手机
const login = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/User/index',data)
}
//验证短信   
const sendMsg = (data)=>{
    return fetch('post',ipurl+'/member/member/sendMsg',data)
}
//验证码验证数字回调
const checkCode = (data)=>{
    return fetch('post',ipurl+'/member/member/checkCode',data)
}



//获取开启活动时间
const getTime = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/getTime',data)
}
//获取活动信息（主题）
const getActivity = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Luckdraw/getActivity',data)
}
//获取用户信息
const getNew = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/getNew',data)
}
//判断活动是否结束   
const activeState = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/User/activeState',data)
}
//出奖品 瞬间！！！
const drawLottery = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/User/drawLottery',data)
}
//======================统计=======================   
//人数统计   
const takeMset = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/takeMset',data)
}
//中奖名单列表  
const index = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/index',data)
}
//我的奖品    
const myPrize = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/User/myPrize',data)
}
//领取奖品    
const exchange = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/exchange',data)
}
//获取用户积分  
const getLookup = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Exchange/getLookup',data)
}
//获取购买优惠方式
const getBuy = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Exchange/getBuy',data)
}
//购买优惠方式
const purchase = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Exchange/purchase',data)
}

//积分兑换次数
const getExch = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Exchange/getExch',data)
}
//获取次数
const getSecond = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Exchange/getSecond',data)
}
//购买次数
const hand = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Exchange/hand',data)
}
//购买次数
const exchangeYhq = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Winning/exchange',data)
}
//获取分享信息
const getShare = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/Coupon/getShare',data)
}

//分享次数
const addSHareSum = (data)=>{
    return fetch('post',ipurl+'/kxk01xyyj_nhqey/User/addSHareSum',data)
}

export {
   upload,
   login,
   sendMsg,
   checkCode,
   getTime,
   getActivity,
   getNew,
   activeState,
   drawLottery,
   takeMset,
   index,
   myPrize,
   exchange,
   getLookup,
   getBuy,
   getExch,
   purchase,
   getSecond,
   hand,
   exchangeYhq,
   getShare,
   addSHareSum
}