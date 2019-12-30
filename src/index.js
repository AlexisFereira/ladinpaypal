const css = require('../scss/main.scss');
import animateScrollTo from 'animated-scroll-to';
import anime from 'animejs/lib/anime.es.js';

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

var
    vinculaPagos=false,
    pagos=false,
    vinculaRetiros=false,
    terminos=false;

var showTitle = (salida)=>{

    $(".titulo .vinculaRetiros,.vinculaPagos,.pagos").addClass("dn")

    if(vinculaPagos){
        $(".titulo .vinculaPagos").removeClass("dn")
        anime({
            targets: '.titulo .vinculaPagos',
            width:salida ? ["100%","0"] : ["0","100%"],
            opacity:salida?[1,0] :[0,1],
        })
    }
    if(pagos){
        $(".titulo .pagos").removeClass("dn")
        anime({
            targets: '.titulo .pagos',
            width:salida ? ["100%","0"] : ["0","100%"],
            opacity:salida?[1,0] :[0,1],
        })
    }
    if(vinculaRetiros){
        $(".titulo .vinculaRetiros").removeClass("dn")
        anime({
            targets: '.titulo .retiros',
            width:salida ? ["100%","0"] : ["0","100%"],
            opacity:salida?[1,0]:[0,1],
        })
    }
}


let cambiaVincula = function(){
    if(vinculaRetiros){

    }else{

    }
}

$(document).ready(function(){

    $("#btnone").click(function(){animaScroll("visionGeneral")})
    $("#btntwo").click(function(){animaScroll("paraPagos")})
    $("#btnthree").click(function(){animaScroll("paraRetiros")})
    $("#btnFour").click(function(){animaScroll("comoUsarlo")})
    $("#btnfive").click(function(){animaScroll("vincular")})


    if($(window).width() < 998){
        $(".menu01 li").click(function(e){

            $(this).find(".submenu").hasClass("sOpen") ?
                $(this).find(".submenu").removeClass("sOpen"):
                $(this).find(".submenu").addClass("sOpen")

        })
    }

    $(".support").tooltip()

    $("#showM").click(function(){
        $(".cont-menu").toggleClass("SM")

        $(this).find(".open,.closem").toggleClass("dn")

        $(".submenu").removeClass("")

    })

    var openSlider = function(term){

        if(term) {
            $(".cont-modal ,.terminos").removeClass("dn")
            terminos = true;
        }
        else{
            $(".cont-modal,.pasos").removeClass("dn")
            $('.sliderStep01,.sliderStep02,.sliderStep03').slick({
                arrows:false,
                infinite:false,
                dots:true
            });
        }

        setTimeout(function(){
            anime({
                targets: '.sombra',
                opacity:[0,.8],
                easing:"easeOutExpo",
            });

            anime({
                targets: '.ventana',
                translateY:terminos ?[100,0] :[-100,0],
                scale:[1,1],
                opacity:[0,1],
                easing:'spring(1, 100, 20, 20)',
            });
        },100)
    }




    $(".btn-van.left").click(function(){
        if(vinculaPagos){
            $('.sliderStep01').slick('slickPrev');
        }
        else if(pagos){
            $('.sliderStep03').slick('slickPrev');
        }
        else if(vinculaRetiros){
            $('.sliderStep02').slick('slickPrev');
        }
    })
    $(".btn-van.right").click(function(){
        if(vinculaPagos){
            $('.sliderStep01').slick('slickNext');
        }
        else if(pagos){
            $('.sliderStep03').slick('slickNext');
        }
        else if(vinculaRetiros){
            $('.sliderStep02').slick('slickNext');
        }
    })

    $("#paraVincular button").click(function(){
        vinculaPagos = true;
        showTitle()
        $('.sliderStep01').removeClass("dn");
        openSlider()
    })

    $("#terminos").click(function(){
        $(".terminos").removeClass("dn")
        openSlider(true)
    })

    $("#activarPagos button").click(function(){
        pagos = true;
        showTitle()
        $('.sliderStep03').removeClass("dn");
        openSlider()
    })



    $(".close").click(function () {


        anime({
            targets: '.sombra',
            opacity:[.8,0],
        });

        anime({
            targets: '.ventana',
            translateY:[0,0],
            scale:[1,.8],
            opacity:[1,0],
            easing:'spring(1, 100, 20, 15)',
            complete:function(){
                $(".cont-modal, .pasos , .terminos").addClass("dn")
                if(!terminos){
                    $('.sliderStep01,.sliderStep02,.sliderStep03').slick('unslick');
                }else{
                    terminos=false
                }

                vinculaPagos=false;
                pagos=false;
                vinculaRetiros=false;
                $('.sliderStep03, .sliderStep01,.sliderStep02').addClass("dn")
                showTitle(true)

            }
        });
    })



    $(".curva").css({height:($(".s02").offset().top + $(".s02").height())})
    $(".iconCircle").addClass("reposo");
    $(".myList li").addClass("opn");





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
