'use strict';

/*
* Welcome to your app's main JavaScript file!
*
* We recommend including the built version of this JavaScript file
* (and its CSS file) in your base layout (base.html.twig).
*/


// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.
import $ from 'jquery';
//global.$ = $;
//Check https://getbootstrap.com/docs/4.0/getting-started/webpack/ for scss
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//require('popper');

import AOS from 'aos';
import 'aos/dist/aos.css';

// any CSS you require will output into a single css file (app.css in this case)
import '../css/app.scss';
import '../css/mobile.scss';



$('document').ready(function(){



  initView();

  addEventsListeners();

});

function initView(){
  preSaleCountDown();
  animView();
}

function animView(){
  //doc : https://github.com/michalsnik/aos
  AOS.init({
    offset: 100,
    duration: 900,
    delay: 100,
    disable:  (window.innerWidth < 768 || $('#map').length>0 || $('div[data-aos]').length<=6),
    once: true,
  });
  reverseGoIcons();


}

function addEventsListeners(){
  addScrollListener();
  menuListener();
  $('#close-timer-btn').click( function(){ $('#presale-timer').addClass('d-none') });
}



function menuListener(){


  var toggleMenu = function(){
    reverseMenuIcons();
    var opened = $('#menu').hasClass('open');
    $('#menu').toggleClass('open');


    var itemCount = $('#menu ul li').length;
    if(!opened){

      setTimeout(function(){
        $('#logo-white').addClass('on');
        $('#header-video').addClass('on');
      }, 450);

      for (var i = 0; i <itemCount; i++)
      {
        setTimeout( function(index){
          //always check if menu is open in case user click twice on btn quickly
          if($('#menu').hasClass('open')){
            $('#menu ul li').eq(index).addClass('on');
          }
          else{
            $('#menu .on').removeClass('on');
          }
        },200*(i+1), i);
      }
    }
    else
    {
      setTimeout(function(){
        $('#menu .on').removeClass('on');
      },100);

    }
  }
  $('#menu a').click(toggleMenu);
  $('#open-btn').click(toggleMenu);
  $('#close-btn').click(toggleMenu);
}



var groupGo = 1;
function reverseGoIcons(){
  var htmlId = "#gcw-video";
  var fadeItems = function(){
    reverseIconsOfGroup(htmlId, groupGo);
    groupGo++;
    if(!$(htmlId+' .gcw-ico-g'+groupGo+'-1').hasClass('gcw-ico')){
      groupGo=1;
    }
  }
  setInterval(fadeItems,3500);
}
// icons within top menu
var groupMenu = 1;
function reverseMenuIcons(){
  var htmlId = "#gcw-video-menu";
  var fadeItems = function(){
    reverseIconsOfGroup(htmlId, groupMenu);
    groupMenu++;
    if(!$(htmlId+' .gcw-ico-g'+groupMenu+'-1').hasClass('gcw-ico')){
      groupMenu=1;
    }
  }
  setInterval(fadeItems,3500);
}

function reverseIconsOfGroup(htmlId, groupIndex){
  var icons = ['gocoworker','gocompany','gocobooster','gococampus'];
  var iconCount = icons.length;
  //  var faddingIcoSession = faddingIco;

  $('.fadeIO.on').removeClass('on');



  var rand = randomIndex(icons);
  var rand2 = rand;
  while(rand2==rand){
    rand2 = randomIndex(icons);
  }
  console.log(rand, rand2);
  var icoKlassIndex1 = htmlId+' .gcw-ico-g'+groupIndex+'-'+(rand);
  var icoKlassIndex2 = htmlId+' .gcw-ico-g'+groupIndex+'-'+(rand2);
  console.log("fadding",icoKlassIndex1, icoKlassIndex2);
  //reverse icons
  var icoKlassName1 = false;
  var icoKlassName2 = false;

  for(var i = 0; i<iconCount ; i++)
  {
    if($(icoKlassIndex1).hasClass('gcw-ico-'+icons[i])){
      icoKlassName1 = htmlId+' gcw-ico-'+icons[i];
    }
    if($(icoKlassIndex2).hasClass('gcw-ico-'+icons[i])){
      icoKlassName2 = htmlId+' gcw-ico-'+icons[i];
    }
  }

  $(icoKlassIndex1).addClass('on');
  $(icoKlassIndex2).addClass('on');

  setTimeout(function(){
    console.log("revert",icoKlassName1, icoKlassName2);
    $(icoKlassIndex1).removeClass(icoKlassName1).addClass(icoKlassName2);
    $(icoKlassIndex2).removeClass(icoKlassName2).addClass(icoKlassName1);
  }, 1500);
}

function animGo(){
  var fadeItems = function(){

    if($('.fadeIO.off').length>0){
      $('.fadeIO.off').removeClass('off');
    }
    $('.fadeIO.on').addClass('off').removeClass('on');
    var items = $('.fadeIO:not(.loop):not(.off):not(.on2)');
    var rand = randomIndex(items);
    var rand2 = rand;
    while(rand2==rand){
      rand2 = randomIndex(items);
    }
    $(items[rand]).addClass('on');

    setTimeout(function(){
      $('.fadeIO.on2').addClass('off').removeClass('on2');
      $(items[rand2]).addClass('on2');
    },1500);
  }
  fadeItems();
  setInterval(fadeItems,3000);
}

function randomIndex(myArray){
  return Math.floor(Math.random() * myArray.length);
}



function addScrollListener  (){

  $('.js-scrollTo').on('click', function(event) {
    var link = $(this).attr('href');
    var component = link.substring(link.lastIndexOf('#'));
    if($(component).length>0){
      event.preventDefault();
      scrollTo(component);
    }
  });
}
function scrollTo  (htmlId){
  var speed = 500;
  //var navHeight = parseInt($('.navbar-brand').height());
  $('html, body').animate( { scrollTop: ($(htmlId).offset().top) }, speed );
}
function preSaleCountDown(){
  var countDownDate = new Date("Jan 17, 2020 12:00:00").getTime();
  var countDown = function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    $('#days').html(days);
    $('#hours').html(hours);
    $('#minuts').html(minutes);
    $('#seconds').html(seconds);


    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
    }
  };
  // Update the count down every 1 second
  var x = setInterval(countDown, 1000);
  countDown();
  $('#presale-timer').removeClass('d-none');

}
