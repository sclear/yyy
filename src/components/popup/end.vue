<template>
    <div class="end">
        <j-modelone @closeAllmodel='closeAllmodel'>
            <div slot="modelone">
                <div>
                    <img v-if="timeJQ === 1" class="end1" src="./../../../static/img/end1.png" alt="">
                     <img v-if="timeJQ === 0" class="end1" width="100" src="./../../../static/img/gql.png" alt="">
                </div>
                <div>
                    <img v-if="timeJQ === 1" class="end2" src="./../../../static/img/end2.png" alt="">
                    <img v-if="timeJQ === 0" class="end2" src="./../../../static/img/lll.png" alt="">
                   
                </div>
                <div>
                    <img class="end3" src="./../../../static/img/end3.png" alt="">
                </div>
                <div @click="seeRule" class="ljbind">
                    <img class="end4" src="./../../../static/img/end4.png" alt="">
                </div>
            </div>
        </j-modelone>
    </div>
</template>

<script>
import jModelone from "./model/modelone";
export default {
    data() {
        return {};
    },
    props:{
        timeJQ:Number
    },
    components: {
        jModelone
    },
    mounted() {
    },
    methods: {
        closeAllmodel() {
            this.$emit("closeAllmodel");
        },
        seeRule() {
            this.$emit('seeRule')
        }
    }
};
</script>

<style scoped >
.ljbind {
    margin: 0 auto;
    width: 12.5rem;
    height: 1.75rem;
    border-radius: 0.4375rem;
    background-color: #ff7801;
    padding-top: 0.625rem;
    margin-top: 2.1875rem;
}
.end1 {
    width: 6.25rem;
    margin-top: 4rem;
}
.end2 {
    width: 13.46875rem;
    margin-top: 2.5rem;
}
.end3 {
    width: 4.71875rem;
    margin-top: 0.8125rem;
}
.end4 {
    width: 5.28125rem;
}
</style>
