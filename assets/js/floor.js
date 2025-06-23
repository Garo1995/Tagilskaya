const boxes = document.querySelectorAll('.floor-svg-box');
const infoBox = document.getElementById('info-box');
const floorCount = infoBox.querySelector('.floor-count');
const numberRooms = infoBox.querySelector('.number-rooms');
const numberPremises = infoBox.querySelector('.number-premises');
const costPremises = infoBox.querySelector('.cost-premises');

let isOverSvg = false;
let isOverInfoBox = false;

function updateInfoBoxPosition(box) {
    const parent = box.closest('.floor-wrapper');
    const parentRect = parent.getBoundingClientRect();
    const rect = box.getBoundingClientRect();
    const infoBoxHeight = infoBox.offsetHeight;

    let top = rect.top - parentRect.top - 120;
    let left = rect.right - parentRect.left - 80;

    if (top + infoBoxHeight >= parent.offsetHeight) {
        top = rect.top - parentRect.top - infoBoxHeight + 90;
    }

    if (top < 0) {
        top = rect.bottom - parentRect.top - 180;
    }

    infoBox.style.top = `${top}px`;
    infoBox.style.left = `${left}px`;
}

function showInfoBox(box) {
    const count = box.getAttribute('data-count');
    const number = box.getAttribute('data-number');
    const premises = box.getAttribute('data-premises');
    const cost = box.getAttribute('data-cost');

    floorCount.textContent = count;
    numberRooms.textContent = number;
    numberPremises.textContent = premises;
    costPremises.textContent = cost;

    updateInfoBoxPosition(box);
    infoBox.style.display = 'block';
}

function hideInfoBox() {
    if (!isOverSvg && !isOverInfoBox) {
        infoBox.style.display = 'none';
    }
}

boxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        isOverSvg = true;
        showInfoBox(box);
    });

    box.addEventListener('mouseleave', () => {
        isOverSvg = false;
        setTimeout(hideInfoBox, 100);
    });
});

infoBox.addEventListener('mouseenter', () => {
    isOverInfoBox = true;
});

infoBox.addEventListener('mouseleave', () => {
    isOverInfoBox = false;
    setTimeout(hideInfoBox, 100);
});


let selectSwiper = new Swiper(".select-floor-slider", {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    autoplay: {
        delay: 4000,
    },
});







document.addEventListener("DOMContentLoaded", function () {

    // Основной слайдер с картинками
    let floorSwiper = new Swiper(".floor-plan-slider", {
        slidesPerView: 1,
        loop: true,
        fadeEffect: { crossFade: true },
        virtualTranslate: true,
        effect: "fade",
        speed: 600,
        navigation: {
            nextEl: ".floor-button-next",
            prevEl: ".floor-button-prev",
        },
    });


    const activeFloorSpans = document.querySelectorAll(".active-floor");

    const floorCountSwiper = new Swiper(".count-slid", {
        slidesPerView: 3,
        direction: "vertical",
        loop: true,
        spaceBetween: 10,
        centeredSlides: true,
        breakpoints: {
            1199: {
                slidesPerView: 3,
                slidesPerGroup: 1,
            },
            620: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                direction: "horizontal",
            },
            320: {
                direction: "horizontal",
                slidesPerView: 3,
                slidesPerGroup: 1,
            },
        },
        navigation: {
            nextEl: ".floor-button-next",
            prevEl: ".floor-button-prev",
        },
        on: {
            init: updateActiveNumber,
            slideChangeTransitionEnd: updateActiveNumber,
        },



    });

    function updateActiveNumber() {
        const activeSlides = document.querySelectorAll(".count-slid .swiper-slide-active:not(.swiper-slide-duplicate)");
        if (activeSlides.length === 0) return;

        const middleIndex = Math.floor(activeSlides.length / 2);
        const centralSlide = activeSlides[middleIndex];
        if (!centralSlide) return;

        const numberEl = centralSlide.querySelector(".count-slid-floor");
        if (!numberEl) return;

        // Обновим все элементы с классом .active-floor
        activeFloorSpans.forEach(span => {
            span.textContent = numberEl.textContent.trim();
        });
    }

});






$('.see-plan').on('click', function () {
    $('body').addClass('body-hidden')
    $('.found-floor').addClass('found-floor-active')
})
$('.parameters-btn').on('click', function () {
    $('body').addClass('body-hidden')
    $('.found-floor').addClass('found-floor-active')
})
$('.parameters-sel').on('click', function () {
    $('body').addClass('body-hidden')
    $('.found-floor').addClass('found-floor-active')
})
$('.floor-svg-box').on('click', function () {
    $('body').addClass('body-hidden')
    $('.floor-plan-param').addClass('floor-plan-active')
})

$('.close-plan-floor').on('click', function () {
    $('.found-floor').removeClass('found-floor-active')
    $('.floor-plan-param').addClass('floor-plan-active')

})

