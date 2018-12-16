<template>
  <div ref="bgs" class="bg-vue" :class="bgImg">
    <div class="flex-center">
      <div>
        <img @click="shareWqvh" class="share-get" src="./../../../../static/img/sdian.png" alt>
      </div>
      <div>
        <img class="title-get" :src="titleName" alt>
      </div>
      <div>
        <img @click="backPage" class="del-get" src="./../../../../static/img/del.png" alt>
      </div>
    </div>
    <slot name="contents"></slot>

    <!-- 分享到qq 微信 好友 -->
    <j-sharewxqq v-if="shareWq" @shareWqvh="shareWqvh"></j-sharewxqq>
  </div>
</template>

<script>
import { mapState } from "vuex";
import jSharewxqq from "./sharewxqq";
export default {
  data() {
    return {
      shareWq: false,
      bgImg: "" //切换主题背景
    };
  },
  mounted() {
    
    setTimeout(()=>{
        this.getbg();
    },300)
  },
  props: {
    titleName: ""
  },
  components: {
    jSharewxqq
  },
  methods: {
    share() {},
    backPage() {
        // alert('999')
    //   this.$router.push("/page");
    this.$emit('backhome')
    },
    shareWqvh() {
      if (this.shareWq === false) {
        this.shareWq = true;
      } else {
        this.shareWq = false;
      }
    },
    getbg() {
      this.$refs.bgs.style.height = this.$store.state.wHeight + "px";
      switch (this.thems) {
        case "0":
          this.bgImg = "sd";
          break;
        case "1":
          this.bgImg = "yd";
          break;
        case "2":
          this.bgImg = "cj";
          break;
        case "3":
          this.bgImg = "ld";
          break;
        case "4":
          this.bgImg = "dw";
          break;
        case "5":
          this.bgImg = "zq";
          break;
        case "6":
          this.bgImg = "gq";
          break;
        case "7":
          this.bgImg = "zdy";
          break;
      }
    }
  },
  computed: {
    ...mapState(["thems"])
  }
};
</script>

<style scoped >
.sd {
  background-image: url("./../../../assets/a_box/sd.png");
}
.yd {
  background-image: url("./../../../assets/a_box/yd.png");
}
.cj {
  background-image: url("./../../../assets/a_box/cj.png");
}
.ld {
  background-image: url("./../../../assets/a_box/ld.png");
}
.dw {
  background-image: url("./../../../assets/a_box/dw.png");
}
.zq {
  background-image: url("./../../../assets/a_box/zq.png");
}
.gq {
  background-image: url("./../../../assets/a_box/gq.png");
}
.zdy {
  background-image: url("./../../../assets/a_box/zdy.png");
}

.bg-vue {
  width: 100vw;
  box-sizing: border-box;
  padding: 1.25rem 1.5rem 0 1.5rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.flex-center {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.share-get {
  width: 1.4375rem;
}
.title-get {
  width: 4.9375rem;
}
.del-get {
  width: 1.96875rem;
}
</style>
