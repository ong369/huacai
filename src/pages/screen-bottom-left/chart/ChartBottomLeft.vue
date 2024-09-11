<template>
    <mEcharts :options="state.options" :height="state.height" :width="state.width"></mEcharts>
</template>

<script setup lang="ts">
import {  reactive, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
    // 图表数据项
    chartData: {
        type: Object,
        default: () => ({
            category: [] as Array<string>,
            lineData: [] as Array<number>,
            barData: [] as Array<number>,
            rateData: [] as Array<string>
        }),
    }
})

/* const { chartData } = props; */
/* const chartRef = ref() */
const state = reactive({
    height: '400px',
    width: '100%',
    options: {
        tooltip: {
            show: true,
            trigger: "item",
            axisPointer: {
                type: "shadow",
                label: {
                    show: true,
                    backgroundColor: "#7B7DDC"
                }
            }
        },
        legend: {
            show: true,
        },
        grid: {
            x: "8%",
            width: "88%",
            top: "5%",
            bottom: '7%'
        },
        xAxis: {
            data: props.chartData.category,
            axisLine: {
                lineStyle: {
                    color: "#B4B4B4"
                }
            },
            axisTick: {
                show: false
            }
        },
        yAxis: [
            {
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "#B4B4B4"
                    }
                },

                axisLabel: {
                    formatter: "{value} "
                }
            },
            {
                splitLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "#B4B4B4"
                    }
                },
                axisLabel: {
                    formatter: "{value} "
                }
            }
        ],
        series: [
            {
                name: "完成率",
                type: "line",
                smooth: true,
                label: {
                    show: true,
                    position: 'bottom',
                    textStyle: {
                        fontSize: 14,
                        color:"#ffffff"
                    }
                },
                showAllSymbol: true,
                symbol: "emptyCircle",
                symbolSize: 8,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: "#ffdb5c"
                    }
                },
                data: props.chartData.rateData
            },
            {
                name: "产量",
                type: "bar",
                barWidth: 10,
                /* label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        fontSize: 14
                    }
                }, */
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#e7bcf3" },
                            { offset: 1, color: "#3EACE5" }
                        ])
                    }
                },
                data: props.chartData.barData
            },
            {
                name: "目标",
                type: "bar",
                barGap: "-100%",
                barWidth: 10,
                /* label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                    fontSize: 14
                    }
                }, */
                itemStyle: {
                    normal: {
                        barBorderRadius: 5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(50,197,233,0.8)" },
                            { offset: 0.2, color: "rgba(50,197,233,0.5)" },
                            { offset: 1, color: "rgba(50,197,233,0.2)" }
                        ])
                    }
                },
                z: -12,
                data: props.chartData.lineData
            }
        ]
    }
})


watch(
  () => props.chartData,
  (val: any) => {
    state.options.xAxis.data=val.category;
    state.options.series[0].data=val.rateData;
    state.options.series[1].data=val.barData;
    state.options.series[2].data=val.lineData;
    /*if(val.indicator !== undefined && val.indicator.length>0) {
      state.options.radar.indicator=val.indicator;
    } */
  },
  {
    immediate: true,
    deep: true,
  }
);

</script>

<style scoped>

</style>