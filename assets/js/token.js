'use strict';

const $ = require('jquery');
const Web3 = require('web3');
const presaleAbi = require('./abi-presale.js').default;
const saleAbi = require('./abi-sale.js').default;

const presaleAddress = '0x0866afA8bA5a7aE93980d0bbe57d0be9D84f6d2d';
const saleAddress = '0xCEA30aB5758cc87fa737CB03f220dF3d3eAAcb36';
$(document).ready(function() {

  //addEventListeners();
  initView();
  setInterval(()=> { initView(); }, 30000);
  

});
function initView(){
  
  var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/82a0d8153d0248ecaf9a7e0829c0d330"));
  
  if($('#gcw-periods-presale').length>0){
    
    var presale = web3.eth.Contract(presaleAbi);
    presale.address = presaleAddress;
    presale.methods.weiRaised().call().then((result)=> {
      var ethcollected = web3.utils.fromWei(result.toString());
      $('#eth-collected').text(ethcollected);
      var percent = web3.utils.toBN(ethcollected).div(web3.utils.toBN(210000)).mul(web3.utils.toBN(100));
      $('#eth-progress-value').css('width',percent.toString()+'%');
      var gcwdist = web3.utils.toBN(ethcollected).mul(web3.utils.toBN(100));
      $('#gcw-distributed').text(gcwdist.toString());
      $('#gcw-progress-value').css('width',percent.toString()+'%');      
    });
    
    $('#gcw-contributor').text('');
    
  }
  else{
    var sale = web3.eth.Contract(saleAbi);
    sale.address = saleAddress;
  
    sale.methods.today().call().then((period)=> {
      $('#period-count').text(period.toString()+' / 250');
      var gcwdist = web3.utils.toBN(period).mul(web3.utils.toBN(42000));
      var percent = gcwdist.div(web3.utils.toBN(10500000)).mul(web3.utils.toBN(100));
      $('#gcw-distributed').text(gcwdist.toString());
      $('#gcw-progress-value').css('width',percent.toString()+'%');      

      sale.methods.dailyTotal(period).call().then((result)=> {        
        var ethcollected = web3.utils.fromWei(result.toString());
        $('#eth-collected').text(ethcollected);
        var ethFloat = parseFloat(ethcollected);
        var minPrice = ethFloat == 0 ? Math.max(0.1,ethFloat):ethFloat;
        var price = (minPrice / 42000.0).toString();
        $('#gcw-price').text(Number.parseFloat(price).toFixed(8));
      });
    });
    
  }
}
