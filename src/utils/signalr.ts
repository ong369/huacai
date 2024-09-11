//npm i @microsoft/signalr @types/node

import * as signalR from "@microsoft/signalr";
//import Message from "@/components/message/message"



let timer = null as any; //定时器
const settime=5000  //定时时间（毫秒）

const signalRBuild = (action :string | undefined , stUrl : any=undefined ) => {

    /* console.log(action); */

    if(stUrl===undefined)
    {
      stUrl=import.meta.env.VITE_HUB_URL;
      //console.log(stUrl);
    }

    /* //初始化signalr HubConnection对象
    connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/hubs/databoard")//https://localhost:7260/chatHub
    .withAutomaticReconnect([3000, 4000, 10000, 10000])  //断线重连
    .build(); 
    */

    //初始化signalr HubConnection对象
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(stUrl + action, //服务断网址
            {                                               //跳过协商，直接使用WebSockets(苹果手机不支持LongPolling轮询、ServerSentEvents)
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }
        )
        .withAutomaticReconnect([3000, 4000, 10000, 10000])  //断线重连
        .build();

    //在此时间内，未收到服务端的任何消息，视为断线(以客户端为主，接收服务器端的信息)
    /* 服务器配置
    services.AddSignalR(option =>
    {
      option.KeepAliveInterval = TimeSpan.FromSeconds(15); //每15S向客户端询问
    });
    */
    connection.serverTimeoutInMilliseconds = 30000; //在此时间内，未收到服务端的为何消息，视为断线

    //在此时间内，服务端未收到客户端的任何消息，视为断线(以客户端为主，接收服务器端的信息)
    /* 服务器配置
    // 添加即时通讯
    services.AddSignalR(option =>
    {
      option.ClientTimeoutInterval = TimeSpan.FromSeconds(30);
    });
    */
    //connection.keepAliveIntervalInMilliseconds=15000; //没15S向服务器端汇报


    //启动连接并发送消息测试
    start(connection);
    /* connection.start()
        .then(() => {
            connection.send("ReceiveMessage", state.userId, "ok");
        }); */

    //下面测试断线重连机制 ，
    //重连之前调用 （只有在掉线的一瞬间，只进入一次）
    connection.onreconnecting((error: any) => {
        //Message.error('网络断开，正尝试重连');
        console.log('网络断开，正尝试重连');
        console.log(error);
        /* console.log(connection.state);
        console.log(connection.state === signalR.HubConnectionState.Reconnecting); */
    });

    //(默认4次重连)，任何一次只要回调成功，调用
    connection.onreconnected((connectionId: any) => {
        //Message.success('重连成功');
        console.log('重连成功');
        console.log(connectionId);
        /* console.log(connection.state);
        console.log(connection.state === signalR.HubConnectionState.Connected); */

    });

    //(默认4次重连) 全部都失败后，调用
    connection.onclose(async (error: any) => {
        //Message.error('与服务器断开链接，请检查网络或联系管理员')
        //console.log('与服务器断开链接，请检查网络或联系管理员');
        console.log(error);
        /*  console.log(connection.state);
         console.assert(connection.state === signalR.HubConnectionState.Disconnected); */
         
        await start(connection);
    });

    return connection;
}


const start = async (connection: signalR.HubConnection) => {
    //启动连接并发送消息测试
    try {

        await connection.start()
            .then(() => {
              //Message.success('与服务器成功链接');
              console.log('与服务器成功链接');
              clearInterval(timer);
              timer = null;

            })
            .catch(()=>{
              //Message.error('与服务器断开链接，正尝试重连，请检查网络或联系管理员');
              console.log('与服务器断开链接，正尝试重连，请检查网络或联系管理员');
              timer = setTimeout(() => {
                start(connection);
              }, settime);
            });

    } catch (err) {
       timer = setTimeout(() => {
        start(connection);
      }, settime);
    }
}

export default signalRBuild;

