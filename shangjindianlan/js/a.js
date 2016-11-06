Ul = $('.banner_list');
aLi = $('.banner_list li');
aBtn = $('.btn_group button');
aLi.width($(window).width());

aPoint = $('.point_group li');
iWidth = $('.banner_list li').eq(0).width();
oUl.width(iWidth * aLi.length);
iNow = 0;
$(oUl).css({left:0});

//添加小点点
if(!$('.point_group').length){
    $('#banner').append('<div class="point_group">');
    $('.point_group').append('<div class="point_box">');
    $('.point_box').append('<ul>');
    oPointBox = $('.point_box ul');for(var i=0;i<aLi.length;i++){
        if(i == iNow)
        {
            oPointBox.append('<li class="active"></li>');
        }
        else
        {
            oPointBox.append('<li>');
        }
    }
}
clearTimer();
auto();
stopAuto(aLi);
stopAuto(aBtn);
stopAuto(aPoint);
point();