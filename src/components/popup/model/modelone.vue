<template>
  <div ref="shaowO" class="zhezao">
    <div class="bindphone animated rollIn" :class="bgNum">
      <slot name='modelone'></slot>
      <div @click.stop='closeAllmodel' class="close">
        <!-- <van-icon name="clear" /> -->
        <img width="31" src="./../../../../static/img/xxx.png" alt="">
      </div>
    </div>
  </div>

</template>

<script>
export default {
    data() {
        return {
          bgNum:'sd'
        };
    },
    mounted() {
      this.$refs.shaowO.style.height = this.$store.state.wHeight + "px";
      switch(this.$store.state.thems){
        case '0':this.bgNum = 'sd';break;
        case '1':this.bgNum = 'yd';break;
        case '2':this.bgNum = 'cj';break;
        case '3':this.bgNum = 'ld';break;
        case '4':this.bgNum = 'dw';break;
        case '5':this.bgNum = 'zq';break;
        case '6':this.bgNum = 'gq';break;
        case '7':this.bgNum = 'custom';break;
      }
    },
    methods: {
        closeModel() {
            alert("close");
        },
        closeAllmodel() {
            this.$emit("closeAllmodel");
        }
    }
};
</script>

<style scoped >
.sd{
  background-image: url("./../../../assets/model1/sd.png");
}
.yd{
  background-image: url("./../../../assets/model1/yd.png");
}
.cj{
  background-image: url("./../../../assets/model1/cj.png");
}
.ld{
  background-image: url("./../../../assets/model1/ld.png");
}
.dw{
  background-image: url("./../../../assets/model1/dw.png");
}
.zq{
  background-image: url("./../../../assets/model1/zq.png");
}
.gq{
  background-image: url("./../../../assets/model1/gq.png");
}
.custom{
  background-image: url("./../../../assets/model1/zdy.png");
}


.bindphone {
    position: absolute;
    top: 20%;
    width: 19.375rem;
    height: 23.75rem;
    left: 50%;
    margin-left: -9.6875rem;
    letter-spacing: 0.0625rem;
    z-index: 80;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.zhezao {
    position: absolute;
    height: 100%;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.384);
    top: 0;
    z-index: 40;
}
/* 关闭按钮 */
.close {
    font-size: 2.5rem;
    position: absolute;
    color: white;
    bottom: -4.375rem;
    left: 50%;
    margin-left: -1.25rem;
}
</style>
