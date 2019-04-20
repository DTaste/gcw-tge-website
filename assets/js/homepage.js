'use strict';

const $ = require('jquery');
import '../css/homepage.scss';


$(document).ready(function() {

  //addEventListeners();
  initView();

});


function initView(){
  //animWheelCabs();
}




//whrite css animation in console
function animWheelCabs(){
  var rayon = 140 /2;
  var posXY = [];
  var i = 0;
  var rows = "";
  var posCab = 14;
  var start = 180+22.5*posCab;
  var end = -180 + 22.5*posCab;

  for(var deg = start; deg>=end; deg-=22.5){
    var angleRad = deg/180*Math.PI;
    var x=(rayon)+(rayon)*Math.cos(angleRad) + 355;
    var y=(rayon)+(rayon)*Math.sin(angleRad) + 180;
    posXY.push({'x':x,'y':y});
    var p = i*100/16;
    rows += p+"% { top: "+x+"px;left: "+y+"px; }"+"\n";
    i++;
  }
  /*
  console.log(rows);
  console.log(JSON.stringify(posXY));
*/
  return;


}
