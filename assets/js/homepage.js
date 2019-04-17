'use strict';

const $ = require('jquery');
import '../css/homepage.scss';


$(document).ready(function() {

  //addEventListeners();
  initView();

});


function initView(){
  animGo();
  animWheelCabs();
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


function animWheelCabs(){
  var move = function(){

    for(var cab = 1; cab<9; cab++){
      var found = false;
      for(var pos = 1; pos<9 && !found; pos++){
        console.log('cab',cab, pos);
        if($('#wheel-cab-'+cab).hasClass('wheel-cab-pos'+pos))
        {
          var found = true;
          $('#wheel-cab-'+cab).removeClass('wheel-cab-pos'+pos);
          if(pos==8){
            $('#wheel-cab-'+cab).addClass('wheel-cab-pos1');
          }else{

            $('#wheel-cab-'+cab).addClass('wheel-cab-pos'+(pos+1));
          }
        }
      }

    }
  }
  move();
  $('#wheel').addClass('rotate-8s');
  setInterval(move,1000);
}
