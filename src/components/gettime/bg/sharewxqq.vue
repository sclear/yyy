<template>
    <div ref="wxqqshares" class="zhezhao">
        <div v-if="!wxqqshare" class="sharewxqq">&nbsp;
            <div class="redtext">一天内最多可获得{{share}}次抽奖次数</div>
            <div class="shar-group">
                <div @click="shareWx" class="shar-wq">
                    <img src="./../../../../static/img/wx.png" alt="">
                    分享
                </div>
                <!-- <div class="shar-wq">
                    <img src="./../../../../static/img/qq.png" alt="">
                    分享给好友
                </div> -->
            </div>
            <div>
                <img @click="openCloseshare" class="delqqwx" width='16' src="./../../../../static/img/delshare.png" alt="">
            </div>
        </div>
        <div v-if="wxqqshare === true" class="sharewxqqs">&nbsp;
            <div class="redtext">一天内最多可获得{{share}}次抽奖次数</div>
            <div class="shar-group">
                <div @click="shareWx" class="shar-wq">
                    <img src="./../../../../static/img/wx.png" alt="">
                    分享
                </div>
                <!-- <div class="shar-wq">
                    <img src="./../../../../static/img/qq.png" alt="">
                    分享给好友
                </div> -->
            </div>
            <div>
                <img @click="openCloseshare" class="delqqwx" width='16' src="./../../../../static/img/delshare.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
import { getShare,addSHareSum } from "./../../../util.js/baseUrl.js";
import { mapState } from 'vuex'
export default {
    data() {
        return {
            share: this.$store.state.share
        };
    },
    props: {
        wxqqshare: Boolean
    },
    mounted() {
        this.$refs.wxqqshares.style.height = this.$store.state.wHeight + "px";
    },
    components: {},
    computed: {
        ...mapState(['id','tel'])
    },
    methods: {
        openCloseshare() {
            this.$emit("shareWqvh");
        },
        shareWx() {
            let objs = {
                id:this.id,
                tel:this.tel
            }
            addSHareSum(objs)
            .then(ress=>{})
            getShare().then(res => {
                var obj = {
                    title: res.data.data[0].Title,
                    img: res.data.data[0].imgurl,
                    des: res.data.data[0].Article,
                    url: 'https://'+document.domain+"/application/kxk01xyyj_nhqey/h5"
                };
                tmAndroidInf.share(JSON.stringify(obj));
            });
        }
    }
};
</script>

<style scoped >
.zhezhao {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.384);
    z-index: 50;
}
.shar-group {
    margin-top: 1.875rem;
    display: flex;
    justify-content: center;
}
.sharewxqq {
    height: 15.0625rem;
    width: 90%;
    margin: 3.125rem auto 0 auto;
    background-image: url("./../../../../static/img/shareqqwx.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.shar-wq {
    text-align: center;
    width: 5rem;
    font-size: 0.75rem;
}
.shar-wq > img {
    margin: 0 auto;
    display: block;
    width: 3.25rem;
    margin-bottom: 0.625rem;
}

.redtext {
    color: red;
    margin-top: 1.25rem;
    top: 3.125rem;
    font-size: 0.75rem;
}
.delqqwx {
    margin-top: 1.875rem;
}

.sharewxqqs {
    border-top-left-radius: 1.125rem;
    border-top-right-radius: 1.125rem;
    position: absolute;
    bottom: 0;
    height: 15.0625rem;
    width: 100%;
    margin: 3.125rem auto 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: white;
}
</style>
