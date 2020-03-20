
window.onload=function () {
    mycheck();
    myexps();
    function $(id){
        return document.getElementById(id);
    }
}




var mypopOut= document.getElementById("mypopOut");
var mypopOutBg= document.getElementById("mypopOutBg");
var myspan= document.getElementById("myspan");
var myzhuxiao=document.getElementById("zhuxiao")

function ani(){
    $(".popOut").className = "popOut ani";
}
function mydenglu (){
    mypopOut.style.display= "block";
    mypopOutBg.style.display= "block";
    ani();
}

myspan.onclick=function(){
    mypopOut.style.display = "none";
    mypopOutBg.style.display = "none";
}

mypopOutBg.onclick=function(){
    mypopOut.style.display = "none";
    mypopOutBg.style.display = "none";
}




function myindex() {
    var myusnm= document.getElementById("usnm").value;
    var mypasw= document.getElementById("pasw").value;
    mycheck();
    $(function () {  //
        $.ajax({               //提交登录数据
            url: 'http://39.97.105.149:8080/login',
            type: "post",
            dataType: 'json',
            data:JSON.stringify({
                'id':myusnm,
                'psw':mypasw,
            }),
            contentType: 'application/json; charset=UTF-8',
            Accept: 'application/json',
            success: function (result) {
                console.log(result);
                alert(result['msg']);
                sessionStorage.setItem('myname',result['body'][0]['name']);
                sessionStorage.setItem('myid',result['body'][0]['id']);
                sessionStorage.setItem('flag','1');
                mycheck()
            },
            error: function (result) {
                console.log(result);
                alert('提交失败');
            }
        });
    })
}



function mycheck() {   // 检验是否已经登录
    var myflag=sessionStorage.getItem('flag');
    if(myflag==1){
        var denglu = document.getElementById("denglu");
        var dengluspan = document.getElementById("dengluspan");
        mypopOut.style.display = "none";
        mypopOutBg.style.display = "none";
        dengluspan.innerHTML = sessionStorage.getItem('myname') + "，您好";
        denglu.style.display = "none";
        dengluspan.style.display = "block";
        myzhuxiao.style.display = "block";
    }
    else {
        //表示未登录
    }
}

myzhuxiao.onclick=function () {   // 注销功能
    alert('注销成功')
    denglu.style.display = "block";
    dengluspan.style.display = "none";
    myzhuxiao.style.display = "none";
    sessionStorage.setItem('flag','0');
}

function index1() {
    if(sessionStorage.getItem('flag')!=1){     // 判断是否登录  flag=1为已登录
        alert("请先登录")
        mydenglu();
    }else {
        window.location.href="index.html";
    }

}

function laboratory() {
    if(sessionStorage.getItem('flag')!=1){     // 判断是否登录  flag=1为已登录
        alert("请先登录")
        mydenglu();
    }else {
        window.location.href="Laboratory.html";
    }

}

function Study() {
    if(sessionStorage.getItem('flag')!=1){     // 判断是否登录  flag=1为已登录
        alert("请先登录")
        mydenglu();
    }else {
        window.location.href="Study.html";
    }

}

function communication() {
    if(sessionStorage.getItem('flag')!=1){     // 判断是否登录  flag=1为已登录
        alert("请先登录")
        mydenglu();
    }else {
        window.location.href="communication.html";
    }

}
function about_us() {
    if(sessionStorage.getItem('flag')!=1){     // 判断是否登录  flag=1为已登录
        alert("请先登录")
        mydenglu();
    }else {
        window.location.href="about-us.html";
    }

}



