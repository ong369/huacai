<template>
    <div class="screen-top-right2">
        <div class="screen-top-header flex-l">
            <div class="header-left flex-c">
                <i class="icomoon icon-assemble" />
            </div>
            <div class="header-right flex-l">
                <span class="header-title">{{headertitle}}</span>
                <dv-decoration-1 class="dv-dec-1" />
            </div>
        </div>
        <div class="screen-top-chart">
            <dv-scroll-board class="dv-scr-board" :config="config" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive,onMounted } from 'vue';
import { getTopRight } from "@/utils/getdatautil"; //微软signalr

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

onMounted(()=>{
    
    getTopRight(props.module,config);

});

const config = reactive({
    header: ['外壳条码', '内胆条码', '装配时间'],
    data: [
        ['46541324', '11496', "<span class='scr-up'>↑22%</span>"],
        ['46541324', '7884', "<span class='scr-down'>↓13%</span>"],
        ['46541324', '5724', "<span class='scr-up'>↑32%</span>"],
        ['46541324', '5033', "<span class='scr-up'>↑34%</span>"],
        ['46541324', '4345', "<span class='scr-up'>↑25%</span>"],
        ['46541324', '4224', "<span class='scr-up'>↑13%</span>"],
        ['46541324', '3686', "<span class='scr-up'>↑24%</span>"],
        ['46541324', '3125', "<span class='scr-down'>↓16%</span>"],
        ['46541324', '2936', "<span class='scr-down'>↓23%</span>"],
        ['46541324', '2221', "<span class='scr-up'>↑45%</span>"]
    ],
    rowNum: 7, //表格行数
    headerHeight: 35,
    headerBGC: '#0f1325', //表头
    oddRowBGC: '#0f1325', //奇数行
    evenRowBGC: '#171c33', //偶数行
    index: true,
    columnWidth: [50],
    align: ['center']
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/variables.scss';

.screen-top-right2 {
    height: $box-height5 - 5px;
    // width: $box-width5;
    background-color: $theme-sub-color;
    margin: 15px 8px 10px 8px;
    border-radius: 20px;

    .screen-top-header {
        height: $chart-header-height;

        .header-left {
            width: 30px;
        }

        .header-right {
            width: calc(100% - 30px);

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

    .screen-top-chart {
        .dv-scr-board {
            width: 100%;
            height: 340px;
        }
    }
}
</style>