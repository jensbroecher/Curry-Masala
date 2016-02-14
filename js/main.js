document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
screen.lockOrientation('portrait');
}
    
function showindicator() {
document.getElementById("loadingindicator").className = "animated fadeIn";
document.getElementById("loadingindicator").style.display = "block";
}

function account() {
	document.body.className = "account";
	document.getElementById("start_overlay").style.display = "none";
	document.getElementById("logo").style.display = "none";
	document.getElementById("account").style.display = "block";
}
function signin() {
	document.body.className = "signin";
	document.getElementById("account").style.display = "none";
	document.getElementById("signin").style.display = "block";
}
function card() {
	document.body.className = "card";
	document.getElementById("account").style.display = "none";
	
	$( "#card" ).load( "http://curry-masala.de/app_admin/card.php", function() {
  	alert( "Load was performed." );
	});
}
    
$(document).ready(function() {
    var rememberuser = localStorage.getItem('rememberuser');

    if (rememberuser == 'Yes') {
       
    }
    else {

    }
    
var currentTime = new Date().getHours();
      if (0 <= currentTime&&currentTime < 5) {
          setnight();
      }
      if (5 <= currentTime&&currentTime < 11) {

      }
      if (11 <= currentTime&&currentTime < 16) {

      }
      if (16 <= currentTime&&currentTime < 22) {

      }
      if (22 <= currentTime&&currentTime <= 24) {
          setnight();
      }
    
});
    
function setnight() {

}