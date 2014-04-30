'use strict';

$(function(){
  var TheLog= new Log(1);

  var tickIndicator=$('.progress .progress-bar');
  var timer=0;
  var updateTick=function(){
    timer+=5;
    tickIndicator.css('width',timer+'%');
    tickIndicator.attr('aria-valuenow',timer);
    if(timer>=100) timer=0,update();
  };
  
  var update=function(){
    TheLog.getLog()
    .done(function(data){
        switch(data[0].currentState){
          case "close":
            $('body').css('background-color', 'red');
            break;
          
          case "open":
            $('body').css('background-color', 'green');
            break;

        }
    })
    .fail(function(){
        console.log('Error: con not get the log');
    });
  };

  setInterval(updateTick,100);

});
