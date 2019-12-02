const css = require('../scss/main.scss');
import animateScrollTo from 'animated-scroll-to';

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
var cards = $(".Mycard").eq(0).offset().top - $(window).height()/2
var ocho = $("#ocho").offset().top - $(window).height()/2
var Lista01 = $(".myList").eq(0).offset().top - $(window).height()/2
var Lista02 = $(".s04").offset().top - $(window).height()/2


var voltea = function(selector,index,clase,tiempo){
    setTimeout(function(){
        selector.eq(index).removeClass(clase)},index * (tiempo ? tiempo : 50))
}

var AnimaCadena = function (selector,clase,tiempo) {
    for(var i=0; i<selector.length; i++){
        voltea(selector,i,clase,tiempo)
    }
}

var animaScroll = function(position){
    animateScrollTo( document.getElementById(position),{ elementToScroll: document.getElementById("main-container") });
}

let s01 = parseInt($("#visionGeneral").offset().top),
    s02 = parseInt($("#paraPagos").offset().top),
    s03 = parseInt($("#paraRetiros").offset().top),
    s04 = parseInt($("#comoUsarlo").offset().top),
    s05 = parseInt($(".s06").offset().top);

let selccionaArea = ()=> {

    let scroll = $(".main-container").scrollTop();

    if(scroll >= s01 && scroll < (s01 + $("#visionGeneral").height()) ){
        $(".menuFlotante button").removeClass("active")
        $("#btnone").addClass("active")
    }
    else if(scroll >= s02 && scroll < (s02 + $("#paraPagos").height()) )    { $(".menuFlotante button").removeClass("active"),$("#btntwo").addClass("active")}
    else if(scroll >= s03 && scroll < (s03 + $("#paraRetiros").height()) )  { $(".menuFlotante button").removeClass("active"),$("#btnthree").addClass("active")}
    else if(scroll >= s04 && scroll < (s04 + $("#comoUsarlo").height()) )   { $(".menuFlotante button").removeClass("active"),$("#btnFour").addClass("active")}
    else if(scroll >= s05 )     { $(".menuFlotante button").removeClass("active")}
}




$(document).ready(function(){

    $("#btnone").click(function(){animaScroll("visionGeneral")})
    $("#btntwo").click(function(){animaScroll("paraPagos")})
    $("#btnthree").click(function(){animaScroll("paraRetiros")})
    $("#btnFour").click(function(){animaScroll("comoUsarlo")})
    $("#btnfive").click(function(){animaScroll("vincular")})

    $(".curva").css({
        height:($(".s02").offset().top + $(".s02").height())
    })


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

        selccionaArea();

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
