<template>
    <div class="screen-bottom-left">
        <div class="screen-bottom-header flex-l">
            <div class="header-left flex-c">
                <i class="iconfont icon-align-left" />
            </div>
            <div class="header-right flex-l">
                <!-- <span class="header-title">城市销量排行</span> -->
                <span class="header-title">{{headertitle}}</span>
                <dv-decoration-1 class="dv-dec-1" />
            </div>
        </div>
        <div class="screen-bottom-chart">
            <Chart :chart-data="chartData"></Chart>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from './chart/ChartBottomLeft.vue'
import {  reactive, onMounted } from 'vue'
import { getBottomLeft } from "@/utils/getdatautil"; //微软signalr

const props = defineProps({
    headertitle:{
        type: String,
        default: () => "模块标题默认值"
    },
    linename: {
        type: String,
        default: () => "默认值"
    },
    module: {
        type: String,
        default: () => "Null"
    },
});

/* console.log(props); */

const chartData = reactive({
    category: [] as Array<string>,
    lineData: [] as Array<number>,
    barData: [] as Array<number>,
    rateData: [] as Array<string>
})



// methods
/* const setData = () => {
    for (let i = 0; i < chartData.barData.length ; i++) {
        
        const rate = chartData.barData[i] / chartData.lineData[i];
        chartData.rateData.push(rate.toFixed(2));
    }
}
 */
// 生命周期
onMounted(() => {
    /* setData() */
    getBottomLeft(props.module,chartData);
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/variables.scss';

.screen-bottom-left {
    height: $box-height6 - 10px;
    // width: $box-width3;
    background-color: $theme-sub-color;
    margin: 15px 8px 10px 8px;
    border-radius: 20px;

    .screen-bottom-header {
        height: $chart-header-height;

        .header-left {
            width: 40px;
        }

        .header-right {
            width: calc(100% - 40px);

            .header-title {
                color: #fff;
                font-size: $sm-font-size;
            }

            .dv-dec-1 {
                width: 50px;
                height: 20px;
                margin-left: 10px;
            }
        }
    }
}
</style>