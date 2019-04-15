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



// any CSS you require will output into a single css file (app.css in this case)
import '../css/app.scss';


import swal from 'sweetalert2';

import AOS from 'aos';
import 'aos/dist/aos.css';






$('document').ready(function(){



  initView();

  addEventsListeners();

});

function initView(){
  preSaleCountDown();

}
function addEventsListeners(){
  //addEventOnInputFile();


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
