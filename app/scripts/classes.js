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

