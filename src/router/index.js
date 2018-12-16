import Vue from 'vue'
import Router from 'vue-router'

//摇一摇首页
import page from '@/components/page/page'
//获取次数(积分，购买)
import gettime from '@/components/gettime/gettime'
//我的奖品
import myprize from '@/components/myprize/myprize'
//活动统计
import tongji from '@/components/tongji/tongji'


import index from '@/components/index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: page
    },
    {
      path: '/page',
      component: page
    },
    {
      path: '/gettime',
      component: gettime
    },
    {
      path: '/myprize',
      component: myprize
    },
    {
      path: '/tongji',
      component: tongji
    },
    {
      path: '/index',
      component: index
    },
  ]
})
