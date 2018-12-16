<template>
    <j-modelone @closeAllmodel='closeAllmodel'>
        <div slot="modelone">
            <div class="rule_group">
                <div class="rule">
                    <img class="rule-img" width="60" src="./../../../static/img/rule.png" alt="">
                    
                    <div v-for="(item,index) in arrString" :key='index' class="indet40"> <span class="j-radius">●</span>{{item}}</div>
                    <!-- <div class="indet40"> <span class="j-radius">●</span> 抽奖规则:</div>
                    <div class="textIndet">用户每天可以免费活的20次抽奖机会</div>
                    <div class="textIndet">用户可以通过分享或者购买的方式获得抽奖次数</div>
                    <div class="indet40"> <span class="j-radius">●</span> 奖品类型:</div>
                    <div class="textIndet">实物奖品:我们通过对获奖用户填写的个人信息,进行奖品的发放</div>
                    <div class="textIndet">虚拟奖品:现金红包,积分，优惠卷,在规定时间内发放到绑定的手机号中</div>
                    <div class="indet40"> <span class="j-radius">●</span> 如有任何疑问,请拨打123456,进行咨询</div>
                    <div class="indet40"> <span class="j-radius">●</span> 活动的最终解释权归活动承办方所有</div>
                    <div class="indet40"> <span class="j-radius">●</span> 活动的最终解释权归活动承办方所有</div>
                    <div class="indet40"> <span class="j-radius">●</span> 活动的最终解释权归活动承办方所有</div>
                    <div class="indet40"> <span class="j-radius">●</span> 活动的最终解释权归活动承办方所有</div>
                    <div class="indet40"> <span class="j-radius">●</span> 活动的最终解释权归活动承办方所有</div> -->
                </div>
            </div>
        </div>
    </j-modelone>
</template>

<script>
import jModelone from "./model/modelone";
export default {
    data() {
        return {
            arrString:[]
        };
    },
    components: {
        jModelone
    },
    created() {
      let arr = this.$store.state.activity_rules.split('\n')
      this.arrString = arr;
    },
    methods: {
        closeAllmodel() {
            // console.log("关闭");
            this.$emit("closeAllmodel");
        }
    }
};
</script>

<style scoped >
.rule_group{
    margin-top: 1.5rem;
    /* height:auto; */
    overflow: scroll;
    height: 21rem;
}
.rule {
    width: 15rem;
    font-size: 0.75rem;
    margin-left: 2.5rem;
}
.rule div {
    text-align: left;
    line-height: 1.25rem;
}
.rule-img {
    margin-left: -2.5rem;
}
.j-radius {
    color: red;
    font-size: 0.75rem;
    line-height: 1.25rem;
    display: inline-block;
    text-align: center;
    text-indent: 1.25rem;
}
.textIndet {
}
.indet40 {
    text-indent: -1.7rem;
}
</style>
