import signalRBuild from "@/utils/signalr"; //微软signalr
import { formatTime } from '@/utils/util';

const WEEK = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const getHeader=(action :string | undefined ,data:any)=>{
    let connection = signalRBuild(action); //wockst=>OneSmtData/OneDipData/TwoData

    connection.on("ReceiveServiceMessage", (message: any) => {
        /* console.log(message); */
        /* var json= JSON.parse(message);
        console.log(json); */

        //data.dateDay = formatTime(message.nowtime, 'HH:mm:ss');
        data.dateDay = formatTime(message.nowtime, 'HH:mm');
        data.dateYear = formatTime(message.nowtime, 'yyyy-MM-dd');
        data.dateWeek = WEEK[message.week];
        data.plclinkstatus=message.linkstatus;
        if(message.linkstatus)
        {
            data.plclinkscolor="cornflowerblue";
        }
        else
        {
            data.plclinkscolor="red";
        }

        /* console.log(data); */

    });
} 

const getBottomLeft=(action :string | undefined ,data:any)=>{
   
    let connection = signalRBuild(action); //wockst=>OneSmtData/OneDipData/TwoData
   
    connection.on("ReceiveServiceMessage", (message: any) => {
       /*  &&
        message.DateDay.length==9 &&
        message.DateDay.length == message.ActualProdQty.length &&
        message.DateDay.length == message.TargetProdQty.length */
       
        if(message !==undefined  &&
            message.dateDay.length==9 &&
            message.dateDay.length == message.actualProdQty.length &&
            message.dateDay.length == message.targetProdQty.length)
        {
           
            data.category=message.dateDay;
            data.lineData=message.targetProdQty;
            data.barData=message.actualProdQty;
            data.rateData=[];
            for (let i = 0; i < data.barData.length ; i++) {
        
                const rate = data.barData[i] / data.lineData[i];
                data.rateData.push(rate.toFixed(2));
            }
            /* console.log(1); */
            /* console.log(data);   */
        }

    });
} 

const getBottomRight=(action :string | undefined ,data:any)=>{
   
    let connection = signalRBuild(action); //wockst=>OneSmtData/OneDipData/TwoData
    /* console.log(action); */
    connection.on("ReceiveServiceMessage", (message: any) => {
        
        if(message !==undefined  )
        {

            let listData:Array<Array<string>>=[];

            if(message.listData !== undefined && message.listData.length>0)
            {
                
                for(let i=0;i<message.listData.length;i++)
                {
                    listData.push([message.listData[i].day1,message.listData[i].prodModel,message.listData[i].targetProdQty]);
                }
                /* console.log(listData); */
            }

            data.listData.data=listData;

            // 清空轮询数据
            data.chartData.indicator = [];
            data.chartData.radarData = [];

            //chartData.radarindicator = [];

           /*  const dateBase = new Date();
            data.chartData.year = dateBase.getFullYear(); */
            if(message.dateDay !== undefined && 
                message.dateDay.length>0 &&
                message.dateDay.length == message.averageSpeed.length &&
                message.dateDay.length == message.maxSpeed.length)
            {
                // 周数据
                for (let i = 0; i < message.dateDay.length; i++) {
                    // 雷达图数据
                    // 我的指标
                /*  const averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
                    const maxSpeed = averageSpeed  + +(Math.random() * 3).toFixed(2); */

                    // 日期
                    const date = new Date();
                    const indicatorItem: {
                    name: string;
                    max: number;
                    } = {
                        name: message.dateDay[i],
                        max: message.maxSpeed[i],
                    };

                    data.chartData.radarData.push(message.averageSpeed[i]);
                    data.chartData.indicator.push(indicatorItem);
                }
            }
            /* console.log(data);   */
        }

    });
} 

const getTopLeft=(action :string | undefined ,data:any)=>{
   
    let connection = signalRBuild(action); //wockst=>OneSmtData/OneDipData/TwoData
   
    connection.on("ReceiveServiceMessage", (message: any) => {
       /*  &&
        message.DateDay.length==9 &&
        message.DateDay.length == message.ActualProdQty.length &&
        message.DateDay.length == message.TargetProdQty.length */
       
        if(message !==undefined )
        {
            data.identifyModel.value=message.identifyModel;
            data.identifyOrder.value=message.identifyOrder;
            data.prodModel.value=message.prodModel;
            data.prodOrder.value=message.prodOrder;
            /* console.log(data); */
        }

    });
} 

const getTopRight=(action :string | undefined ,data:any)=>{
   
    let connection = signalRBuild(action); //wockst=>OneSmtData/OneDipData/TwoData
    
    connection.on("ReceiveServiceMessage", (message: any) => {
        /* console.log(message); */
        if(message !==undefined  )
        {
            let listData:Array<Array<string>>=[];

            if(message.listData !== undefined && message.listData.length>0)
            {
                
                for(let i=0;i<message.listData.length;i++)
                {
                    listData.push([message.listData[i].day1,message.listData[i].prodModel,message.listData[i].targetProdQty]);
                }
                /* console.log(listData); */
            }

            data.data=listData;
        }

    });
} 

export {getHeader,getBottomLeft,getBottomRight,getTopLeft,getTopRight};

