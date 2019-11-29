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

var transitionEvent = whichTransitionEvent();
var animationEvent = whichAnimationEvent();

var tabs = $(".tabs").find("button");
var nubeD = $(".ndown")
var MainC = $(".main-container");

var voltea = function(selector,index,clase,tiempo){
    setTimeout(function(){
        selector.eq(index).removeClass(clase)},index * (tiempo ? tiempo : 50))
}
var AnimaCadena = function (selector,clase,tiempo) {
    for(var i=0; i<selector.length; i++){
        voltea(selector,i,clase,tiempo)
    }
}


var cards = $(".Mycard").eq(0).offset().top - $(window).height()/2
var ocho = $("#ocho").offset().top - $(window).height()/2
var Lista01 = $(".myList").eq(0).offset().top - $(window).height()/2
var Lista02 = $(".s04").offset().top - $(window).height()/2


$(document).ready(function(){

    $('.slider').slick({
        arrows:false
    });

    $(".iconCircle").addClass("reposo");
    $(".myList li").addClass("opn");

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

    MainC.scroll(function () {

        var scroll = MainC.scrollTop();

        if(scroll > cards){
            AnimaCadena($(".s02 .iconCircle"),"reposo")
        }
        if(scroll > ocho){

            AnimaCadena($("#ocho .iconCircle"),"reposo")
        }
        if(scroll > Lista01){

            AnimaCadena($(".myList").eq(0).find("li"),"opn",100)
        }
        if(scroll > Lista02){

            AnimaCadena($(".myList").eq(1).find("li"),"opn",200)
        }
    })

})
