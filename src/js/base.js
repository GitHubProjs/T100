var mySwiper = new Swiper('.hp_mainbanner_container', {
    autoplay: 5000, //可选选项，自动滑动
    loop: true, //可选选项，开启循环
    effect: 'fade',
    speed: 500,
    pagination: '.swiper-pagination',
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
})



// var galleryTop = new Swiper('.gallery-top', {
//     // speed: 100,
//     // loop: true,
//     autoplay: true,
//     spaceBetween: 6,
//     loop:true,
//     loopedSlides: 6, //looped slides should be the same
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// });
// var galleryThumbs = new Swiper('.gallery-thumbs', {
//     // speed: 500,
//     // loop: true,
//     // autoplay: true,
//     spaceBetween: 6,
//     slidesPerView: 3,
//     touchRatio: 0.2,
//     loop: true,
//     loopedSlides: 6, //looped slides should be the same
//     slideToClickedSlide: true,
// });
// galleryTop.controller.control = galleryThumbs;
// galleryThumbs.controller.control = galleryTop;

//切换中英文
$('.hp_language .more_btn').on('click', function (e) {
    $(this).parent().toggleClass('active');
});
if($('.hp_home_item').length=='1'){
    $('.hp_home_content').height(500);
    $('.hp_footer .language').css({'visibility': 'visible'})
}
//点击切换查询内容
$('.hp_language_ul .language').on('click', function (e) {
    $('.hp_language .more_btn b').text($(this).text());
    $('.hp_language .more_btn').attr('data-type', $(this).attr('data-type'));
    $('.hp_language').removeClass('active');
    if($(this).attr('data-type')=='en'){
        // window.location.href='http://en.wuximarathon.com/'
    }else if($(this).attr('data-type')=='zh'){
        // window.location.href='http://wuximarathon.com/'
    }
});
//客服菜单

//右侧客服菜单
$(document).ready(function() {
    $('.contactBar-shrink').click(function() {
        $('#contactBar').toggleClass('hidebar');
        $('.icon-shrink').toggleClass('reverse');
    });
    $(".scroll-top").click(function() {
        $('html, body').animate({
                scrollTop: 0
            },
            700)
    });
    var scrollFunc=function(event){
        event = event || window.event;
        var wheelDirection,interval;
        if (event.wheelDelta) {    //IE/Opera/Chrome
            interval = 100;
            wheelDirection = event.wheelDelta;
            if(wheelDirection > 0) {
                $('#contactBar').removeClass('hidebar');
                $('.icon-shrink').removeClass('reverse');
            } else if (wheelDirection < -(interval)) {
                $('#contactBar').addClass('hidebar');
                $('.icon-shrink').addClass('reverse');
            }
        } else if (event.detail){  //Firefox
            interval = 3;
            wheelDirection = event.detail;
            if(wheelDirection > interval) {
                $('#contactBar').addClass('hidebar');
                $('.icon-shrink').addClass('reverse');
            } else if (wheelDirection < 0) {
                $('#contactBar').removeClass('hidebar');
                $('.icon-shrink').removeClass('reverse');
            }
        }
    }
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }
    window.onmousewheel=document.onmousewheel=scrollFunc;
});



//改变赛事图片颜色
// $('.img-a img').on('mouseenter',function () {
//     this.src="http://www.thenorthface100.com/images/races/btn_bj_over.jpg"
//     this.title="查看赛事信息,请点击"
// }).on('mouseleave',function () {
//     this.src="http://www.thenorthface100.com/images/races/btn_bj.jpg"
//
// })

