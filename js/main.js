document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
screen.lockOrientation('portrait');
}
    
function showindicator() {
document.getElementById("loadingindicator").className = "animated fadeIn";
document.getElementById("loadingindicator").style.display = "block";
}

function account() {
	showloader();
	
	setTimeout(function(){ 
	document.body.className = "account";
	document.getElementById("start_overlay").style.display = "none";
	document.getElementById("logo").style.display = "none";
	document.getElementById("account").style.display = "block";
	}, 1000);
	
	setTimeout(function(){ 
	hideloader();
	}, 2000);
	
}
function signin() {
	
	showloader();
	
	setTimeout(function(){ 
	document.body.className = "signin";
	document.getElementById("account").style.display = "none";
	document.getElementById("signin").style.display = "block";
	}, 1000);
	
	setTimeout(function(){ 
	hideloader();
	}, 2000);
}
function card() {
	
	showloader();
	
	setTimeout(function(){ 
	
	document.body.className = "card";
	document.getElementById("account").style.display = "none";
		
	}, 1000);
	
	setTimeout(function(){ 
	hideloader();
	}, 2000);
	
	$( "#card" ).load( "http://curry-masala.de/app_admin/card.php", function() {
  	
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

function showloader() {
	document.getElementById("transition").className = "animated fadeIn";
	document.getElementById("transition").style.display = "block";
}
function hideloader() {
	document.getElementById("transition").className = "animated fadeOut";
	setTimeout(function(){ 
		document.getElementById("transition").style.display = "none";
	}, 1000);
}