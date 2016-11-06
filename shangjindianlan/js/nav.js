$(window).load(function(){
    nav();
});
var aNav = null;
function nav(){
    aNav = $('.nav li');
    aNav.mouseenter(function(){
        $(this).find('.sub_box').slideDown('fast');//使用滑动效果，快速地显示隐藏的被选元素
    }).mouseleave(function(){
        $(this).find('.sub_box').slideUp('fast');//使用滑动效果，快速地隐藏被选元素
    });
}