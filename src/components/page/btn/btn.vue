<template>
    <div class="jbtn">
        <div class="prizeCount">
            <img @click='toGettime' class="getPrize" src="./../../../../static/img/get.png" alt="">
        </div>
        <div class="Y-btn" @click="getPrize">
            <img class="yImg animated pulse tada infinite" src="./../../../../static/img/phone.png" alt="">
            <img class="yText" src="./../../../../static/img/ybtn.png" alt="">
        </div>
        <div class="prizeCount">
            <img @click='toMyprize' class="getPrize" src="./../../../../static/img/prize.png" alt="">
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

  },
  methods: {
      toGettime() {
          if(!this.$store.state.status_s){
              this.$emit('showEndh')
            
              return
          }
          if(!this.$store.state.id){
              this.$emit('showLogin')
              return
          }
          this.$emit('backHome',1)
        //   this.$router.push({path:'/gettime'})
      },
      toMyprize() {
        //   this.$emit('showLogin')
          if(!this.$store.state.id){
              this.$emit('showLogin')
              return
          }
          this.$emit('backHome',2)
        //   this.$router.push({path:'/myprize'})
      },
      getPrize(){
          this.$emit('getPrize')
      }
  }
}
</script>

<style scoped >
.jbtn{
     padding:auto 5%;
     height:5rem;
     width:100%;
     display: flex;
     flex-direction:row;
     flex-wrap: nowrap;
     justify-content: center;
     font-size:0.9375rem;
     margin-top: 15%;
     color:rgba(247, 173, 16) 
}
 .jbtn div{
     height:3.625rem;
     margin:0 3%;
}
 .Y-btn{
     width:11.25rem;
     background-color:#f7ad10;
     border-radius: 0.9375rem;
     position: relative;
}
 .getPrize{
     height:1.125rem;
}
 .yImg{
     max-height: 90%;
     max-width: 20%;
     position: absolute;
     left:.1875rem;
     top: .625rem;
}
 .yText{
     max-height: 40%;
     max-width: 70%;
     position: absolute;
     left:2.3rem;
     top: 1.25rem;
}
 .prizeCount{
     line-height: 3.625rem;
}
 
</style>
