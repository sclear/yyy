<template>
  <div class="bindphone">
      <!-- 提示绑定 -->
      <div>
        <div class="bind-po">
            <img width="88" src="./../../../static/img/bindphoen.png" alt="">
        </div>
        <div class="mtl">
            <img width="176.5" src="./../../../static/img/nobind.png" alt="">
        </div>
        <div class="mtt">在进行操作前需要先绑定手机呢</div>
        <div class="ljbind">
            <img width="65" src="./../../../static/img/lbingd.png" alt="">
        </div>
      </div>
      <!-- 绑定手机号 -->
      <div>
          
      </div>


      <div class="close">
          <van-icon name="clear"/>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped >
.bindphone{
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
.bind-po{
    margin-top: 90px;
}
.mtl{
    margin-top: 42.5px;
}
.mtt{
/* 358 78 */
    margin-top:12px;
    font-size: 12px;
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
/* bind  btn*/
.ljbind{
    margin:0 auto;
    width:200px;
    height:28px;
    border-radius: 7px;
    background-color:#ff7801;
    padding-top: 10px;
    margin-top:35px;
}
</style>
