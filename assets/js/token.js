'use strict';

const $ = require('jquery');
const Web3 = require('web3');


$(document).ready(function() {

  //addEventListeners();
  initView();

});
function initView(){
  console.log('token', Web3);
  if($('#gcw-periods-presale').length>0){
    console.log('Presale ETH collected : ', $('#eth-collected').html());
  }
  else{
      console.log('Sale Current period : ', $('#period-count').html());
  }
}
