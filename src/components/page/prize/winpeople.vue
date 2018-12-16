<template>
    <div class="border-radius">
        <vue-seamless-scroll v-if="listData.length > 0" :class-option="classOption" :data="listData" class="seamless-warp">
            <ul class="item">
                <li v-for="(item,index) in listData" :key='index' class="people-group">
                    <div class="imgTx">
                    </div>
                    <div>
                        <span>恭喜</span>
                        <span class="color-redss">{{item.user | telephone}}</span>
                        <span>在</span>
                        <span class="color-redss">{{item.gettime | telephones}}分前</span>
                        <span>获得了</span>
                        <span class="color-redss fs12">{{item.goods | prizeName}}</span>
                    </div>
                </li>
            </ul>
        </vue-seamless-scroll>

    </div>
</template>

<script>
import { getNew } from "./../../../util.js/baseUrl.js";
export default {
    data() {
        return {
            name: "",
            listData: []
        };
    },
    filters: {
        telephone: function(res) {
            if (true) {
                return res.slice(0,3)+'***'+res.slice(7,11)
            }
        },
        telephones: function(res) {
            var Nowtime = new Date().getTime() * 1000;
            let timeTep = Nowtime - res;
            var minute = Math.floor(((timeTep % 86400) % 3600) / 60);
            return minute;
        },
        prizeName: function(res) {
            if (res) {
                if (res.length > 4) {
                    return res.slice(0, 4) + "...";
                }
                return res;
            }

            // if(res.length > 4){
            //     console.log(8889)
            //     // return res.slice(0,4)+'...'
            // }
            // return res
        }
    },
    mounted() {
        getNew().then(res => {
            // console.log(res)
            this.listData = res.data.data;
        });
    },
    computed: {
        classOption() {
            if (true) {
                return {
                    step: 0.2,
                    direction: 1,
                    limitMoveNum: 1
                };
            }
        }
    }
};
</script>


<style scoped>
.seamless-warp {
    margin-top: 1.25rem;
    height: 1.5625rem;
    overflow: hidden;
}
.border-radius {
    background-color: rgba(255, 255, 255, 0.514);
    width: 80%;
    margin: 0 auto;
    border-radius: 0.5rem;
    position: relative;
    z-index: 10;
    font-size: 0.75rem;
    height: 1.5625rem;
}
.people-group {
    /* display: flex;
    justify-content: space-around; */
}
.people-group > div:last-child {
    line-height: 1.5625rem;
    text-align: left;
    text-align: center;
}
.color-redss {
    color: red !important;
}
.imgTx > img {
    height: 1.25rem;
    width: 1.25rem;
    float: left;
    border-radius: 50%;
    margin-right: 0.3125rem;
}
.imgTx {
    padding-left: 0.3125rem;
}
</style>
