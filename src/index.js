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

var sliders = {
    vinculaPagos    : $('.sliderStep01'),
    vinculaRertiros : $('.sliderStep02'),
    realizaPagos    : $('.sliderStep03'),
    realizaRetiros  : $('.sliderStep04'),
}

var titulos = {
    vinculaPagos    :  $(".vinculat"),
    vinculaRertiros :  $(".vinculat"),
    realizaPagos    :  $(".pagost"),
    realizaRetiros  :  $(".retirost")
}

var sliderActivo =  null;
var tituloActivo = null;
var terminos = false;

var paraP     = $("#tab-pagos"),
    paraR     = $("#tab-retiros"),
    selection = $("#selection"),
    btnClose  = $(".btnClose");

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

var cambiaPagosRetirosslider = (x)=>{

    let sale   =  x  === "pagos" ? ".sliderStep02" : ".sliderStep01";
    let entra  =  x  === "pagos" ? ".sliderStep01" : ".sliderStep02";

    sliderActivo = $(entra)

    $(".mini-tabs button").attr("disabled",true)
    btnClose.attr("disabled",true)

    $(sale).css({
        position:"absolute",
        top:0
    })
    anime({
        targets:sale,
        translateY:x  === "pagos" ? ["0","100%"]:["0","-100%"],
        easing: 'spring(1, 250, 18, 10)',
        opacity:[1,0],
        complete:function(){
          $(sale).slick('unslick')
            $(sale).css({
                position:"relative",
                transform:"translateY(0)",
                opacity:"1"
            }).addClass('dn')
            console.log("lo quité")
        }
    })

    $(entra).removeClass("dn")
    setTimeout(function () {
        sliderActivo.slick({
            arrows:false,
            infinite:false,
            dots:true
        })
    },5)

    anime({
        targets:entra,
        translateY:x  === "pagos" ? ["-100%","0"]:["100%","0"],
        easing: 'spring(1, 250, 18, 10)',
        opacity:[0,1],
        complete:function(){
            $(".mini-tabs button").removeAttr("disabled")
            btnClose.removeAttr("disabled")
        }

    })

    $(".btn-van.left").click(function () {$(entra).slick('slickPrev')})
    $(".btn-van.right").click(function () {$(entra).slick('slickNext')})
}


var minitabs = function(){

    //mueve la seleccion
    let moveSelection = ()=>{
        if(paraR.hasClass('active')){
            selection.css({
                transform:"translateX(0)"
            })
        }else{
            selection.css({
                transform:"translateX(-100%)"
            })
        }
    }

    //CLICK DE LOS TABS
    let Tabsfunction = function(x){
         let disable =  x === "pagos" ? paraP : paraR;
         let active  =  x === "pagos" ? paraR : paraP;

        disable
             .attr("disabled",true)
             .addClass("active")
        active
            .attr("disabled",false)
            .removeClass("active")
        cambiaPagosRetirosslider(x)
    }

    moveSelection()

    paraP.click(function(){
        Tabsfunction('pagos')
        moveSelection()
    })

    paraR.click(function(){
        Tabsfunction('retiros')
        moveSelection()
    })
}

var openSlider = function(term,slider){

    if(!term){
        minitabs()
        sliderActivo = sliders[slider]
        sliderActivo.removeClass("dn").slick({
            arrows:false,
            infinite:false,
            dots:true
        })

        tituloActivo = titulos[slider]
        tituloActivo.removeClass("dn")
        $(".btn-van.left") .click(function (){ sliderActivo.slick('slickPrev')})
        $(".btn-van.right").click(function (){ sliderActivo.slick('slickNext')})
    }

    if(slider === ""){

    }

    if(term) {
        $(".cont-modal ,.terminos").removeClass("dn")
        terminos = true;
    }
    else{$(".cont-modal,.pasos").removeClass("dn")}

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
            easing:'spring(1, 100, 20, 20)'
        });
    },100)
}




$(document).ready(function(){

    $("#btnone").click(function(){animaScroll("visionGeneral")})
    $("#btntwo").click(function(){animaScroll("paraPagos")})
    $("#btnthree").click(function(){animaScroll("paraRetiros")})
    $("#btnFour").click(function(){animaScroll("comoUsarlo")})
    $("#btnfive").click(function(){animaScroll("vincular")})

    $(".curva").css({height:($(".s02").offset().top + $(".s02").height())})
    $(".iconCircle").addClass("reposo");
    $(".myList li").addClass("opn");

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




    if(window.location.hash === "#politicas"){
        $(".terminos").removeClass("dn")
        openSlider(true)
    }

    //abre los terminos y condiciones
    $("#terminos").click(function(){
        $(".terminos").removeClass("dn")
        openSlider(true)
    })

    //vincula
    $("#paraVincular").click(function(){
        $(".vincula").removeClass("dn")
        openSlider(false,'vinculaPagos')
    })

    //realizar pagos
    $("#realizarPagos").click(function(){
        openSlider(false,'realizaPagos')
    })

    //realizar retiros
    $("#realizaRetiros").click(function(){
        openSlider(false,'realizaRetiros')
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
                if(sliderActivo !== null){
                    sliderActivo.slick('unslick')
                    .css({
                        position:"relative"
                    })
                    sliderActivo.addClass("dn")
                    sliderActivo = null;
                    tituloActivo.addClass("dn")
                    tituloActivo = null;

                    paraP.addClass("active")
                    paraR.removeClass("active")
                }
                $(".cont-modal,.terminos,.pasos").addClass("dn")
            }
        });
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
