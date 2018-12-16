<template>
  <div class="buy-f">
      <div class="buy-count">
          <div class="get-count">{{item.number}}<span class="ci-count">次</span></div>
          <div class="song-text">送</div>
          <div class="get-count">{{item.give}}<span class="ci-count">次</span></div>
      </div>
      <div class="yao-conut">摇一摇抽奖次数</div>
      <div @click="buyCount(index)" class="buy-btn">￥{{item.money}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props:{
      item:Object,
      index:Number
  },
  components: {

  },
  methods: {
      buyCount(res) {
          this.$emit('buycount',res)
      }
  }
}
</script>

<style scoped >
.buy-f{
    width:45%;
    height:7.03125rem;
    background-color:#fadc8e;
    border-radius: .625rem;
    margin:.5rem 2.5%;
}
.buy-count{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.buy-count>div{
    float: left;
    margin: 0.9rem 2% .625rem 2%;
}
.get-count{
    color:rgb(247, 173, 16);
    font-size: .9375rem;
}
.ci-count{
   font-size: .5625rem;
}
.song-text{
    font-size: 1.125rem;
    height:30px;
    width:30px;
    border-radius: 50%;
    color:white;
    background-color: #f7ad10;
    text-align: center;
    line-height: 30px;
    margin-bottom: 100px;
}

.yao-conut{
    color:rgb(83, 83, 84);
    font-size: 12px;
}
/* 购买按钮 */
.buy-btn{
    height:1.46875rem;
    width:86px;
    background-color: #fdbe39;
    line-height: 1.46875rem;
    text-align: center;
    color:white;
    margin:0 auto;
    border-radius: 10px;
    margin-top: .625rem;
    font-size:.75rem;
}
</style>
