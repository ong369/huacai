<template>
  <div class="screen-top-left1">
    <div class="screen-top-header flex-l">
      <div class="header-left flex-c">
        <i class="icomoon icon-assemble-copy" />
      </div>
      <div class="header-right flex-l">
        <span class="header-title">{{ headertitle }}</span>
        <dv-decoration-3 class="dv-dec-3" />
      </div>
    </div>
    <div class="screen-top-chart">
      <img
        style="
          width: 200px;
          height: 200px;
          margin-left: 15px;
          margin-bottom: 15px;
          align-content: center;
        "
        src="../../assets/logo.jpg"
      />
    </div>
    <div class="screen-top-data flex-l">
      <!-- <div class="data-item" v-for="(item, index) in state.dynamicDataList" :key="index">
                <div class="data-item-top flex-l">
                    <i class="icomoon" :class="[iconFontArr[index]]" />
                    <dv-digital-flop class="dv-digital-flop" :config="item.config" />
                </div>
                <div class="data-item-bottom flex-c">
                    <span class="data-item-title"> {{ item.text }} </span>
                    <span class="data-item-unit">(台)</span>
                </div>
            </div> -->
      <div class="data-item">
        <div class="data-item-top flex-l">
          <i class="icomoon icon-model" />
           <!-- <dv-digital-flop class="dv-digital-flop" :config="data.IdentifyModel" /> -->
           <span class="dv-digital-flop" >{{ data.identifyModel.value }}</span>
        </div>
        <div class="data-item-bottom flex-c">
          <span class="data-item-title"> 识别型号 </span>
        </div>
      </div>

      <div class="data-item">
        <div class="data-item-top flex-l">
          <i class="icomoon icon-order2" />
           <!-- <dv-digital-flop class="dv-digital-flop" :config="data.IdentifyOrder" /> -->
           <span class="dv-digital-flop" >{{ data.identifyOrder.value }}</span>
        </div>
        <div class="data-item-bottom flex-c">
          <span class="data-item-title"> 识别归属订单 </span>
        </div>
      </div>

      <div class="data-item">
        <div class="data-item-top flex-l">
          <i class="icomoon icon-model" />
           <!-- <dv-digital-flop class="dv-digital-flop" :config="data.ProdModel" /> -->
           <span class="dv-digital-flop" >{{ data.prodModel.value }}</span>
        </div>
        <div class="data-item-bottom flex-c">
          <span class="data-item-title"> 当前生产型号 </span>
        </div>
      </div>

      <div class="data-item">
        <div class="data-item-top flex-l">
          <i class="icomoon icon-order2" />
           <!-- <dv-digital-flop class="dv-digital-flop" :config="data.ProdOrder" /> -->
           <span class="dv-digital-flop" >{{ data.prodOrder.value }}</span>
        </div>
        <div class="data-item-bottom flex-c">
          <span class="data-item-title"> 当前生产订单 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted,watch, onUnmounted } from "vue";
import { getTopLeft } from "@/utils/getdatautil"; //微软signalr

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

/* console.log(props); */

/* type DataObj = {
    number: number,
    text: string
} */

/* const iconFontArr = [
    "icon-model",
    "icon-order2",
    "icon-model",
    "icon-order2",
] */
/* const state = reactive({
    dataList: [
        {
            number: 3250,
            text: '识别型号'
        },
        {
            number: 11122,
            text: '识别归属订单'
        },
        {
            number: 36788,
            text: '当前生产型号'
        },
        {
            number: 152234,
            text: '当前生产订单'
        }
    ] as Array<DataObj>,
    dynamicDataList: [] as Array<any>,
    intervalInstance: 0
}) */

const data = reactive({
  identifyModel: {value:""},
  prodModel: {value:""},
  identifyOrder: {value:""},
  prodOrder: {value:""}
});

onMounted(() => {
   /* configList() */
    /*changeTiming() */
    getTopLeft(props.module,data);
});

watch(
  () => data,
  (val: any) => {
    /* console.log(val); */
  },
  {
    immediate: true,
    deep: true,
  }
);

onUnmounted(() => {
  /* window.clearInterval(state.intervalInstance) */
});

/* const configList = () => {
    state.dataList.forEach((e: DataObj) => {
        state.dynamicDataList.push({
            config: {
                number: [e.number],
                toFixed: 0,
                content: '{nt}',
                style: {
                    fontSize: 20
                }
            },
            text: e.text
        })
    })
} */

/* const changeTiming = () => {
    state.intervalInstance = window.setInterval(() => {
        changeNumber()
    }, 2000)
} */

/* const changeNumber = () => {
    state.dynamicDataList.forEach((item, index) => {
        item.config.number[0] += ++index
        item.config = { ...item.config }
    })
} */
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common/variables.scss";

.screen-top-left1 {
  // 这里高度减去上下margin的高度之和
  height: $box-height1;
  // width: $box-width2;
  background-color: $theme-sub-color;
  margin: 10px;
  border-radius: 10px;

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

      .dv-dec-3 {
        width: 50px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }

  .screen-top-data {
    .data-item {
      width: 50%;
      height: 70px;

      .data-item-top {
        height: 50%;
        padding-left: 10px;

        .dv-digital-flop {
          width: 80%;
          height: 30px;
          color: #5da1a0;
          font-size: 20px;
          align-items: center;
          margin-left: 5px;
          margin-top: 1px;
          
        }
      }

      .data-item-bottom {
        height: 50%;

        .data-item-title {
          color: #d3d6dd;
          font-size: $sm-font-size;
        }

        .data-item-unit {
          color: #9fe6b8;
        }
      }
    }
  }
}
</style>
