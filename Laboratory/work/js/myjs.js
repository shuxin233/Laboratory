window.onload=function () {

}
//交互-----------------------


function myabout_us() {
    var usernm=document.getElementById('nm').value;
    var userph=document.getElementById('ph').value;
    var usermail=document.getElementById('mail').value;
    var usercontent=document.getElementById('content').value;
    $(function(){
        $.ajax({                                        //提交意见信息
        url:'http://193.112.162.24:8080/advise',
        data:{
            "id":'20180000',
            "name":usernm,
            "tel":userph,
            "mail":usermail,
            "advice":usercontent
        },
        Accept: 'application/json',
        type:"get",
        dataType:'json',
        success:function (data) {
            console.log(data);
            alert(data['msg']);
        },
        error:function (errmsg) {
            console.log("AJAX获取服务器失败"+errmsg);
            alert('提交失败');
        }
    });
    })
}


var myeExps=new Array();
var mystudyspan=document.getElementsByClassName('studyspan');
var alength;

function myexps() {
    $(function(){
        $.ajax({                     //获取所有题目分类
            url:'http://39.97.105.149:8080/exps',
            Accept: 'application/json',
            type:"get",
            dataType:'json',
            success:function (data) {
                console.log(data);
                alength=data['body'].length;
                for(let i=0;i<alength;i++){
                    myeExps.push(data['body'][i]['exp']);
                    mystudyspan[i].innerHTML="实验"+(i+1)+" "+myeExps[i];
                }

            },
            error:function (errmsg) {
                console.log("AJAX获取服务器失败"+errmsg);
                alert('提交失败');
            }
        });
    })
}








