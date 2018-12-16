<template>
  <div class="rulebg">
      <div class="rule">
        <img class="rule-img" width="60" src="./../../../static/img/rule.png" alt="">
        <div class="indet40"> <span class="j-radius">●</span> 活动时间:24小时制</div>
        <div class="indet40"> <span class="j-radius">●</span> 抽奖规则:</div>
        <div class="textIndet">用户每天可以免费活的20次抽奖机会</div>
        <div class="textIndet">用户可以通过分享或者购买的方式获得抽奖次数</div>
        <div class="indet40"> <span class="j-radius">●</span> 奖品类型:</div>
        <div class="textIndet">实物奖品:我们通过对获奖用户填写的个人     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;信息,进行奖品的发放</div>
        <div class="textIndet">虚拟奖品:现金红包,积分，优惠卷,在规定     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间内发放到绑定的手机号中</div>
        <div class="indet40">  <span class="j-radius">●</span> 如有任何疑问,请拨打123456,进行咨询</div>
        <div class="indet40">  <span class="j-radius">●</span> 活动的最终解释权归活动承办方所有</div>
      </div>

      <div class="close">
          <van-icon @click="ruleC" name="clear"/>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    //   console.log(11)
    //   activity_rules
    //   console.log(this.$store.state.activity_rules)
  },
  components: {
      
  },
  methods: {
      ruleC(){
          this.$emit('Ruleclose')
          this.$emit('shadoeClose')
      }
  }
}
</script>

<style scoped >
.rulebg{
    position: absolute;
    top: 20%;
    width:310px;
    height:380px;
    left: 50%;
    margin-left: -155px;
    letter-spacing: 1px;
    z-index: 40;
    background-image: url('./../../../static/img/model1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.rule{
    margin-top: 80px;
    width:240px;
    font-size:12px;
    margin-left: 60px;
}
.rule div{
    text-align: left;
    line-height:20px;
}
.rule-img{
    margin-left: -40px;
}
.j-radius{
    /* width:20px; */
    color:red;
    font-size:18px;
    line-heigh:20px;
    display: inline-block;
    text-align:center;
    text-indent: 20px;
}
.textIndet{
    
}
.indet40{
    text-indent: -60px;
}


/* 关闭按钮 */
.close{
    font-size: 40px;
    position: absolute;
    color:white;
    bottom: -70px;
    left:50%;
    margin-left:-20px;
}
</style>
