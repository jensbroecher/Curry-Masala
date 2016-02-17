document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
screen.lockOrientation('portrait');
}
    
function showindicator() {
document.getElementById("loadingindicator").className = "animated fadeIn";
document.getElementById("loadingindicator").style.display = "block";
}

function addcart() {
	
	var speise = localStorage.getItem("speise");
	
	$("#addcart").load("http://curry-masala.de/app_admin/addcard.php?itemid="+speise+"", function(responseTxt, statusTxt, xhr) {
    	document.getElementById("addcart").style.height = "40%";
		document.getElementById("addcartbutton").style.height = "50px";
		document.getElementById("cardcontent").className = "blur";
    });
}
function closecart() {
    	document.getElementById("addcart").style.height = "0%";
		document.getElementById("addcartbutton").style.height = "0%";
		document.getElementById("cardcontent").className = "noblur";
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
	document.getElementById("card").style.display = "block";
		
	}, 1000);
	
	setTimeout(function(){ 
	hideloader();
	}, 2000);
	
	
  	location.href = "#karte";
	
}
    
$(document).ready(function() {
	
	location.href = "#start";
	
    var rememberuser = localStorage.getItem('rememberuser');

    if (rememberuser == 'Yes') {
     	location.href = "#karte";  
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
	}, 800);
}


var hash = false;
        checkHash();

        function checkHash() {
            if (window.location.hash != hash) {
                hash = window.location.hash;
                processHash(hash);
            }
            t = setTimeout("checkHash()", 200);
        }

        function processHash(hash) {
			if (hash == "#karte") {
				
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
               
                $("#cardcontent").load("http://curry-masala.de/app_admin/card.php?task=start", function(responseTxt, statusTxt, xhr) {
                   
                });
            }
		}