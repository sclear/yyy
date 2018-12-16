<template>
  <div class="duihuanquan">
      <div class="quan-conut">
          <div>{{item.count}}</div>
          <div class="ci-text">次</div>
      </div>

      <div class="quan-text">
          <div class="lg-quan">摇一摇抽奖次数</div>
          <div class="sm-quan">{{item.fen}}积分兑换</div>
      </div>
      <div class="mr5">
          <div class="exchange">立即兑换</div>
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
      item:Object
  },
  components: {

  }
}
</script>

<style scoped >
.duihuanquan{
    width:100%;
    height:5.0625rem;
    background-color: #fadc8e;
    border-radius: .625rem;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.duihuanquan>div{
    height:100%;
}
.quan-conut{
    font-size:1.5rem;
    color:rgb(247, 173, 16);
    width:20%;
    padding-left: .625rem;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
}
.quan-conut>div{
    line-height: 5.0625rem;;
}
.mr5{
    margin-right: .625rem;
}
.ci-text{
    font-size: .75rem;
    color:rgb(247, 173, 16);
    margin-left: .2rem;
}
.lg-quan{
    font-size: .9375rem;
    color:rgb(83, 83, 84);
    margin: .5rem auto .3rem auto;
    white-space:nowrap;
}
.quan-text div{
    height: 1.25rem;
    line-height: 3.125rem;
    text-align: left;
}
.quan-text{
    width:40%;
    padding-left: .625rem;
}
.sm-quan{
    font-size:.625rem;
    color:#8a8a8a;
}
.exchange{
    height:1.5rem;
    width:5.375rem;
    background-color:#fdbe39;
    border-radius: 10px;
    font-size:.75rem;
    color:rgb(254, 254, 254);
    margin-top: 1.75rem;
    line-height: 1.5rem;
}
</style>
