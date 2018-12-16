<template>
  <div class="tongji">
      <j-bg @backhome="backhome" :titleName='titleName'>
          <div slot="contents">
              <div>
                  <img class="now nowTitle" src="./../../../static/img/muqian.png" alt="">             
              </div>
              <div class="count-tile">共有<span class="red-text">{{peoples.nums}}</span>参与抽奖,新增用户<span class="red-text">{{peoples.adds}}</span>名,共分享次数<span class="red-text">{{peoples.shares}}</span>次</div>
              <div class="hr-dashed">
                  <img src="./../../../static/img/hrs.png" alt="">
              </div>
              <div>
                  <img class="mingdan" src="./../../../static/img/mingdan.png" alt="">
              </div>
              <div class="titleName">
                  <img class="n-name" src="./../../../static/img/uname.png" alt="">
                  <img class="n-phone" src="./../../assets/modify/jx.png" alt="">
                  <img class="n-prize" src="./../../../static/img/winprize.png" alt="">
              </div>
              <div class="scoll-prize">
                  <div v-for="(item,index) in list" :key='index' class="prize-msg">
                      <div class="prize-name">{{item.user | telephone}}</div>
                      <div>{{item.prize_name}}</div>
                      <div class="prize-detail">{{item.goods}}</div>
                  </div>
              </div>
          </div>
      </j-bg>
  </div>
</template>

<script>
import { imgUrl } from './../../util.js/img.js'
import { takeMset,index } from './../../util.js/baseUrl.js'
import jBg from './../gettime/bg/bg'
export default {
  data() {
    return {
        titleName:imgUrl.tongji,
        peoples:{},
        list:[],

    }
  },
  mounted(){
      takeMset()
      .then(res=>{
          this.peoples = res.data.data;
      })
      index()
      .then(res=>{
          this.list = res.data.data
      })

  },
  filters:{
        telephone: function(res) {
            if(res){
                return res.slice(0,3)+'***'+res.slice(7,11);
            }
            
        },
  },
  components: {
      jBg
  },
  methods:{
      backhome() {
          this.$emit('backHome',0)
      }
  }
}
</script>

<style scoped >
.now,.mingdan{
    width:3.9375rem;
    float: left;
}
.mingdan{
    margin-top: .5rem;
}
.nowTitle{
    margin-top: 2.5rem;
}
.titleName{
    width:95%;
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding-left: .9375rem;
    margin-top: 2.125rem;
}
.count-tile{
    margin-top: .90625rem;
    font-size: .6875rem;
    float: left;
    width: 100%;
    text-align: center;
    white-space:nowrap;
}



.n-name{
    width:2.5625rem;
    height:.84375rem;
}
.n-phone{
    width:1.8rem;
    height:.84375rem;
    margin-right: 1.25rem;
}
.n-prize{
    width:1.75rem;
    height:.84375rem;
    margin-right: .1875rem;

}
.scoll-prize{
    width:100%;
    height:60vh;
    margin:0 auto;
    margin-bottom: 1.875rem;
    overflow: scroll;
}
/* 奖品详情 */
.prize-msg{
    display: flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: space-between;   
    background-color: #fef5e2;
    height:1.03125rem; 
    margin-top: .75rem;
}
.prize-msg div{
    width:30%;
    height:1.03125rem;
    font-size:.75rem;
    color:rgb(114, 113, 110)
}
.prize-name{
    text-align: left;
    margin-left: .3125rem;
}
.prize-detail{
    text-align: right;
}
.red-text{
    color:red;
}
</style>
