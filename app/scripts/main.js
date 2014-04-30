'use strict';

$(function(){
	var TheLogin= new Login();
	TheLogin.getLogin()
		.done(function(loginData){
			if(!loginData.author){
				$('body').removeClass('user-logged').addClass('user-not-logged');
				$('.loginbutton').text('Login with Googgle account').attr('href',loginData.url);
			} else {
				$('body').removeClass('user-not-logged').addClass('user-logged');
				$('.loginbutton').text('Logout').attr('href',loginData.url);
				update();
			}
			$('#username').text(loginData.author?', '+loginData.author:'');
		});

	var TheLog= new Log();
	var TheLogDisplay = new LogDisplay('#thelog');
	var commander= new CMD();
	var inProgress=false;

	$('.cmd-button').bind('click.cmd', function(){
		inProgress=true;
		$('.cmd-buttons').prop('disabled',true);
		commander.send($(this).attr('data-cmd')).done(function(){
			inProgress=false;
			//TheLog.getLog();
		});
	});

	var update=function(){
		TheLog.getLog()
			.done(function(data){
				TheLogDisplay.show(data);
				if(!inProgress){
					$('.cmd-buttons').prop('disabled',false);
				}
			})
			.always(function(){
				setTimeout(update,500);
			});
	};

	window.update=update;	

});
