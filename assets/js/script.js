$(window).on('load', function() {
    $('html, body').stop().animate({ scrollTop: 0 }, 400);
});

$(window).on('scroll', function() {
    const scrollTop = $(this).scrollTop();
    const header = $('header'); // или замени на свой селектор шапки

    if (scrollTop > 50) { // если прокрутка больше 50px — добавляем класс
        header.addClass('scrolled');
    } else {
        header.removeClass('scrolled');
    }
});

$(document).ready(function () {
    setTimeout(function () {
        $(".tagilskaya-sec").addClass("tagilskaya-act");
    }, 800);

    setTimeout(function () {
        $(".home-page").addClass("home-main-active");
        $("body").removeClass("no-scroll").addClass("body-unset");
        // Через 600 мс после появления контента — плавное появление хедера
        setTimeout(function () {
            $("header").addClass("header-show");
        }, 900);

    }, 4000);
});



// Клик по пункту меню
$('.menu a').on('click', function (e) {
    e.preventDefault();

    const targetKey = $(this).data('target');
    const $target = $('[data-section="' + targetKey + '"]');

    if ($target.length) {
        $('html, body').stop(true).animate({
            scrollTop: $target.offset().top - 0
        }, 800);

        // Обновим активный класс
        $('.menu li').removeClass('active-menu');
        $(this).parent().addClass('active-menu');
    }
});

// Автоматическая подсветка активного пункта при прокрутке
$(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop();

    $('[data-section]').each(function () {
        const $section = $(this);
        const sectionTop = $section.offset().top - 100;
        const sectionBottom = sectionTop + $section.outerHeight();
        const sectionKey = $section.data('section');

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            $('.menu li').removeClass('active-menu');
            $('.menu a[data-target="' + sectionKey + '"]').parent().addClass('active-menu');
        }
    });
});



$(document).ready(function () {
    $('.open-menu').on('click', function () {
        $(this).toggleClass('close-menu');
        if ($(this).hasClass('close-menu')) {
            $('.header-menu').addClass('transition-menu');
            $('body').addClass('body_fix');
        } else {
            $('.header-menu').addClass('menu-width');
            $('body').removeClass('body_fix');
            $('.header-menu').removeClass('transition-menu');
        }
    });
    $('.header-menu a').on('click', function () {
        $('.header-menu').addClass('menu-width');
        $('body').removeClass('body_fix');
        $('.header-menu').removeClass('transition-menu');
        $('.open-menu').removeClass('close-menu');
    })
});


$('.menu li').on('click', function () {
    $('.menu li').removeClass('active-menu');
    $(this).addClass('active-menu');
})













let businessSwiper = new Swiper(".business-center-slider", {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: ".business-button-next",
        prevEl: ".business-button-prev",
    },
});

let blockSwiper = new Swiper(".block-new-slider", {
    slidesPerView: 3,
    spaceBetween: 24,
    navigation: {
        nextEl: ".block-button-next",
        prevEl: ".block-button-prev",
    },
});


let gallerySwiper = new Swiper(".gallery-slider", {
    slidesPerView: 1,
    spaceBetween: 5,
    speed: 800,
    navigation: {
        nextEl: ".gallery-button-next",
        prevEl: ".gallery-button-prev",
    },
});




$('.open_modal').on('click', function () {
    let attr = $(this).attr('data-val');
    let modal = $('#' + attr);
    modal.removeClass('out');
    modal.fadeIn();
    $('body').addClass('body_fix');
});
$(document).on('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
        $('.modal:visible').fadeOut().addClass('out');
		$(".body_fix").removeClass("body_fix");
    }
});
$('.close').on('click', function () {


    $.fancybox.close()
    $('body').removeClass('body_fix');
    let prt = $(this).parents('.modal');
    $('.clicking-submit-form').removeClass('title-actives');

    prt.find('form').each(function () {
        this.reset();
    });


    prt.addClass('out')
    setTimeout(function () {
        prt.fadeOut();
    }, 100);
    $("#modal-thanks").removeClass("out");
});

$('.close-this').on('click', function () {
    $('body').removeClass('body_fix');

    let prt = $(this).parents('.modal');
    prt.addClass('out')
    setTimeout(function () {
        prt.fadeOut();
    }, 100);
    $.fancybox.close();
    $("#modal-thanks").removeClass("out");
});

$(window).on('click', function (event) {
    $('.modal').each(function () {

        let gtattr = $(this).attr('id');
        let new_mod = $('#' + gtattr);
        let md_cnt = $(new_mod).find('.modal-content');
        if (event.target === $(md_cnt)[0]) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)
            $('.clicking-submit-form').removeClass('title-actives');

        }
        if (event.target === this) {
            setTimeout(function () {
                $(new_mod).addClass('out');
                $(new_mod).fadeOut()
            }, 100)

            $('.clicking-submit-form').removeClass('title-actives');

        }
    })
});





$('.open-gallery').on('click', function (){
    $('.gallery-box').addClass('gallery-box-active')
    $('body').addClass('body-hidden')

})

$(document).on('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
        $('.gallery-box').removeClass('gallery-box-active');
        $('body').removeClass('body-hidden')

    }
});

$('.go-back').on('click', function (){
    $('.gallery-box').removeClass('gallery-box-active')
    $('body').removeClass('body-hidden')

})





$('.see-more').on('click', function (){
    $('.more-black-new').toggleClass('more-black-new-active')
    $('.see-more').toggleClass('active')

})





$(document).ready(function () {
    $('.world-renowned-photo').on('click', function () {
        const bg = $(this).css('background-image');
        $('.world-renowned').css('background-image', bg);
    });
});








document.addEventListener('DOMContentLoaded', function () {
    let lastScrollTop = 0;
    const header = document.getElementById('mobileHeader');

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            if (currentScroll > lastScrollTop) {
                header.classList.add('hidden');
            } else {
                if (currentScroll < maxScroll - 50) {
                    header.classList.remove('hidden');
                }
            }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
});








$('.your-style-picture').on('click', function (){
    $('body').addClass('modal-fix')
    $('.your-style-modal').addClass('style-modal-open')
})


$('.style-modal-back').on('click', function (){
    $('.your-style-modal').removeClass('style-modal-open')
    $('body').removeClass('modal-fix')

})


let styleSwiper = new Swiper(".your-style-slider", {
    slidesPerView: 1,
    pagination: {
        el: ".your-style-pagination",
        clickable: true,
    }
});











let greatSmSwiper = new Swiper(".great-sm-slider", {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
});


let greatOptionSwiper = new Swiper(".great-option-slider", {
    loop: true,
    spaceBetween: 10,
    thumbs: {
        swiper: greatSmSwiper,
    },
});