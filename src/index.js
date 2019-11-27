const css = require('../scss/main.scss');

function whichTransitionEvent(){
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
        if (el.style[t] !== undefined){
            return transitions[t];
        }
    }
}

var transitionEvent = whichTransitionEvent();

function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");

    var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
        if (el.style[t] !== undefined){
            return animations[t];
        }
    }
}



var animationEvent = whichAnimationEvent();

var tabs = $(".tabs").find("button");
var nubeD = $(".ndown")

$(document).ready(function(){
    $('.slider').slick({
        arrows:false
    });

    tabs.eq(0).click(function () {
        tabs.removeClass("active")
        $(this).addClass("active")
        nubeD.removeClass("middle right")
    })

    tabs.eq(1).click(function () {
        tabs.removeClass("active")
        $(this).addClass("active")
        nubeD.addClass("middle")
        nubeD.removeClass("right")
    })

    tabs.eq(2).click(function () {
        tabs.removeClass("active")
        $(this).addClass("active")
        nubeD.addClass("right")
        nubeD.removeClass("middle")
    })

})
