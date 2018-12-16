<template>
  <div class="timing">
    <div class="timOut" ref="colorZ">距离此次摇一摇结束还有:{{day}}天</div>
    <div class="relat"><img src="./../../../../static/img/timing.png" alt="">
      <div class="hours">{{hr}}</div>
      <div class="minit">{{min}}</div>
      <div class="sec">{{sec}}</div>
    </div>
  </div>
</template>

<script>
import { getTime,getActivity } from "./../../../util.js/baseUrl.js";
export default {
    data() {
        return {
            day: '00',
            hr: '00',
            min: '00',
            sec: '00',
            Endtime: "",

            newsTime:0,     //服务器当前时间戳  


        };
    },
    mounted: function() {
        getTime().then(res => {
            this.newsTime = res.data.data[0][0].time*1000;

            this.$store.state.nowtimes = this.newsTime;
            let NOW = new Date(this.newsTime);
            let Nowstring = String(h) + String(m) + String(s);
            if (res.data.data[0].start_time * 1000 < NOW.getTime() && NOW.getTime() < res.data.data[0].end_time * 1000 && res.data.data[0].status ===1) {
            // if (res.data.data[0].start_time * 1000 < NOW.getTime() && NOW.getTime() < res.data.data[0].end_time * 1000) {
            } else{
              return
            }
            let date = new Date(res.data.data[0].end_time * 1000);
            let Y = date.getFullYear();
            let M = date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1):date.getMonth() + 1;
            let D = date.getDate();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            this.Endtime = Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s;
            this.countdown();
        });

        if(!this.$store.state.thems){
            getActivity().then(res => {
                this.$store.state.thems = res.data.data[0].themes;
                switch (res.data.data[0].themes) {
                    case "0":
                        this.$refs.colorZ.style.color = "white";
                        break;
                    case "2":
                        this.$refs.colorZ.style.color = "white";
                        break;
                    case "5":
                        this.$refs.colorZ.style.color = "white";
                        break;
                }
            })
        } else{
            switch (this.$store.state.thems) {
                    case "0":
                        this.$refs.colorZ.style.color = "white";
                        break;
                    case "2":
                        this.$refs.colorZ.style.color = "white";
                        break;
                    case "5":
                        this.$refs.colorZ.style.color = "white";
                        break;
                }
        }
    },
    components: {},
    methods: {
        countdown: function(res) {
            const end = Date.parse(new Date(this.Endtime));
            const now = Date.parse(new Date(this.newsTime));
            const msec = end - now;
            let day = parseInt(msec / 1000 / 60 / 60 / 24);
            let hr = parseInt((msec / 1000 / 60 / 60) % 24);
            let min = parseInt((msec / 1000 / 60) % 60);
            let sec = parseInt((msec / 1000) % 60);
            this.day = day;
            this.hr = hr > 9 ? hr : "0" + hr;
            this.min = min > 9 ? min : "0" + min;
            this.sec = sec > 9 ? sec : "0" + sec;
            if(this.newsTime >= end){
                return
            }

            let that = this;
            this.newsTime += 1000;
            setTimeout(function() {
                that.countdown();
            }, 1000);
        }
    },
    computed: {
        thenms_s() {
            return this.$store.state.thems
        }
    }
};
</script>

<style scoped >
.timing {
    height: 1.375rem;
    color: white;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 0.625rem;
}
.timOut {
    height: 1.375rem;
    font-size: 1rem;
    line-height: 1.375rem;
    margin-right: 0.3125rem;
    color:#535354;
}
.timing div img {
    width: 6.25rem;
    height: 1.375rem;
}
.relat {
    position: relative;
}
.hours {
    font-size: 0.875rem;
    position: absolute;
    letter-spacing: 0.375rem;
    top: 0.1875rem;
    left: 0.5625rem;
}
.minit {
    font-size: 0.875rem;
    position: absolute;
    letter-spacing: 0.3125rem;
    top: 0.1875rem;
    left: 2.5rem;
}
.sec {
    font-size: 0.875rem;
    position: absolute;
    letter-spacing: 0.625rem;
    top: 0.1875rem;
    left: 4.4375rem;
}
</style>
