//为了实现动画效果，我们要引入Jquery。

//入口，页面加载完成后执行
$(window).load(function(){
    init();
});
$(window).resize(function(){//当调整浏览器窗口的大小时，发生resize事件
    var nWinWidth;//滑动时获取窗口宽度
    var nTimeoutWinWidth;//滑动过500毫秒获取窗口宽度
    var rt;//定时器
    nWinWidth = $(window).width();
    clearTimeout(rt);
    rt = setTimeout(function ()
    {
        nTimeoutWinWidth = $(window).width();
        if(nTimeoutWinWidth == nWinWidth){//当过500毫秒窗口宽度等于滑动时窗口宽度说明用户不再改变窗口大小
            //执行程序
            aLi.width($(window).width());
            iWidth = $(window).width();
            oUl.width(aLi.width() * aLi.length);
            oUl.css({left:0});
            iNow = 0;
        }
    },500);
});
//全局变量
var oUl = null;//长条
var aLi = null;//每张图片盒子
var oPointBox = null;//小点点盒子
var aPoint = null;//小点点
var aBtn = null;//上一页下一页
var iWidth = 0;//每张图片的宽度
var iNow = 0;//当前图片的索引
var oTimer = null;//定时器
var bDone = true;//是否完成动画

//初始化函数
function init(){
    oUl = $('.banner_list');
    aLi = $('.banner_list li');
    aBtn = $('.btn_group button');
    aLi.width($(window).width());
    //添加小点点
    $('#banner').append('<div class="point_group">');
    $('.point_group').append('<div class="point_box">');
    $('.point_box').append('<ul>');
    oPointBox = $('.point_box ul');
    for(var i=0;i<aLi.length;i++){
        if(i == iNow)
        {
            oPointBox.append('<li class="active"></li>');
        }
        else
        {
            oPointBox.append('<li>');
        }

    }


    aPoint = $('.point_group li');
    iWidth = $('.banner_list li').eq(0).width();
    oUl.width(iWidth * aLi.length);
    auto();
    stopAuto(aLi);
    stopAuto(aBtn);
    stopAuto(aPoint);
    point();

}

//下一页
function next(){
    if(bDone == true){//如果bDone为true才能执行下一次动画

        bDone = false;//进来之后马上设置bDone为flase

        iNow ++;//翻页，让索引值变为下一张

        if(iNow == aLi.length){//判断，如果下一张没有图片了，就不能执行动画了
            //回到第一张图片
            iNow = 0;
        }

        //动画函数
        oUl.animate({
            left:-iWidth*iNow
        },function(){
            bDone = true;
        });
        aPoint.removeClass('active');
        aPoint.eq(iNow).addClass('active');
    }

}
//上一页
function prev(){
    iNow --;

    if(iNow == -1){
        iNow = aLi.length - 1;
    }

    //动画函数
    oUl.animate({
        left:-iWidth*iNow
    });
    aPoint.removeClass('active');
    aPoint.eq(iNow).addClass('active');
}

//自动播放
function auto(){
    //定时器：每隔一定时间，自动执行其中的函数
    oTimer = setInterval(function(){
        next();
    },3000);
}

//停止播放函数
function clearTimer(){
    //清除定时器
    clearInterval(oTimer);
    oTimer = null;
}

//停止播放
function stopAuto(obj){
    obj.mouseover(function(){//鼠标移入
        clearTimer();
    });
    obj.mouseout(function(){//鼠标移出
        auto();
    });
}

//小点点
function point(){
    aPoint.click(function(){
        //点哪个点，就到哪一张
        oUl.animate({//执行动画
            left:-iWidth * $(this).index()
        });
        aPoint.removeClass('active');
        $(this).addClass('active');
        iNow = $(this).index();

    });
}