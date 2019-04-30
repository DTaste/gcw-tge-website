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

  reverseGroupIcons();
  animScheme();

}
var groups = [
  {'htmlId': "#gcw-video", 'index': 1},
  {'htmlId': "#gcw-video-menu", 'index': 1},
  {'htmlId': "#about", 'index': 1},
  {'htmlId': "#ecosystem", 'index': 1}
];
function reverseGroupIcons (){
  var fadeItems = function(){
    var groupCount = groups.length;
    for(var i = 0; i<groupCount; i ++){
      console.log(groups[i].htmlId, groups[i].index);
      reverseIconsOfGroup(groups[i].htmlId, groups[i].index);
      groups[i].index++;
      if(!$(groups[i].htmlId+' .gcw-ico-g'+groups[i].index+'-1').hasClass('gcw-ico')){
        groups[i].index=1;
      }
    }
  }
  fadeItems();
  setInterval(fadeItems,4000);
}

function addEventsListeners(){
  addScrollListener();
  menuListener();
  $('#close-timer-btn').click( function(){ $('#presale-timer').addClass('d-none') });
}



function menuListener(){


  var toggleMenu = function(){

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



function reverseIconsOfGroup(htmlId, groupIndex){
  var icons = ['gocoworker','gocompany','gocobooster','gococampus'];
  var iconCount = icons.length;


  $(htmlId+' .fadeIO.on').removeClass('on');

  var rand = randomIndex(icons);
  var rand2 = randomIndex(icons);
  while(rand2==rand){
    rand2 = randomIndex(icons);
  }

  var icoKlassIndex1 = '.gcw-ico-g'+groupIndex+'-'+(rand);
  var icoKlassIndex2 = '.gcw-ico-g'+groupIndex+'-'+(rand2);

  //reverse icons
  var icoKlassName1;
  var icoKlassName2;
  for(var i = 0; i<iconCount ; i++)
  {
    if($(htmlId+' '+icoKlassIndex1).hasClass('gcw-ico-'+icons[i])){
      icoKlassName1 = 'gcw-ico-'+icons[i];
    }

    if($(htmlId+' '+icoKlassIndex2).hasClass('gcw-ico-'+icons[i])){
      icoKlassName2 = 'gcw-ico-'+icons[i];
    }
  }

  $(htmlId+' '+icoKlassIndex1).addClass('on');
  $(htmlId+' '+icoKlassIndex2).addClass('on');

  setTimeout(function(){
    $(htmlId+' '+icoKlassIndex1).removeClass(icoKlassName1).addClass(icoKlassName2);
    $(htmlId+' '+icoKlassIndex2).removeClass(icoKlassName2).addClass(icoKlassName1);
  }, 1500);
}




function animScheme(){
  //rain

  var rain = function(){
    if($('.drop.off').length>0){
      $('.drop.off').removeClass('off');
    }

    var waiting = $('.drop:not(.on)');
    //var dropping = $('.drop.on');
    var drop = 0;
    var width = $('#archi-main-body-content').width();

    while(drop<1 && waiting.length>0){
      var left = Math.round((Math.random()*60))+20;
      if($('.drop-p-'+left).length==0){
        var rand = randomIndex(waiting);

        $(waiting[rand]).addClass('on').addClass('drop-p-'+left).css('left', left+"%");

        drop++;
        waiting = $('.drop:not(.on)');
      }
    }
    if(waiting==0){
      clearInterval(rainIntervalId);
    }

  }

  rain();
  var rainIntervalId = setInterval(rain,350);

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
