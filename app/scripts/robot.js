'use strict';

$(function(){
  var TheLog= new Log(1);

  var tickIndicator=$('.progress .progress-bar');
  var timer=0;

  //control if user is on the page
  var pageHasBeenActive;
  var AFhandler= function() {
    pageHasBeenActive=true;
    requestAnimationFrame(AFhandler);
  };
  AFhandler();

  var updateTick=function(){
    if(!pageHasBeenActive){
      return;
    }
    pageHasBeenActive=!pageHasBeenActive;
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

        };
        $('.user').html(data[0].user);
    })
    .fail(function(){
        console.log('Error: con not get the log');
    });
  };

  setInterval(updateTick,100);
});
