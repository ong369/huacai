<template>
  <div class="screen-bottom-right">
    <div class="screen-bottom-header flex-l">
      <div class="header-left flex-c">
        <i class="iconfont icon-chart-line" />
      </div>
      <div class="header-right flex-l">
        <span class="header-title">{{ headertitle }}</span>
        <dv-decoration-3 class="dv-dec-3" />
      </div>
    </div>
    <div class="screen-chart-section2-1">
      <div>
        <Chart :chart-data="data.chartData"></Chart>
      </div>
      <div>
        <dv-scroll-board class="dv-scr-board" :config="data.listData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import Chart from "./chart/ChartBottomRight.vue";
import { getBottomRight } from "@/utils/getdatautil"; //微软signalr

const props = defineProps({
  headertitle: {
    type: String,
    default: () => "模块标题默认值",
  },
  linename: {
    type: String,
    default: () => "默认值",
  },
  module: {
    type: String,
    default: () => "Null",
  },
});

const data = reactive({
  listData: {
    header: ["日期", "型号", "目标(件)"],
    data: [],
    rowNum: 7, //表格行数
    headerHeight: 35,
    headerBGC: "#0f1325", //表头
    oddRowBGC: "#0f1325", //奇数行
    evenRowBGC: "#171c33", //偶数行
    index: false,
    columnWidth: [120, 200, 120],
    align: ["center"],
  },
  chartData :{
    year: 0,
    radarData: [] as Array<number>,
    indicator: [] as Array<{
      name: string;
      max: number;
    }>,
  }
});

/* const intervalInstance = ref(0); */

/* // methods
const confirmChartData = () => {
  // 清空轮询数据
  data.chartData.indicator = [];
  data.chartData.radarData = [];

  //chartData.radarindicator = [];

  const dateBase = new Date();
  data.chartData.year = dateBase.getFullYear();
  // 周数据
  for (let i = 0; i < 7; i++) {
    // 雷达图数据
    // 我的指标
    const averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
    const maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2);

    // 日期
    const date = new Date();
    const indicatorItem: {
      name: string;
      max: number;
    } = {
      name: [date.getMonth() + 1, date.getDate() + i + 1].join("/"),
      max: maxSpeed,
    };

    data.chartData.radarData.push(averageSpeed);
    data.chartData.indicator.push(indicatorItem);

   
  }
}; */

// 定时函数
/* const startTimeInterval = () => {
  confirmChartData();
  intervalInstance.value = window.setInterval(() => {
    confirmChartData();
  }, 3000);
}; */

// 生命周期
onMounted(() => {
  /* startTimeInterval(); */
  getBottomRight(props.module, data);
});

onUnmounted(() => {
  /*  window.clearInterval(intervalInstance.value); */
});

/* watch(() => data.listData,
  (val: any) => {
   
  },
  {
    immediate: true,
    deep: true,
  }); */

</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";

.screen-bottom-right {
  height: $box-height7;
  // width: $box-width3;
  background-color: $theme-sub-color;
  margin: 8px 8px 5px 8px;
  border-radius: 10px;

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

      .dv-dec-3 {
        width: 50px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }

  .screen-chart-section2-1 {
    width: 100%;
    height: calc(100% - 40px);
    margin-top: 0px;
    display: grid;
    grid-template-columns: 5fr 5fr;
    grid-column-gap: 5px;
  }
}
</style>
