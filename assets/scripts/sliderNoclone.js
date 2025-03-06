function slider(){
const client = document.querySelector('.client__slider')
jQuery(document).ready(function(){
    $(client).slick({
        infinite: false,
        slidesToShow:3,
        responsive: [
            { breakpoint: 1600, settings: { slidesToShow: 2, } },
            { breakpoint: 700, settings: { slidesToShow: 1, } }
          ]
    });
});
}
slider()