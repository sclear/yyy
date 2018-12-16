<template>
    <div class="adress">
        <j-modelone @closeAllmodel='closeAllmodel'>
            <div slot="modelone">
                <!--优惠券 领取成功 -->

                    

                <!-- 信息提交成功 -->
                <div v-if="msgDetail2">
                    <div>
                        <img class="sucessMsg" src="./../../../../static/img/msgcg.png" alt="">
                    </div>
                    <div class="seeTo">请注意查看</div>
                    <div class="seeTt">奖品到账情况</div>
                    <div class="ljbind backC">
                        <img @click='backChoujiang' width="65" src="./../../../../static/img/backchou.png" alt="">
                    </div>
                </div>
            </div>
        </j-modelone>

        
        <!-- 三级联动 -->
    </div>
</template>

<script>
import jModelone from "./../../popup/model/modelone";
export default {
    data() {
        return {
            msgDetail1: true,
            msgDetail2: false,
        };
    },
    methods: {},
    components: {
        jModelone
    },
    methods: {
        //提交信息
        tijiaoMse(){
            this.msgDetail1 = false;
            this.msgDetail2 = true;

        
        },
        //返回抽奖
        backChoujiang(){
            this.$router.push({path:'/page'})
        },
        //关闭model
        closeAllmodel(){
            this.$emit('closeAllmodel')
        },
        //触发三级联动
        OpenThrees(res) {
            this.show = true;
            this.change_num = res;
        },
        //三级联动数据
        onSelect(res){
            if(this.change_num === 0){
                this.adress_a = res.name;
                setTimeout(()=>{
                       this.actions=
            [

                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "1"
                },
                {
                    name: "2"
                },
                {
                    name: 3
                },
                {
                    name: "4"
                }
            ]
                },500)
            } else if(this.change_num === 1){
                this.adress_b = res.name
            } else{
                this.adress_c = res.name
            }
            // console.log(res.name);
            this.show = false;
        }
    }
};
</script>

<style scoped >
input {
    font: icon !important;
    border-radius: 0.375rem;
    border: none;
    box-shadow: 0.0625rem 0.0625rem 0.625rem #888;
    padding-left: 0.9375rem;
}
input::-webkit-input-placeholder {
    color: rgb(83, 83, 84);
    font-size: 0.75rem;
    text-align: left;
}
.msg-name {
    height: 2.25rem;
    width: 80%;
    margin-top: 0.4375rem;
}
.mtNmae {
    margin-top: 1.875rem;
}
.mt7 {
    margin-top: 7px;
}
select {
    width: 30%;
    height: 3.9375rem;
}

.gerenMsg {
    width: 6.5625rem;
    margin-top: 5rem;
}
/* bind btn*/
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 1rem;
}

/* 提交信息成功 */
.sucessMsg {
    width: 11.0625rem;
    margin-top: 6.875rem;
}
.seeTo {
    margin-top: 2.8125rem;
}
.seeTt {
    margin-top: 1.25rem;
}
.backC {
    margin-top: 3.75rem;
}
.boxR{
    width:100%;
    display: flex;
    justify-content: space-between;
}
.divBox {
    width: 70px;
    height: 2.25rem;
    border-radius: 0.375rem;
    box-shadow: 0.0625rem 0.0625rem 0.625rem #888;
    position: relative;
    line-height: 2.25rem;
    /* text-align: center; */
}
.divBox1{
    margin-left: 1.5rem;
}
.divBox3{
    margin-right:  1.5rem;
}
.divBox:after {
    content: "";
    width: 14px;
    height: 8px;
    position: absolute;
    right: 5px;
    top: 40%;
    pointer-events: none;
    background: url("./../../../../static/img/xiala.png") no-repeat center;
    background-size: 100% 100%;
}
.group-select {
    position: absolute;
    top: 2.25rem;
    left: 0;
    height: 11.25rem;
    width: 98%;
    overflow: auto;
}
.group-selectdetail {
    height: 2.25rem;
    width: 98%;
    background-color: beige;
}
.threeS{
    width:27%;
    height:2.375rem;
    line-height: 2.375rem;
    display: inline-block;
     border-radius: 0.375rem;
    box-shadow: 0.0625rem 0.0625rem 0.625rem #888;
}
</style>
