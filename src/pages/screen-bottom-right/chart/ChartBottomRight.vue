<template>
  <mEcharts
    :options="state.options"
    :height="state.height"
    :width="state.width"
  ></mEcharts>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";

const props = defineProps({
  // 图表数据项
  chartData: {
    type: Object,
    default: () => ({
      year: 0,
      radarData: [] as Array<Array<number>>,
      indicator: [] as Array<{
        name:string,
        max:number
      }>,
    }),
  },
});

/* const { chartData } = props;
const chartRef = ref(); */
// 定义颜色
const colorList = {
  linearYtoG: {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "#f5b44d",
      },
      {
        offset: 1,
        color: "#28f8de",
      },
    ],
  },
  linearGtoB: {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "#43dfa2",
      },
      {
        offset: 1,
        color: "#28f8de",
      },
    ],
  },
  linearBtoG: {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 0,
        color: "#1c98e8",
      },
      {
        offset: 1,
        color: "#28f8de",
      },
    ],
  },
  areaBtoG: {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "rgba(35,184,210,.2)",
      },
      {
        offset: 1,
        color: "rgba(35,184,210,0)",
      },
    ],
  },
};

const state = reactive({
  height: "100%",
  width: "100%",
  options: {
    /* title: {
            text: "",
            textStyle: {
                color: "#D3D6DD",
                fontSize: 24,
                fontWeight: "normal",
                show:false
            },
            subtext: chartData.year + "/" + chartData.weekCategory[6],
            subtextStyle: {
                color: "#fff",
                fontSize: 16
            },
            top: 50,
            left: 80
        }, */
    /* legend: {
            top: 120,
            left: 80,
            orient: "vertical",
            itemGap: 15,
            itemWidth: 12,
            itemHeight: 12,
            data: ["线下销售"],
            textStyle: {
                color: "#fff",
                fontSize: 14,
            }
        }, */
    /* tooltip: {
            trigger: "item"
        }, */
    radar: {
      center: ["50%", "50%"],
      radius: "73%",
      name: {
        color: "#fff",
      },
      shape: "circle",
      splitNumber: 5,
      axisName: {
        color: "rgb(238, 197, 102)",
      },
      axisLine: {
        lineStyle: {
          color: colorList.linearYtoG,
          opacity: 0.6,
          /* color: [
                            'rgba(238, 197, 102, 0.1)',
                            'rgba(238, 197, 102, 0.2)',
                            'rgba(238, 197, 102, 0.4)',
                            'rgba(238, 197, 102, 0.6)',
                            'rgba(238, 197, 102, 0.8)',
                            'rgba(238, 197, 102, 1)'
                            ].reverse() */
        },
      },
      splitLine: {
        lineStyle: {
          /* color: colorList.linearYtoG,
                    opacity: 0.6 */
          color: "rgba(238, 197, 102, 0.5)",
        },
      },
      splitArea: {
        /* areaStyle: {
                    color: "#fff",
                    opacity: 0.1,
                    shadowBlur: 25,
                    shadowColor: "#000",
                    shadowOffsetX: 0,
                    shadowOffsetY: 5
                } */
        show: false,
      },
      indicator: [
        {
          name: "08/09",
          max: 20,
        },
        {
          name: "08/10",
          max: 20,
        },
        {
          name: "08/11",
          max: 20,
        },
        {
          name: "08/12",
          max: 20,
        },
        {
          name: "08/13",
          max: 20,
        },
        {
          name: "0/14",
          max: 20,
        },
        {
          name: "0/15",
          max: 20,
        },
      ],
    },
    series: [
      {
        name: "",
        type: "radar",
        symbolSize: 0,
        lineStyle: {
          normal: {
            opacity: 0.3,
          },
        },
        areaStyle: {
          /* normal: {
            color: "#f8d351",
            shadowBlur: 25,
            shadowColor: "rgba(248,211,81,.3)",
            shadowOffsetX: 0,
            shadowOffsetY: -10,
            opacity: 1,
          }, */
          opacity: 0.3
        },
        itemStyle: {
          normal: {
            color: "#f8d351",
          },
        },
        data: [
          {
            value: [3, 5, 5, 1, 2, 3, 1],
            name: "目标",
          }
        ],
      },
    ],
  },
});

watch(
  () => props.chartData,
  (val: any) => {
    state.options.series[0].data[0].value=val.radarData;
    if(val.indicator !== undefined && val.indicator.length>0) {
      state.options.radar.indicator=val.indicator;
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style scoped></style>
