// $('.carousel').carousel()
// Initialization for ES Users
// import { Carousel, initMDB } from "mdb-ui-kit";
// initMDB({ Carousel });


document.addEventListener("DOMContentLoaded", function () {
    
    const carouselElement = document.querySelector("#carouselBasicExample");
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 5000, 
            ride: "carousel", 
            pause: "hover", 
            wrap: true,
        });
    }
});
