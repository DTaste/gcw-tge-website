'use strict';

const $ = require('jquery');
import '../css/homepage.scss';


$(document).ready(function() {

  //addEventListeners();
  initView();

});


function initView(){
  animWheelCabs();
}




//whrite css animation in console
function animWheelCabs(){
  var rayon = 140 /2;
  //var posXY = [];
  var x0 = 355;
  var y0 = 180;



  var nbCab = 8;
  var points = 32;
  for(var posCab = 0; posCab<=32;posCab+=(points/nbCab)){
    var rows = "";
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

      //posXY.push({'x':x,'y':y});

      rows += p+"% { top: "+x+"px;left: "+y+"px; }"+"\n";
      i++;
    }
    console.log('cab',posCab/nbCab);
    console.log(rows);
}


  //console.log(JSON.stringify(posXY));

  return;


}
