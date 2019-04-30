'use strict';

const $ = require('jquery');
import '../css/homepage.scss';


$(document).ready(function() {

  //addEventListeners();
  initView();

});


function initView(){

  animStatusQuo();

  //animWheelCabs();
  //animLoop();
  $('.roadmap-label').click(function(){ $('.roadmap-label').addClass('on')} );

}

function animStatusQuo(){
  var connect = function(){
    $('.dash').removeClass('in').removeClass('out');
    for(var i = 1; i <4; i++){

      var r = Math.random();
      if( r >= 0.33){
        if(r>=0.66){
          $('#dash-'+i).addClass('in');
        }
        else
        {
          $('#dash-'+i).addClass('out');
        }
      }
    }

  }
  connect();
  setInterval(connect, 1000);
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
  var rayon = 40;

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
  for(var deg = start; deg>end; deg-=360/(points/2)){
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

  for(var deg = end; deg<=start; deg+=360/(points/2)){
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
