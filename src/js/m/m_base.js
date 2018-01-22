var hmBanner = new Swiper('.hm_banner', {
    autoplay: true, //可选选项，自动滑动
    loop: true, //可选选项，开启循环
    pagination: '.swiper-pagination',
    paginationClickable: true,
})





//右侧边展开
$('.hm_pop_container .entry').on('click', function(e) {
    $(this).parent().siblings().removeClass('active');
    $(this).parent().toggleClass('active');
    if($(this).find('span').hasClass('arrow_down')){
        $(this).find('span').removeClass('arrow_down').addClass('arrow_up');
    }else{
        $(this).find('span').removeClass('arrow_up').addClass('arrow_down');
    }
});

//弹出右边栏
$('.hm_menu').on('click', function(e) {
    $('.hm_right_menu').fadeIn('fast');
    //点击遮罩区域关闭
    $('.hm_right_menu').on('click', function(e) {
        if($(e.target).closest('.hm_pop_container').length == 0) {
            $('.hm_right_menu').fadeOut('fast');
        }
    });
});
if (!!$('.hm_list_content').height()) {
//	console.log($(window).height())
//	console.log($('.hm_list_content').height())
//	console.log($(window).height() - $('.hm_list_content').height())
    if ($(window).height() - $('.hm_list_content').height() >400) {
        $('.hm_footer').css({
            'position': 'fixed',
            'bottom': '0'
        });
    }
}

