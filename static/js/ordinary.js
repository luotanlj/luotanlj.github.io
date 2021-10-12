var clock;
window.addEventListener('load',function(){
	clock = document.getElementById("clock")
	var timeOut = window.setInterval(function(){clock.innerHTML = getNowTime()},1000);
	
});
var weekArray = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
var monthArray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sept","Oct","Nov","Dec");

//获取当前时间
function getNowTime() {
	var str = "";
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    // var year = date.getFullYear();  //getFullYear()代替getYear()
    //week
	var week = date.getDay();
	str += weekArray[week]+" ";
	//月 getMonth()：0 ~ 11
    var month = date.getMonth();
	str += monthArray[month]+" ";
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
	str += addZero(day)+" ";
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
	str += addZero(hour)+":";
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
	str += addZero(minute)+":";
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();
	str += addZero(second)+" ";
	str += hour>=12?"pm":"am";
    // var time = '当前时间是：' + year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return str;
}

//小于10的拼接上0字符串
function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}