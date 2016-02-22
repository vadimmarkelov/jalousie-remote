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
  $goto=$_GET["goto"]?$_GET["goto"]:"";
  $user = UserService::getCurrentUser();
  if($user) {
    $li->url=$url = UserService::createLogoutURL($goto, "google.com");
    $url_linktext = "Logout";
    $li->author=$author = $user->getNickname();
    $welcomeText="Hello, ".$author."!";
  }
  else {
    $li->url=$url = UserService::createLoginURL($goto);
    $url_linktext = "Login";
    $li->author=$author = "";
    $welcomeText="Hello!";
  }


  $memcache = new Memcache;
  
?>