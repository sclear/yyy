<template>
  <div class="prize-detail">
      <div class="first-prize">
          <div class="prize-img">
              <img :src="$url+item.logo" alt="">
          </div>
      </div>
      <div>
          <div class="prizes">{{item.goods}}</div>
          <div class="getDate"><span>请在活动结束前领取</span></div>
      </div>
      <div id="getP">
          <div @click="getPrize(index)" class="getPrize">立即领取</div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
      item:Object,
      index:Number
  },
  components: {

  },
  methods: {
      getPrize(){
          alert(this.index)
      }
  }
}
</script>

<style scoped >
.prize-detail{
    position: relative;
    width:100%;
    height:3.5625rem;
    background: url('./../../../../static/img/prizedetail.png') no-repeat;
    background-size: 100% 100%;
    margin-top: .625rem;
}
.prize-detail>div{
    float: left;
}
.first-prize{
    width:3.125rem;
}
.prize-img{
    height: 3.125rem;
    width:100%;
    border-radius: .625rem;
    margin:.21875rem auto auto .3125rem;
}
.prize-img>img{
    width:100%;
    max-height: 100%;
}
.prizes{
    text-align: left;
    font-size: .75rem;
    color:rgb(83, 83, 84);
    margin:.5rem auto auto .9375rem;
}
.getDate{
    text-align: left;
    font-size: .5625rem;
    color:rgb(83, 83, 84);
    margin:.5rem auto auto .9375rem;
}
.getPrize{
    font-size: .5625rem;
    color:rgb(255, 255, 255);
    height:1.625rem;
    width:4.875rem;
    background-color: #fdbe39;
    border-radius: .8125rem;
    margin-top: .8125rem;
    line-height: 1.625rem;
    text-align: center;
}
#getP{
    position: absolute;
    right:.5rem;
}
</style>
