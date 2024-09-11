import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import DataVVue3 from "@kjgl77/datav-vue3";
import '@/assets/scss/index.scss';
import '@/assets/icon/iconfont.css';

import VuewechatTitle from 'vue-wechat-title' ;

// 引入 全局注册组件
import CustomEcharts from '@/components/index';

const app = createApp(App);
app.use(VuewechatTitle);
app.use(router);
app.use(CustomEcharts);
app.use(DataVVue3);
app.mount("#app");
