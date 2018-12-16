<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
</van-pull-refresh>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false
    };
  },
  methods: {
     onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>

<style scoped >
</style>
