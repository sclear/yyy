<template>
     <vue-seamless-scroll :class-option="classOption" :data="listData" class="seamless-warp">
        <ul class="item">
            <li v-for="(item,index) in listData" :key='index'>
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span>
            </li>
        </ul>
    </vue-seamless-scroll>

    <!-- </div> -->

</template>

<script>
// import vueSeamless from 'vue-seamless-scroll'
export default {
    data() {
        return {
            list: [
                {
                    name: "刘**",
                    time: "一小时前",
                    prize: "现金红包"
                },
                {
                    name: "刘**",
                    time: "一小时前",
                    prize: "现金红包"
                },
                {
                    name: "刘**",
                    time: "一小时前",
                    prize: "现金红包"
                },
                {
                    name: "刘**",
                    time: "一小时前",
                    prize: "现金红包"
                },
                {
                    name: "刘**",
                    time: "一小时前",
                    prize: "现金红包"
                }
            ],
             listData: [{
                   'title': '无缝滚动第一行无缝滚动第一行',
                   'date': '2017-12-16'
                 }, {
                    'title': '无缝滚动第二行无缝滚动第二行',
                    'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第三行无缝滚动第三行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第四行无缝滚动第四行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第五行无缝滚动第五行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第六行无缝滚动第六行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第七行无缝滚动第七行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第八行无缝滚动第八行',
                     'date': '2017-12-16'
                 }, {
                     'title': '无缝滚动第九行无缝滚动第九行',
                     'date': '2017-12-16'
                 }]
        };
    },
    methods: {
        conso() {
            this.$refs.translate.style.transition = `all ${2*this.list.length}s linear`;
            this.$refs.translate.style.marginTop = -1.5625*(this.list.length-1) + 'rem';
            setTimeout(()=>{
                this.$refs.translate.style.transition = `all ${2*this.list.length}s linear`;
                this.$refs.translate.style.marginTop = '0';
                // console.log("dierci")
                this.conso()
            },2000*this.list.length)
        }
    },
    mounted() {
        // setTimeout(() => {
        //     this.conso();
        // }, 1000);
    },
    // height: 1.5625rem;
    components: {
        // vueSeamless
    },
    computed: {
                classOption () {
                    return {
                        step:1,
                             direction: 1,
                            limitMoveNum: 1,
                        }
                },
                optionSingleHeightTime () {
                    return {
                            singleHeight: 26,
                            waitTime: 2500
                        }
                }
             }
};
</script>

<style scoped >

.seamless-warp {
    height: 20px;
    overflow: hidden;
}



.dingwei {
    margin: 0;
}
.chongfu {
    margin: 1.25rem auto 0 auto;
    /* height: 1.5625rem; */
    width: 80%;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.514);
    /* overflow: hidden; */
}
.winPrize {
    margin: 1.25rem auto 0 auto;
    margin: 0 auto;
    width: 100%;
    height: 1.5625rem;
    font-size: 0.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    transition: all 3s linear;
}
.picTx {
    height: 80%;
}
.winPeople {
    height: 1.5625rem;
    line-height: 1.5625rem;
    /* margin-left: 1.25rem; */
    overflow: hidden;
}
.fs10 {
    font-size: 0.625rem;
}
.fs12 {
    font-size: 0.75rem;
}
.color-red {
    color: rgba(230, 58, 54);
}
</style>
