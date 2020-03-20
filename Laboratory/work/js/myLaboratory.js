



function mybei(){
    document.getElementById("mybei").style.display="block";
}

function myxi(){
    document.getElementById("myxi").style.display="block";
}
function myph(){
    document.getElementById("myph").style.display="block";
}
function mydian(){
    document.getElementById("mydian").style.display="block";
}




function clickDiv(divObj) {
    var divClickStatus =  divObj.getAttribute("clickStatus");
    if(null == divClickStatus || !divClickStatus){
       // divObj.style.border="1px solid red";
    }else{
        //divObj.style.border="1px solid #ccc";
    }
    divObj.setAttribute("clickStatus",(null == divClickStatus || !divClickStatus))
    if(checkAllClick()){
        if(confirm("是否开始清洗温度传感器")){
            document.getElementById("mybei").style.display="none";
            document.getElementById("myxi").style.display="none";
            document.getElementById("myph").style.display="none";
            document.getElementById("mydian").style.display="none";
            document.getElementById("mygif2").style.display="block";
            document.getElementById("tip").innerHTML="第一步：取出温度传感器，用蒸馏水冲洗几次，并记录温度<br>"+"注：pH复合电极准备工作已完成"
            setTimeout(send,5000)
        }else {
            alert("实验失败，请重新开始")
            document.getElementById("ban").style.display="block";
        }
    }

}

function checkAllClick() {
    var divList = document.getElementsByClassName("gif2");
    for(var i in divList){
        var div = divList[i];
        if(!div || !div.tagName || "div" != div.tagName.toLowerCase()){continue;}
        if(!div.getAttribute("clickStatus") || div.getAttribute("clickStatus") == null){return false;}
    }
    return true;
}





function send() {
    document.getElementById("mygif2").style.display="none";
    document.getElementById("mybei").style.display="block";
    document.getElementById("myxi").style.display="block";
    document.getElementById("myph").style.display="block";
    document.getElementById("mydian").style.display="block";
    document.getElementById("tips2").style.display="block";
    setTimeout(send2,1000)
}



function send2() {
    if(confirm("是否清洗PH复合电极")){
        document.getElementById("mygif1").style.display="block";
        document.getElementById("mybei").style.display="none";
        document.getElementById("myxi").style.display="none";
        document.getElementById("myph").style.display="none";
        setTimeout(
            function () {
                send2_0();
            },4000)
    }else {
        alert("实验失败，请重新开始");
        document.getElementById("ban").style.display="block";
    }

}
function  send2_0() {
    document.getElementById("mygif1").style.display="none";
    document.getElementById("mybei").style.display="block";
    document.getElementById("myxi").style.display="block";
    document.getElementById("myph").style.display="block";
    document.getElementById("mydian").style.display="block";
    send2_1();
}

function  send2_1() {
    document.getElementById("tip").innerHTML="第二步：清洗pH复合电极，并使用滤纸西区电极上的水液<br>";
    if(confirm("请小心地用滤纸吸去电极上的水液")){
        setTimeout(function () {
            if(confirm("试纸擦拭完毕，是否开始正式实验并记录数据")){
                send3();
            }else {
                alert("实验失败，请重新开始")
                document.getElementById("ban").style.display="block";
            }
        },1000)

    }
    else {
        alert("实验失败，请重新开始")
        document.getElementById("ban").style.display="block";
    }
}




function send3() {
    document.getElementById("mybei").style.display="none";
    document.getElementById("myxi").style.display="block";
    document.getElementById("myph").style.display="none";
    document.getElementById("mydian").style.display="block";
    document.getElementById("tips1").style.display="block";
    document.getElementById("mylast").style.display="block";
    document.getElementById("tip").innerHTML="第三步：正式测量pH值并显示最终结果<br>顺利完成实验";
    setTimeout(send4,10000);
}

function send4(){
    document.getElementById("ban").style.display="block";
    document.getElementById("tips1").style.display="none";
    document.getElementById("mygif1").style.display="none";
    document.getElementById("mylast").style.display="none";
    document.getElementById("mybei").style.display="block";
    document.getElementById("myxi").style.display="block";
    document.getElementById("myph").style.display="block";
    document.getElementById("mydian").style.display="block";
    document.getElementById("tipph").style.display="block";
    alert("实验验结束，pH计上显示待测试液的pH");
}




/*
function ready(){
    $("#bottle").mouseenter(function(){
        $("#bottleshow").show();
        $("#bottle2eshow").hide();
        $("#Drugsshow").hide();
        $("#bottle").css(cssw)
        $("#bottle2").css(cssb)
        $("#Drugs").css(cssb)
    });
    $("#bottle2").mouseenter(function(){
        $("#bottleshow").hide();
        $("#bottle2eshow").show();
        $("#Drugsshow").hide();
        $("#bottle").css(cssb)
        $("#bottle2").css(cssw)
        $("#Drugs").css(cssb)
    });
    $("#Drugs").mouseenter(function(){
        $("#bottleshow").hide();
        $("#bottle2eshow").hide();
        $("#Drugsshow").show();
        $("#bottle").css(cssb)
        $("#bottle2").css(cssb)
        $("#Drugs").css(cssw)
    });
};
*/




/*
function myset() {
    var delete1 =document.getElementById('delete');//删除功能
    var box=document.getElementById('mid-left');//控制拖拽边界的大小
    var elements=document.getElementsByClassName('myrightlist');
    for(let i=0;i<elements.length;i++){
     elements[i].onclick=function () {
            var li=document.createElement("li");
            document.getElementById("mid-left").appendChild(li)
            li.style.left=box.offsetLeft+i*80+"px";
            li.style.top=box.offsetTop+480+"px";
            var text=this.innerHTML;
            li.innerHTML=text;
            if(li == null) return;
            li.onmousedown  = function(e){
                var ev = e || window.event;  //兼容ie浏览器
                //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
                var distanceX = ev.clientX - li.offsetLeft;
                var distanceY = ev.clientY - li.offsetTop;
                document.onmousemove = function(e){
                    var ev = e || window.event;  //兼容ie浏览器
                    li.style.left = ev.clientX - distanceX + 'px';
                    li.style.top = ev.clientY - distanceY + 'px';
                    /!*对于大的DIV四个边界的判断*!/
                    if (ev.clientX - box.offsetLeft <= 0) {
                        li.style.left = box.offsetLeft + "px";
                    }
                    if (ev.clientY - box.offsetTop <= 0) {
                        li.style.top = box.offsetTop + "px";
                    }
                    if (ev.clientX >= box.offsetWidth+box.offsetLeft-li.offsetWidth) {
                        li.style.left = box.offsetWidth+box.offsetLeft-li.offsetWidth + "px";
                    }
                    if (ev.clientY >= box.offsetHeight+box.offsetTop-li.offsetHeight) {
                        li.style.top = box.offsetHeight+box.offsetTop-li.offsetHeight + "px";
                    }
                };
                document.onmouseup = function(e){
                    var ev = e || window.event;  //兼容ie浏览器
                    if(ev.clientX<delete1.offsetLeft+delete1.offsetWidth&&ev.clientX>delete1.offsetLeft&&ev.clientY<delete1.offsetTop+delete1.offsetHeight&&ev.clientX>delete1.offsetTop){
                        li.remove();
                    }else {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                };
            };
        }
    }
}*/
