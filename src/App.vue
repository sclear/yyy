<template>
  <div id="app">
    <!-- <router-view/> -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>

</template>

<script>
export default {
  name: 'App',
   provide() { // 注册一个方法
    return {
      reload: this.reload
    }
  },
   data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
        console.log('reload')
      })
    }
  }
  //  created () {
  //   let login = localStorage.getItem('user');
  //   if(!login){
  //       this.$router.push({path:'/hello'})
  //   }  
  // },
}
</script>

<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
html,body{
  margin:0;
  padding:0;
  height: 100%;

}
</style>
