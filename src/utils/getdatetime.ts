
/***
 * 获取当前日期时间
 */
const getDateTime=(dt:Date)=>{
    
    //var dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours(); //获取时
        var m = dt.getMinutes(); //获取分
        var s = dt.getSeconds(); //获取秒
        let nowTime =
            //"当前时间：" +
            y +
            "-" +
            mt +
            "-" +
            day +
            " " +
            h +
            ":" +
            m +
            ":" +
            s;
        //+"秒";
        return nowTime;

}

/***
 * 获取当前日期
 */
const getDate=(dt:Date)=>{
    
    //var dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    let nowTime =
        //"当前时间：" +
        y +
        "-" +
        mt +
        "-" +
        day ;
    return nowTime;
}

/***
 * 获取当前时间
 */
const getTime=(dt:Date)=>{
    
    //var dt = new Date();
    var h = dt.getHours(); //获取时
    var m = dt.getMinutes(); //获取分
    var s = dt.getSeconds(); //获取秒
    let nowTime =
        h +
        ":" +
        m +
        ":" +
        s;
    //+"秒";
    return nowTime;
}

/***
 * 获取当前时间
 */
const getWeek=(dt:Date,language="zh")=>{
    
    //var dt = new Date();
    let wk = dt.getDay();


    let weeks = [] as string[];
    if(language==="en")
    {
        //weeks=['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        //weeks=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        weeks=['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
    }
    else
    {
        weeks=['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    }
    
    let nowWeek =weeks[wk];

    return nowWeek;
}

/***
 * 获取当前日期时间
 */
const getDateHour=(dt:Date)=>{
        return dt.getHours();
}

export {getDateTime,getDate,getTime,getWeek,getDateHour}