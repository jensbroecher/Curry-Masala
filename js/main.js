document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
screen.lockOrientation('portrait');
}
    
function showindicator() {
document.getElementById("loadingindicator").className = "animated fadeIn";
document.getElementById("loadingindicator").style.display = "block";
}

function addcart() {
	
	localStorage.setItem("cartopen","Yes");
	
	var speise = localStorage.getItem("speise");
	
	$("#addcart").load("http://curry-masala.de/app_admin/addcard.php?itemid="+speise+"", function(responseTxt, statusTxt, xhr) {
    	document.getElementById("addcart").style.height = "50%";
		document.getElementById("addcartbutton").style.height = "50px";
		document.getElementById("addcartbutton").className = "animated fadeIn";
		
		document.getElementById("cardcontent").className = "blur";
    });
}
function closecart() {
    	document.getElementById("addcart").style.height = "0%";
		document.getElementById("addcartbutton").style.height = "0%";
		document.getElementById("addcartbutton").className = "";
		document.getElementById("cardcontent").className = "noblur";
	
		localStorage.setItem("cartopen","No");
}

function opennav() {
	
	swal.close();
	
	var cartopen = localStorage.getItem('cartopen');

    if (cartopen == 'Yes') {
     	closecart();
    }
	
	document.getElementById("sidenav").style.marginLeft = "0px";
	document.getElementById("navoverlay").style.display = "block";
	document.getElementById("navigation_menu_btn").style.display = "none";
	document.getElementById("navigation_menu_btn_close").style.display = "block";
	$("body").bind("touchmove", function(e){e.preventDefault()});
	$("body").addClass("stop-scrolling");
}
function closenav() {
	document.getElementById("sidenav").style.marginLeft = "-400px";
	document.getElementById("navoverlay").style.display = "none";
	document.getElementById("navigation_menu_btn").style.display = "block";
	document.getElementById("navigation_menu_btn_close").style.display = "none";
	$("body").unbind("touchmove");
	$("body").removeClass("stop-scrolling");
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
function closeshoppingcart() {
	document.getElementById("shoppingcart").style.display = "none";
	document.getElementById("cardcontent").style.display = "block";
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


function checkout() {
	
	var shoppingcarttotal = document.getElementById("shoppingcarttotal").innerHTML;
	
	localStorage.setItem("shoppingcarttotal",shoppingcarttotal);
	
	if (shoppingcarttotal == "0.00€") {
		sweetAlert("Warenkorb leer", "", "info");
		closeshoppingcart();
		return;
	}
	
	
	document.getElementById("shoppingcart").style.display = "none";
	document.getElementById("checkout").style.display = "block";
	
	$( "#checkout" ).load( "http://curry-masala.de/app_admin/checkout.php", function() {
  		
	});
}

function payoptions() {
	
	var vorname = document.getElementById("vorname").value; localStorage.setItem("vorname",vorname);
	var nachname = document.getElementById("nachname").value; localStorage.setItem("nachname",nachname);
	var strasse = document.getElementById("strasse").value; localStorage.setItem("strasse",strasse);
	var telefon = document.getElementById("telefon").value; localStorage.setItem("telefon",telefon);
	var email = document.getElementById("email").value; localStorage.setItem("email",email);
	var firma = document.getElementById("firma").value; localStorage.setItem("firma",firma);
	var plz = document.getElementById("plz").value; localStorage.setItem("plz",plz);
	var hinweise = document.getElementById("hinweise").value; localStorage.setItem("hinweise",hinweise);
	var liefernoderabholen = document.querySelector('input[name="liefernoderabholen"]:checked').value;
	localStorage.setItem("liefernoderabholen",liefernoderabholen);
	
	$( "#checkout" ).load( "http://curry-masala.de/app_admin/payoptions.php", function() {
  		
	});
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






































function plus() {
	
	var plusminuscount = document.getElementById("plusminuscount").innerHTML;
	
	if (plusminuscount == "30") {
		return;
	}
	
	var addcart_preis = document.getElementById("addcart_preis").innerHTML;
	var addcart_preis = parseFloat(addcart_preis);

	var addcart_preis_start = localStorage.getItem("addcart_preis_start");
	var addcart_preis_start = parseFloat(addcart_preis_start);
	var addcart_preis_out = addcart_preis + addcart_preis_start;
	
	var addcart_preis_out = addcart_preis_out.toFixed(2);

	document.getElementById("addcart_preis").innerHTML = addcart_preis_out;
	
	
	
	
	var plusminuscount = parseInt(plusminuscount);
	
	var plusminuscount = plusminuscount + 1;
	
	
	
	// alert(plusminuscount);

	document.getElementById("plusminuscount").innerHTML = plusminuscount;
}
function minus() {
	
	
	
	
	var plusminuscount = document.getElementById("plusminuscount").innerHTML;
	
	if (plusminuscount == "1") {
		return;
	}
	
	
	
	var addcart_preis = document.getElementById("addcart_preis").innerHTML;
	var addcart_preis = parseFloat(addcart_preis);

	var addcart_preis_start = localStorage.getItem("addcart_preis_start");
	var addcart_preis_start = parseFloat(addcart_preis_start);
	var addcart_preis_out = addcart_preis - addcart_preis_start;
	
	var addcart_preis_out = addcart_preis_out.toFixed(2);

	document.getElementById("addcart_preis").innerHTML = addcart_preis_out;
	
	
	
	
	
	var plusminuscount = parseInt(plusminuscount);
	
	var plusminuscount = plusminuscount - 1;
	
	// alert(plusminuscount);
	
	document.getElementById("plusminuscount").innerHTML = plusminuscount;
}
	
function additemtoshoppingcart(){
	
showloader();
	
if("cartid" in localStorage){
	var cartid = localStorage.getItem("cartid");
    console.log("Cart ID: "+cartid);
	additemtodb();
} else {
   // alert("Get new Cart ID");
$.get( "http://curry-masala.de/app_admin/shoppingcart.php?task=cartid", function( cartid ) {
	console.log("Cart ID: "+cartid);
	localStorage.setItem("cartid",cartid);
	additemtodb();
});

}
	
}

function additemtodb(){
	
	document.getElementById("navigation_cart_btn").className = "animated fadeIn";
	document.getElementById("navigation_cart_btn").style.display = "block";
	
	var quantity = document.getElementById("plusminuscount").innerHTML;
	var pricetotal = document.getElementById("addcart_preis").innerHTML;
	var productid = localStorage.getItem("speise");
	var speisenname_addcart = localStorage.getItem("speisenname_addcart");
	
	var cartid = localStorage.getItem("cartid");
	
	// Alle Daten gesammelt, scheibe in Warenkorb
	
$.get( "http://curry-masala.de/app_admin/shoppingcart.php?task=additem&cartid="+cartid+"&quantity="+quantity+"&productid="+productid+"&name="+speisenname_addcart+"&pricetotal="+pricetotal+"", function( data ) {

hideloader();
	
swal({   
		title: "Speise hinzugefügt",
		text: ""+speisenname_addcart+"<br>Anzahl: "+quantity+"<br>Preis: "+pricetotal+"€",
		type: "info",
		html: "true",
		showCancelButton: true,
		confirmButtonColor: "#EEB147",
		confirmButtonText: "Zum Warenkorb",
		cancelButtonColor: "#EEB147",
		cancelButtonText: "Zurück zur Karte",
		closeOnConfirm: false
		},
     	function (isConfirm) {
        if (isConfirm) {
				closecart();
           		shoppingcart();
            } else {
				closecart();
            }
});
	
});
	
}
function shoppingcart() {
shoppingcartlist();
}
function shoppingcartlist() {
	
document.getElementById("checkout").style.display = "none";
	
var cartid = localStorage.getItem("cartid");
	
$.get( "http://curry-masala.de/app_admin/shoppingcart.php?task=list&cartid="+cartid+"", function( data ) {
	
swal.close();
	
$.get( "http://curry-masala.de/app_admin/shoppingcart.php?task=total&cartid="+cartid+"", function( preistotal ) {

document.getElementById("shoppingcart").style.display = "block";
document.body.className = "card";
document.getElementById("cardcontent").style.display = "none";
document.getElementById("shoppingcartlist").innerHTML = data;
	
//var preistotal = parseInt(preistotal);
	
var preistotal = parseFloat(preistotal).toFixed(2);
var preistotal = preistotal + "€";
	
document.getElementById("shoppingcarttotal").innerHTML = preistotal;
	
});
});

}
function cartremove() {

var eintragid = localStorage.getItem("eintragid");

$.get( "http://curry-masala.de/app_admin/shoppingcart.php?task=remove&eintragid="+eintragid+"", function( data ) {
	
	shoppingcart();
	
});
}

function sendorder() {
	var bezahlmethode = localStorage.getItem("payoption");
	var bezahlmethode = localStorage.getItem("payoption");
	
	if (bezahlmethode == "Cash") {
		sendorder_step_2();
	}
	if (bezahlmethode == "PayPal") {
		
		shoppingcarttotal = localStorage.getItem("shoppingcarttotal");
		
		shoppingcarttotal = shoppingcarttotal.substring(0, shoppingcarttotal.length - 1);
		
		location.href = "#paypal";
		
		var paypalbrowser = window.open('https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=payment@curry-masala.de&lc=US&item_name=Curry Masala&no_note=1&quantity=1&amount='+shoppingcarttotal+'&currency_code=EUR&bn=BF:btn_donateCC_LG.gif:NonHostedGuest&return=http%3A%2F%2Fcurry-masala.de%2Fapp_admin%2Fpaypal_ok.php&cancel_return=http%3A%2F%2Fcurry-masala.de%2Fapp_admin%2Fpaypal_cancel.php&cpp_header_image=http%3A%2F%2Fcurry-masala.de%2Fapp_admin%2Fpaypal.jpg', '_blank', 'location=yes');
		
	}
}

function sendorder_step_2() {
	
	
	
	document.getElementById("waiting_for_confirmation").style.display = "block";
	
	swal({   title: "Sende Bestellung",
		  text: "Bestellung wird an Curry-Masala übermittelt, einen Moment bitte...",
		  timer: 4000,
		  showConfirmButton: false
		 });
	
	var shoppingcartid = localStorage.getItem("cartid");
	
	$( "#waiting_for_confirmation" ).delay( 1000 ).load( "http://curry-masala.de/app_admin/waiting_for_confirmation.php?shoppingcartid="+shoppingcartid+"", function( data ) {
  		
	});
}
function sendorder_confirmed() {
	
/*
swal({   
	title: "Vielen Dank!",
	text: "Bestellung wurde an Curry Masala gesendet.",
	type: "success",
	showCancelButton: false,
	confirmButtonColor: "#EEB147",
	confirmButtonText: "OK",
	closeOnConfirm: false
}, function(){
	showloader();
});
*/
	
	var shoppingcartid = localStorage.getItem("cartid");
	
	var vorname = localStorage.getItem("vorname");
	var nachname = localStorage.getItem("nachname");
	var strasse = localStorage.getItem("strasse");
	var telefon = localStorage.getItem("telefon");
	var email = localStorage.getItem("email");
	var firma = localStorage.getItem("firma");
	var plz = localStorage.getItem("plz");
	var hinweise = localStorage.getItem("hinweise");	
	var liefernoderabholen = localStorage.getItem("liefernoderabholen");
	var bezahlmethode = localStorage.getItem("payoption");
	
$.get( "http://curry-masala.de/app_admin/sendorder.php?task=send&vorname="+vorname+"&nachname="+nachname+"&strasse="+strasse+"&telefon="+telefon+"&email="+email+"&firma="+firma+"&plz="+plz+"&hinweise="+hinweise+"&shoppingcartid="+shoppingcartid+"&liefernoderabholen="+liefernoderabholen+"&bezahlmethode="+bezahlmethode+"", function( data ) {
	localStorage.removeItem("cartid");
});
	
}