$('.go-back-floor').on('click', function () {
    $('body').removeClass('body-hidden')
    $('.found-floor').removeClass('found-floor-active')
    $('.floor-premises-square').removeClass('premises-square-active')

    $('.floor-plan-param').removeClass('floor-plan-active')
})
$('.open-found-sel').on('click', function () {
    $('.found-floor').addClass('found-floor-active')
})


$('.open-all-floor').on('click', function () {
    $('.floor-premises-square').addClass('premises-square-active')
})


$('.found-cnt-box').on('click', function () {
    $('.floor-premises-square').addClass('premises-square-active')
})
$('.buy-floor-one').on('click', function () {
    $('.floor-premises-square').addClass('premises-square-active')
})




$('.go-back-found').on('click', function () {
    $('.floor-premises-square').removeClass('premises-square-active')
})

$('.sort-square-filter').on('click', function () {
    $(this).toggleClass('sort-square-filter-active');
})
$('.sort-square-cnt ul li').on('click', function () {
    $('.sort-square-filter').toggleClass('sort-square-filter-active');
})



$('.open-filter-main').on('click', function () {
    $('.floor-plan-fiv').toggleClass('floor-plan-fiv-active');
})
$('.close-filter').on('click', function () {
    $('.floor-plan-fiv').removeClass('floor-plan-fiv-active');
})

$(document).ready(function () {
    $('.get-title').on('click', function () {
        const titleText = $('.get-title-mobal').text();
        $('.send-title').text(titleText);
        $('.clicking-submit-form').addClass('title-actives');
    });

});




$(document).ready(function () {
    $('g.buy-floor-one').on('mouseenter', function () {
        const floor = $(this).data('number-floor');
        const square = $(this).data('count-square');
        const price = $(this).data('price');

        $('.numbers-floor').text(floor);
        $('.count-square').text(square);
        $('.price-floors').text(price);
    });
});



if ($(window).width() <= 1020) {
    $('.select-floor-main').remove();
}

function setupSingleSlider(id, thumbId, formatFn = v => v) {
    const wrapper = document.getElementById(id);
    const input = wrapper.querySelector("input");
    const highlight = wrapper.querySelector(".range-highlight");
    const thumb = document.getElementById(thumbId);

    function update() {
        const percent = (input.value - input.min) / (input.max - input.min);
        const wrapperWidth = wrapper.offsetWidth;
        const thumbWidth = thumb.offsetWidth;
        const left = percent * (wrapperWidth - thumbWidth) + thumbWidth / 2;

        thumb.style.left = `${left}px`;
        thumb.textContent = formatFn(input.value);
        highlight.style.width = `${percent * 100}%`;
    }

    input.addEventListener("input", update);
    window.addEventListener("resize", update);
    update();
}

function setupDoubleSlider(id, thumb1Id, thumb2Id, formatFn = v => v) {
    const wrapper = document.getElementById(id);
    const inputs = wrapper.querySelectorAll("input");
    const highlight = wrapper.querySelector(".range-highlight");
    const thumb1 = document.getElementById(thumb1Id);
    const thumb2 = document.getElementById(thumb2Id);

    function update() {
        let val1 = parseInt(inputs[0].value);
        let val2 = parseInt(inputs[1].value);

        if (val1 > val2) [val1, val2] = [val2, val1];

        const percent1 = (val1 - inputs[0].min) / (inputs[0].max - inputs[0].min);
        const percent2 = (val2 - inputs[1].min) / (inputs[1].max - inputs[1].min);

        const wrapperWidth = wrapper.offsetWidth;
        const thumbWidth = thumb1.offsetWidth;

        const left1 = percent1 * (wrapperWidth - thumbWidth) + thumbWidth / 2;
        const left2 = percent2 * (wrapperWidth - thumbWidth) + thumbWidth / 2;

        thumb1.style.left = `${left1}px`;
        thumb2.style.left = `${left2}px`;
        thumb1.textContent = formatFn(val1);
        thumb2.textContent = formatFn(val2);

        highlight.style.left = `${percent1 * 100}%`;
        highlight.style.width = `${(percent2 - percent1) * 100}%`;

        // Устанавливаем z-index так, чтобы верхний ползунок был активным
        if (parseInt(inputs[0].value) < parseInt(inputs[1].value)) {
            inputs[0].style.zIndex = 5;
            inputs[1].style.zIndex = 4;
        } else {
            inputs[0].style.zIndex = 4;
            inputs[1].style.zIndex = 5;
        }
    }

    inputs.forEach(input => input.addEventListener("input", update));
    window.addEventListener("resize", update);
    update();
}

// Запускаем
setupDoubleSlider("floor", "floor-thumb1", "floor-thumb2");
setupDoubleSlider("area", "area-thumb1", "area-thumb2"); // ← изменено
setupDoubleSlider("price", "price-thumb1", "price-thumb2");
