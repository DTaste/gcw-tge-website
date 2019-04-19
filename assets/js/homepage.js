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





function animWheelCabs(){
  var rayon = 140 /2;
  var posXY = [];
  for(var deg = 180; deg>=-180; deg-=22.5){
    var angleRad = deg/180*Math.PI;
    var x=(rayon)+(rayon)*Math.cos(angleRad) + 355;
    var y=(rayon)+(rayon)*Math.sin(angleRad) + 180;
    posXY.push({'x':x,'y':y});
  }

  var move = function(){

    var cabCount = 8;
    var posCount = posXY.length;
    for(var cab = 1; cab<=cabCount; cab++){
      var found = false;
      for(var pos = 0; pos<=posCount && !found; pos++){
        //console.log('cab',cab, pos);
        if($('#wheel-cab-'+cab).hasClass('wheel-cab-pos'+pos))
        {
          var found = true;
          $('#wheel-cab-'+cab).removeClass('wheel-cab-pos'+pos);
          var angle_index = pos+1;
          if(angle_index>=posCount){
            $('#wheel-cab-'+cab).addClass('wheel-cab-pos1');
            angle_index = 1;
          }else{
            $('#wheel-cab-'+cab).addClass('wheel-cab-pos'+(pos+1));
          }
          angle_index--;

          $('#wheel-cab-'+cab).css('top',posXY[angle_index].x+"px").css('left',posXY[angle_index].y+"px");
          //console.log(x,y, angles[angle_index], angle_index);
        }
      }

    }

  }
  move();


  var moveSpeed = (10 * 1000)/(posXY.length-1);
  setTimeout(function(){
    $('#wheel').addClass('rotate-10s');
  },moveSpeed);
  console.log(moveSpeed, posXY.length)
  $('.wheel-cab').css('transition-duration',moveSpeed+'ms').css('opacity',1);
  setInterval(move,moveSpeed);
}
