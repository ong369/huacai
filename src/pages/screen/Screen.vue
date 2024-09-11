<template>
    <div class="screen-container" v-wechat-title="param.headertitle">
        <div class="screen-content" ref="screenRef">
            <div v-if="loading" class="mask flex-c">
                <dv-loading>
                    <span class="loading-title">加载中...</span>
                </dv-loading>
            </div>
            <div class="header-section">
                <ScreenHeader :headertitle=param.headertitle :linename=param.linename module="Header"></ScreenHeader>
            </div>
            <div class="screen-chart-section1">
                <dv-border-box-12>
                    <ScreenTopLeft :linename=param.linename :headertitle=param.module1.headertitle :module=param.module1.module></ScreenTopLeft>
                </dv-border-box-12>
                <dv-border-box-12>
                    <ScreenTopLeft :linename=param.linename :headertitle=param.module2.headertitle :module=param.module2.module></ScreenTopLeft>
                </dv-border-box-12>
             
                <dv-border-box-13>
                    <ScreenTopRight :linename=param.linename :headertitle=param.module5.headertitle :module=param.module5.module></ScreenTopRight>
                </dv-border-box-13>
            </div>
            <div class="screen-chart-section2">
                <dv-border-box-13>
                    <ScreenBottomLeft :linename=param.linename :headertitle=param.module6.headertitle :module=param.module6.module></ScreenBottomLeft>
                </dv-border-box-13>
                <dv-border-box-12>
                    <ScreenBottomRight :linename=param.linename :headertitle=param.module7.headertitle :module=param.module7.module></ScreenBottomRight>
                </dv-border-box-12>
            </div>
            <div class="footer-section">
                <ScreenFooter></ScreenFooter>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import windowResize from '@/utils/resize';
import { onMounted, onUnmounted, ref,reactive } from 'vue';
import ScreenHeader from '@/pages/screen-header/ScreenHeader.vue';
import ScreenFooter from '@/pages/screen-footer/ScreenFooter.vue';
import ScreenTopLeft from '@/pages/screen-top-left/ScreenTopLeft.vue';
import ScreenTopRight from '@/pages/screen-top-right/ScreenTopRight.vue';
import ScreenBottomLeft from '@/pages/screen-bottom-left/ScreenBottomLeft.vue';
import ScreenBottomRight from '@/pages/screen-bottom-right/ScreenBottomRight.vue';
/* import signalRBuild from "@/utils/signalr"; //微软signalr */



//参数
const param=reactive({
    headertitle:"冰箱装配生产线",
    linename:"H",
    module1:{
        //headertitle:"新势力销量占比",
        headertitle:"入口一(外壳)",
        module:"TopLeft1",
    },
    module2:{
        //headertitle:"省市销量分布1",
        headertitle:"入口二(内胆)",
        module:"TopLeft2",
    },

    module5:{
        //headertitle:"品牌销量排行榜",
        headertitle:"(外壳+内胆)装配信息",
        module:"TopRight",
    },
    module6:{
        headertitle:"当前9天产量统计",
        module:"BottomLeft",
    },
    module7:{
        headertitle:"生产计划(目标)",
        module:"BottomRight",
    },
});


const { screenRef, calcRate, windowDraw, unWindowDraw } = windowResize()
const loading = ref(true);

/* let connection = signalRBuild("TwoDip"); //wockst=>OneSmtData/OneDipData/TwoData */

onMounted(() => {
/*     //调用后端方法 ReceiveMessage 接收消息
    connection.on("ReceiveServiceMessage", (message: any) => {
        console.log(message);
        var json= JSON.parse(message);
        console.log(json);
        //console.log("asd");
    }); */

    //Message.warn('登录失败撒反对分享至小程序');
    
    // 监听浏览器窗口尺寸变化
    windowDraw()
    calcRate()
    setTimeout(() => {
        loading.value = false;
    }, 2000);
})

onUnmounted(() => {
    unWindowDraw();
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common/variables.scss';

.screen-container {
    width: 100vw;
    height: 100vh;
    background-color: $theme-color;
    display: flex;
    justify-content: center;
    align-items: center;


    .mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: $theme-color;
        z-index: 9999;
        background-image: url('@/assets/home_bg.png');
    }

    .screen-content {
        width: 1920px;
        height: 1080px;
        box-sizing: border-box;
        padding: 12px;
        background-image: url('@/assets/home_bg.png');
        transition: all .2s ease-in-out;

        .loading-title {
            font-size: $base-font-size;
            color: #fff;
            margin-top: 10px;
        }

        .screen-chart-section1 {
            margin-top: 10px;
            display: grid;
            grid-template-columns: 2fr 2fr 6fr;
            grid-column-gap: 5px;
        }

        .screen-chart-section2 {
            margin-top: 5px;
            display: grid;
            grid-template-columns: 5fr 5fr;
            grid-column-gap: 5px;
        }
    }
}
</style>