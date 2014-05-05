'use strict';

function Log(commandCount){

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

function LogDisplay(parentID){
	var _parent=parentID;

	var _template=_.template('<table class="table table-striped" id="thelog">' +
						      '<thead><tr><th>User</th><th>Command</th><th>Time <i class="fa fa-spinner fa-spin" style="float: right;"" title="Watching changes..."></i></th></tr></thead><tbody>' +
						      '<% _(data).each(function(item){ %><tr><td><%= item.user %></td><td><%= item.currentState %></td><td><%= item.time %></td></tr><% }) %>' +
						      '</tbody></table>');

	this.show=function(data){
		$(_parent).replaceWith(_template({data: data}));
	};

}

function CMD(){
	var _URL='cmd?command=';
	var _request;

	this.send=function(command){
		var def=$.Deferred();
	    if(_request){
	        if(_request.readyState < 4){//abort previous request
	            _request.abort();
	        }
		}
	    _request=$.ajax({
	        cache: false,
	        url: _URL+command,
	        method: 'GET',
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

function Login(){
	var _URL='login';
	var _request;
	this.getLogin=function(){
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
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());