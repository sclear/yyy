<template>
  <div>
    <j-mode @closeAllmodel='closeAllmodel'>
      <div slot="modelone">
        <div>
          <img class="saiml" src="./../../../../static/img/smai.png" alt="">
        </div>
        <div>
          <img class="dcuess" src="./../../../../static/img/dcg.png" alt="">
        </div>
        <div class="hint">你可以继续参与摇一摇抽奖了哦！祝你好运</div>
        <div @click='backchoujiang' class="ljbind">
          <img width="65" src="./../../../../static/img/back.png" alt="">
        </div>
      </div>

    </j-mode>
  </div>
</template>

<script>
import jMode from "./../../popup/model/modelone";
export default {
    data() {
        return {};
    },
    props: {
      dGou:Number
    },
    components: {
        jMode
    },
    methods: {
      backchoujiang() {
        this.$emit('backhome')
        // this.$router.push({path:'/page'})
      },
      closeAllmodel(){
        this.$emit('closeAllmodel')
      }
    }
};
</script>

<style scoped >
.saiml{
  width:6.875rem;
  margin-top: 2.9rem;
}
.dcuess{
  width:4.1875rem;
  margin-top: 30px;
}
.hint{
  font-size: .75rem;
  margin-top: 10px;
}
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 2.1875rem;
}
</style>
