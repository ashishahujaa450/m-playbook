"use strict"; //defining functions

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sidebarHeightDetecter = function sidebarHeightDetecter() {
    var sidebarTabHeight = $('.sidebar-tab-container').height();

    if (sidebarTabHeight) {
        $('.sidebar-wrapper .sidebar-content-inner .sidebar-container').css('height', "calc(100% - ".concat(sidebarTabHeight, "px)"));
    }
};

var pillCloser = function pillCloser() {
    $('.pill-close a').click(function(e) {
        //getting tab content and removing active class
        var tabContent = this.parentElement.parentElement.parentElement;
        tabContent.classList.remove('active');
        var circularPillId = tabContent.getAttribute('id');
        $("a[href=\"#".concat(circularPillId, "\"]")).removeClass('active');
    });
}; //accordion using js (arrow func for lexical this context)


var accordion = function accordion(className) {
    var acc = document.getElementsByClassName(className);

    if (acc) {
        for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;

                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    } else {
        throw new Error('please enter correct class name');
    }
}; //for desktop only
//pills to slider


var circularPillstoAccordion = function circularPillstoAccordion(selector) {
    var slider = selector;

    if (slider) {
        var _$$slick;

        //init slider
        $(slider).slick((_$$slick = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            accessibility: true,
            centerMode: true
        }, _defineProperty(_$$slick, "arrows", true), _defineProperty(_$$slick, "variableWidth", true), _defineProperty(_$$slick, "responsive", [{
            breakpoint: 1100,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]), _$$slick)); //on slide change toggle tab pill active

        $(slider).on('afterChange', function(event, slick, currentSlide, nextSlide) {
            var activeSlide = event.target.querySelector('li.nav-item.slick-slide.slick-current.slick-center');

            if (activeSlide) {
                //remove active class
                var AllcircularLink = activeSlide.parentElement.querySelectorAll('a.nav-link');
                Array.from(AllcircularLink).forEach(function(link) {
                    link.classList.remove('active');
                });
                var AllcircularTab = activeSlide.parentElement.parentElement.parentElement.parentElement.querySelectorAll('.tab-pane');
                Array.from(AllcircularTab).forEach(function(current) {
                    current.classList.remove('active');
                }); //make current link active and current tab active

                var circularLink = activeSlide.querySelector('a.nav-link');
                circularLink.classList.add('active');
                var tabLink = activeSlide.querySelector('a.nav-link.active').getAttribute('href').replace('#', '');
                document.querySelector("div.tab-pane#".concat(tabLink)).classList.add('active');
                document.querySelector("div.tab-pane#".concat(tabLink)).classList.remove('fade');
            }
        });
    }
}; //circular pill active handler with slick slider

/*
 * click pill backup for mobile (synced with slider)
 */
// var circularPillActiveHandler = function circularPillActiveHandler(e) {
//     //get current active class
//     var current = e.target.closest('.nav-link'); //remove class first from all nav links
//     var allLinks = current.parentElement.parentElement.querySelectorAll('a.nav-link');
//     Array.from(allLinks).forEach(function(elm) {
//         elm.classList.remove('active');
//         elm.classList.remove('show');
//     }); //remove class from all tab contents
//     var allTabContent = current.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll('div.tab-pane');
//     Array.from(allTabContent).forEach(function(elm) {
//         elm.classList.remove('active');
//     }); //make current active
//     var currentTabContent = current.getAttribute('href').replace('#', '');
//     document.querySelector("div#".concat(currentTabContent)).classList.add('active');
//     document.querySelector("div#".concat(currentTabContent)).classList.remove('fade');
//     current.classList.add('active');
//     current.classList.add('show');
// }; 


var sidebarFixedHeightScroller = function sidebarFixedHeightScroller() {
    var sidebarUpperWrapperHeight = $('.sidebar-container').outerHeight(true);
    var sidebarScrollspyHeight = $(window).height() - sidebarUpperWrapperHeight;
    var spyHeight = sidebarScrollspyHeight;

    if (sidebarUpperWrapperHeight && sidebarScrollspyHeight) {
        if (spyHeight <= 350) {
            spyHeight = spyHeight - 20;
        }

        $('.sidebar-tab-container').css('max-height', spyHeight);
        $('.sidebar-tab-container').css('overflow-y', 'auto');
    }
}; //accordion position


var consumerAccordionPos = function consumerAccordionPos() {
    var allPanes = $('.social-common_pane');
    var paneWrapper = $('.tab-content.b-1100');

    if (allPanes) {
        var spacing = 10;

        for (var i = 0; i < allPanes.length; i++) {
            if (i === 0) {} else {
                allPanes[i].style.top = '-' + spacing + 'px';
                spacing += 10;
            }
        }
    }
};

$(document).ready(function() {
    sidebarHeightDetecter();
    pillCloser();
    accordion('accordion');
    sidebarFixedHeightScroller();

    if ($(window).width() >= 768) {
        sidebarHeightDetecter();
    } //calling dom functions


    if ($(window).width() <= 1100) {
        circularPillstoAccordion('.pills_carousel');
        consumerAccordionPos();
    }

    if ($(window).width() <= 450) {
        circularPillstoAccordion('.pills_carousel_mobile');
    }

    $('.animsition-overlay').animsition({
        inClass: 'overlay-slide-in-left',
        outClass: 'overlay-slide-out-right',
        overlay: true,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'body'
    }).one('animsition.inStart', function() {
        $('body').removeClass('bg-init');
    }).one('animsition.inEnd', function() {}); //health care page tabs to slider conversion
}); // window resize functions

$(window).resize(function() {
    sidebarHeightDetecter(); // sidebarFixedHeightScroller();
});