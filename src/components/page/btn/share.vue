<template>
  <div class="jshare animated fadeIn" v-if="hiddenN">
      <div class="menuBtn">
          <div>
              <div class="mDetail">
                  <img src="./../../../../static/img/share.png" alt="">
              </div>
              <div @click="wxqqshare" class="menu-Text">分享</div>
          </div>
          <div>
              <div class="mDetail">
                  <img src="./../../../../static/img/gz.png" alt="">
              </div>
              <div @click="rule" class="menu-Text">活动规则</div>
          </div>
          <div>
              <div class="mDetail">
                  <img src="./../../../../static/img/count.png" alt="">
              </div>
              <div @click="countS" class="menu-Text">活动统计</div>
          </div>
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
      hiddenN: Boolean
  },
  components: {

  },
  methods: {
      rule(){
          this.$emit('Ruleclose')
      },
      countS(){
        //   this.$router.push({path:'/tongji'})
        this.$emit('backHome',3)
      },
      wxqqshare() {
          this.$emit('shareWqvh')
      }
  }
}
</script>

<style scoped >
img{
     height:40%;
     margin-top: 19%;
}
 .jshare{
     height:8.3125rem;
     width:7.5rem;
     background-image: url('./../../../../static/img/box.png');
     background-repeat: no-repeat;
     background-size:100% 100%;
     position: absolute;
     top:3.5rem;
     right:0.75rem;
     z-index: 40;
}
 .menuBtn{
     height:7.3125rem;
     width:7.5rem;
     margin-top:0.8125rem;
}
 .menuBtn div{
     height:2.4375rem;
     width:100%;
     border-bottom:0.0625rem solid rgba(170, 158, 158, 0.1);
}
 .menuBtn div div{
     float: left;
}
 .mDetail{
     height:2.4375rem;
     width:30% !important;
}
 .menu-Text{
     height:2.4375rem;
     font-size: 0.75rem;
     width:60% !important;
     text-align: center;
     line-height:2.4375rem;
}
 
</style>
