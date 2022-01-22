var swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        810:{
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1187: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});