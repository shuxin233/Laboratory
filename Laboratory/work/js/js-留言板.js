
mycommunication1();

var communicationid=new Array();//后端传来的评论
var studentID=new Array();//name
var ajaxcomment=new Array();//言论
var ajaxdata=new Array();//时间
var alength;//计共有多少条评论

function mycommunication1() {
    $(function(){
        $.ajax({                       //获取后端留言板数据
            url:'http://39.97.105.149:8080/comments',
            type:"get",
            dataType:'json',
            success:function (data) {
                console.log(data);
                alength=data['body'].length
                for(let i=0;i<alength;i++){
                    communicationid.push(JSON.stringify(data['body'][i]['id']));
                    studentID.push(JSON.stringify(data['body'][i]['studentId']));
                    ajaxcomment.push(JSON.stringify(data['body'][i]['comment']));
                    ajaxdata.push(JSON.stringify(data['body'][i]['date']));
                }
                upgetter();
            },
            error:function (errmsg) {
                console.log("AJAX获取服务器失败"+errmsg);
            }
        });
    })
}

function upgetter() {

    function $(id){
        return document.getElementById(id);
    }
    var ul=document.createElement('ul'); //创建ul标签
    $('pp').appendChild(ul);    //把ul标签放在div里面
        for(let i=0;i<alength;i++) {
            var txt = ajaxcomment[i];
            if (txt.length == 0) {        //判断输入为空的情况；
               continue;
            } else {
                var li = document.createElement('li');  //创建li标签
                ul.appendChild(li);     // li添加为ul的子标签
                txt = "用户:"+studentID[i]+"说:<br>" + txt + "<br>&nbsp;" + "<span class='time'>" + ajaxdata[i] + "</span>";
                li.innerHTML = txt;    //将文本赋给li标签中显示
            }
        }
}


function mycommunication2() {                        //提交新的留言
    if(sessionStorage.getItem('flag')!=1){     // 判断是否登录  flag=1为已登录
        alert("请先登录")
        mydenglu();
    }
    else {
        location.reload();
        var comment = document.getElementById('plTxt').value;
        $(function () {
            $.ajax({                                               //向后端发出新的评论信息
                url: 'http://39.97.105.149:8080/comment',
                type: "get",
                dataType: 'json',
                data: {
                    "id": sessionStorage.getItem('myid'),
                    "comment": comment,
                },
                success: function (data) {
                    console.log(data);
                    mycommunication1();
                },
                error: function (errmsg) {
                    console.log("AJAX获取服务器失败" + errmsg);
                    alert('提交失败');
                }
            });
        })
    }
}