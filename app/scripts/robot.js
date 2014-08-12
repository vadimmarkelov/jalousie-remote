function Log(commandCount){
    'use strict';
    var _URL='cmd?command=getlog'+(commandCount?('&count='+commandCount):'');

    var _request;

    this.getLog=function(){
        var def=$.Deferred();
        if(_request){
            if(_request.readyState < 4){//abort previous request
                _request.abort();
            }
        }
        _request=$.ajax({
            cache: false,
            url: _URL,
            method: 'GET',
            dataType: 'json',
            success: function(data){
                def.resolve(data);
            },
            error: function(jqXHR, exception){
                if (exception === 'abort') {
                    return;
                }
                def.reject();
            }
        });

        return def.promise();
    };

}


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
  'use strict';
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
      }
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
      }
}());

$(function(){
  'use strict';
  var TheLog= new Log(1);

  var tickIndicator=$('.progress .progress-bar');
  var timer=0;

  //control if user is on the page
  var pageHasBeenActive;
  var AFhandler= function() {
    pageHasBeenActive=true;
    requestAnimationFrame(AFhandler);
  };
  AFhandler.call();

  var updateTick=function(){
    if(!pageHasBeenActive){
      return;
    }
    pageHasBeenActive=!pageHasBeenActive;
    timer+=5;
    tickIndicator.css('width',timer+'%');
    tickIndicator.attr('aria-valuenow',timer);
    if(timer>=100) {timer=0; update();}
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
        $('.user').html(data[0].user);
    })
    .fail(function(){
        console.log('Error: con not get the log');
    });
  };

  setInterval(updateTick,100);
});

