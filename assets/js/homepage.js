'use strict';

const $ = require('jquery');
import '../css/homepage.scss';


$(document).ready(function() {

  //addEventListeners();
  initView();

});


function initView(){
  //animWheelCabs();
  animArchi();
  animLoop();
  $('.roadmap-label').click(function(){ $('.roadmap-label').addClass('on')} );
}




//whrite css animation in console
function animWheelCabs(){
  var rayon = 73.5;

  var x0 = 94;
  var y0 = 73.5;



  var cabCount = 8;
  var points = 32;
  var rows = "";
  var cabIndex = 1;
  for(var posCab = 0; posCab<32;posCab+=(points/cabCount)){
    var row =""
    var i = 0;
    var start = 180 + 360/points*posCab;
    var end = -180 + 360/points*posCab;
    for(var deg = start; deg>=end; deg-=360/points){
      var angleRad = deg/180*Math.PI;
      var x = rayon+rayon*Math.cos(angleRad) + x0;
      var y = rayon+rayon*Math.sin(angleRad) + y0;
      var p = i*100/points;

      x = Math.round(x*10)/10;
      y = Math.round(y*10)/10;
      p = Math.round(p*10)/10;

      row += p+"% { bottom: "+x+"px;right: "+y+"px; };";
      i++;
    }
    rows += '@include keyframes(cab'+cabIndex+') {'+"\n"+row+"\n"+"}";
    cabIndex++;
    //posCab  = 32;
  }
  console.log(rows);
}



//whrite css animation in console
function animLoop(){
  var rayon = 38;

  var x0 = 50;
  var y0 = 10;



  var cabCount = 8;
  var points = 64;
  var rows = "";
  var cabIndex = 1;

  var row =""
  var i = 0;
  var posCab = points * 0.75;
  var start = 180 + 360/points*posCab;
  var end = -180 + 360/points*posCab;
  for(var deg = start; deg>=end; deg-=360/(points/2)){
    var angleRad = deg/180*Math.PI;
    var x = rayon+rayon*Math.cos(angleRad) + x0;
    var y = rayon+rayon*Math.sin(angleRad) + y0;
    var p = i*100/points;

    x = Math.round(x*10)/10;
    y = Math.round(y*10)/10;
    p = Math.round(p*10)/10;

    row += p+"% { bottom: "+x+"px;right: "+y+"px; };";
    i++;
  }
  y0 = y ;
  console.log(y0);
  //var y0 = 126;
  var posCab = points * 0.25;
  var start = 180 + 360/points*posCab;
  var end = -180 + 360/points*posCab;

  for(var deg = end; deg<start; deg+=360/(points/2)){
    var angleRad = deg/180*Math.PI;
    var x = rayon+rayon*Math.cos(angleRad) + x0;
    var y = rayon+rayon*Math.sin(angleRad) + y0;
    var p = i*100/points;

    x = Math.round(x*10)/10;
    y = Math.round(y*10)/10;
    p = Math.round(p*10)/10;

    row += p+"% { bottom: "+x+"px;right: "+y+"px; };";
    i++;
  }
    rows += '@include keyframes(infini) {'+"\n"+row+"\n"+"}"+"\n";

    //posCab  = 32;

  console.log(rows);
}


function animArchi(){
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
    /*
    if(dropping.length>waiting.length){
      console.log('waiting', waiting.length );
      console.log('dropping', dropping.length );
      var wait = 0;
      while(wait<4){
        var rand = randomIndex(dropping);
        $(dropping[rand]).removeClass('on');
        wait++;
      }
    }*/
  }

  rain();
  var rainIntervalId = setInterval(rain,350);

}




function randomIndex(myArray){
  return Math.floor(Math.random() * myArray.length);
}
