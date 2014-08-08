<?php
  require_once 'google/appengine/api/users/User.php';
  require_once 'google/appengine/api/users/UserService.php';

  use google\appengine\api\users\User;
  use google\appengine\api\users\UserService;

  class LoginInfo {
    public $url="";
    public $author="";
  }

  $li=new LoginInfo();

  $user = UserService::getCurrentUser();
  if($user) {
    $li->url=$url = UserService::createLogoutURL('', "google.com");
    $url_linktext = "Logout";
    $li->author=$author = $user->getNickname();
    $welcomeText="Hello, ".$author."!";
  }
  else {
    $li->url=$url = UserService::createLoginURL('');
    $url_linktext = "Login";
    $li->author=$author = "";
    $welcomeText="Hello!";
  }


  $memcache = new Memcache;
  
?>