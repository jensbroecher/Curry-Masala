dburl = "https://app.curry-masala.de/server/";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    screen.lockOrientation('portrait');
}

function showindicator() {
    document.getElementById("loadingindicator").className = "animated fadeIn";
    document.getElementById("loadingindicator").style.display = "block";
}

function addcart() {

    localStorage.setItem("cartopen", "Yes");

    var speise = localStorage.getItem("speise");

    $("#addcart").load("" + dburl + "addcart.php?itemid=" + speise + "", function (responseTxt, statusTxt, xhr) {
        document.getElementById("addcart").style.height = "250px";
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

    localStorage.setItem("cartopen", "No");
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
    $("body").bind("touchmove", function (e) {
        e.preventDefault()
    });
    $("body").addClass("stop-scrolling");
}

function closenav() {
    try {
        document.getElementById("sidenav").style.marginLeft = "-400px";
        document.getElementById("navoverlay").style.display = "none";
        document.getElementById("navigation_menu_btn").style.display = "block";
        document.getElementById("navigation_menu_btn_close").style.display = "none";
        $("body").unbind("touchmove");
        $("body").removeClass("stop-scrolling");
    } catch (e) {

    }
}

function account(location) {

    localStorage.setItem("location", location);

    showloader();

    setTimeout(function () {
        document.body.className = "account";
        document.getElementById("logo").style.display = "none";
        document.getElementById("branch_select").style.display = "none";
        card();
    }, 1000);

    setTimeout(function () {
        hideloader();
    }, 2000);

}

function signin() {

    if ("email" in localStorage) {
        document.getElementById("email").value = localStorage.getItem("email");
    }

    showloader();

    setTimeout(function () {
        document.body.className = "signin";
        document.getElementById("account").style.display = "none";
        document.getElementById("signin").style.display = "block";
    }, 1000);

    setTimeout(function () {
        hideloader();
    }, 2000);
}

function signin_check() {
    email = document.getElementById("email").value;
    pin = document.getElementById("pin").value;

    $.get("" + dburl + "check_login.php?email=" + email + "&pin=" + pin + "", function (data) {
        if (data == "1") {
            alert("ok");
        }
        if (data == "0") {
            alert("fail");
        }
    });

}

function closeshoppingcart() {
    document.getElementById("shoppingcart").style.display = "none";
    document.getElementById("cardcontent").style.display = "block";
}

function closecheckout() {
    document.getElementById("checkout").style.display = "none";
    document.getElementById("cardcontent").style.display = "block";
}

function card() {

    showloader();

    setTimeout(function () {

        document.body.className = "card";
        document.getElementById("account").style.display = "none";
        document.getElementById("card").style.display = "block";

    }, 1000);

    setTimeout(function () {
        hideloader();
    }, 2000);


    location.href = "#karte";

}


function checkout() {

    $("#ispinner").fadeIn();

    var shoppingcarttotal = document.getElementById("shoppingcarttotal").innerHTML;

    var location = localStorage.getItem("location");

    localStorage.setItem("shoppingcarttotal", shoppingcarttotal);

    if (shoppingcarttotal == "0.00€") {
        
        $("#ispinner").hide();
        
        sweetAlert("Warenkorb ist leer 😞","Bitte füge ein paar unserer Leckeren & Gesunden Speisen hinzu.", "", "info");
        closeshoppingcart();
        return;
    }

    document.getElementById("shoppingcart").style.display = "none";
    document.getElementById("checkout").style.display = "block";

    $("#checkout").load("" + dburl + "checkout.php?location=" + location + "", function () {
        $("#ispinner").fadeOut();
    });
}

function payoptions() {

    var vorname = document.getElementById("vorname").value;
    localStorage.setItem("vorname", vorname);
    var nachname = document.getElementById("nachname").value;
    localStorage.setItem("nachname", nachname);
    var strasse = document.getElementById("strasse").value;
    localStorage.setItem("strasse", strasse);
    var telefon = document.getElementById("telefon").value;
    localStorage.setItem("telefon", telefon);
    var email = document.getElementById("email").value;
    localStorage.setItem("email", email);
    var firma = document.getElementById("firma").value;
    localStorage.setItem("firma", firma);
    var plz = document.getElementById("plz").value;
    localStorage.setItem("plz", plz);
    var hinweise = document.getElementById("hinweise").value;
    localStorage.setItem("hinweise", hinweise);
    var liefernoderabholen = document.querySelector('input[name="liefernoderabholen"]:checked').value;
    
    var location = localStorage.getItem("location");
    
    if(location == "dortmund") {
        var liefernoderabholen = "Abholen";
    }
    
    localStorage.setItem("liefernoderabholen", liefernoderabholen);

    var shoppingcarttotalamount = document.getElementById("shoppingcarttotal").innerHTML;
    var shoppingcarttotalamount = shoppingcarttotalamount.substring(0, shoppingcarttotalamount.length - 1);
    var shoppingcarttotalamount = parseInt(shoppingcarttotalamount);

    if (liefernoderabholen == "Liefern") {
        if (shoppingcarttotalamount < 10) {
            sweetAlert("Mindestbestellwert", "Der Mindestbestellwert von 10.00€ wurde noch nicht erreicht.", "info");
            closeshoppingcart();
            closecheckout();
            return;
        }
    }


    $("#checkout").load("" + dburl + "payoptions.php", function () {

    });
}


$(document).ready(function () {

    $("#ispinner").click(function () {
        $("#ispinner").fadeOut();
    });

    $("#sidenav").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            closenav();
        }
    });

    location.href = "#start";

    var returning_user = localStorage.getItem('returning_user');

    var currentTime = new Date().getHours();
    if (0 <= currentTime && currentTime < 5) {
        setnight();
    }
    if (5 <= currentTime && currentTime < 11) {

    }
    if (11 <= currentTime && currentTime < 16) {

    }
    if (16 <= currentTime && currentTime < 22) {

    }
    if (22 <= currentTime && currentTime <= 24) {
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
    setTimeout(function () {
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

    closenav();

    if (hash == "#karte") {

        $("html, body").animate({
            scrollTop: 0
        }, "slow");

        $("#cardcontent").load("" + dburl + "cart.php?task=start", function (responseTxt, statusTxt, xhr) {

        });
    }

    if (hash == "#kontakt") {

        $("html, body").animate({
            scrollTop: 0
        }, "slow");

        var data = `
<img style="width: 90%; display:block; margin: auto;" src="img/cm new logo 2017.png">
            <h3 style="color: #DF600A;">Filiale Dortmund<br>+49 231 223 90 734</h3>
            <h3 style="color: #DF600A;">Filiale Essen<br>+49 201 458 69 204</h3>
    	`;

        $("#cardcontent").html(data);

    }
    
    if (hash == "#allergene") {

        $("html, body").animate({
            scrollTop: 0
        }, "slow");

        var data = `
            
<div style="color: #DF600A; font-size: 90%; text-align: left; padding-left: 60px; padding-top: 60px;">

1. Farbstoffe
<br>
2. Koffeinhaltig
<br>
3. Konservierungsstoffe
<br>
4. Süßstoffe
<br>
5. Antioxidationsmittel
<br>
6. Phosphat
<br>
7. Phenylalaninquelle
<br>
8. Kuhmilch 3.5% Fett
<br>
9. Säuerungsmittel
<br>
A. enthält Weizen
<br>
B. enthält Krebstiere
<br>
C. enthält Ei/Eibestandteile
<br>
D. enthält Soja
<br>
E. enthält Milch/Milchbestandteile

</div>
            
    	`;

        $("#cardcontent").html(data);

    }
    
}

function share() {
        var the_subject = "Curry Masala Restaurants";
        var the_message = "Gesund & Lecker - Jetzt bestellen über unsere eigene Android App - https://curry-masala.de";
        window.plugins.socialsharing.share(the_message, the_subject);
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

function additemtoshoppingcart() {

    $("#ispinner").fadeIn();

    if ("cartid" in localStorage) {
        var cartid = localStorage.getItem("cartid");
        console.log("Cart ID: " + cartid);
        additemtodb();
    } else {
        // alert("Get new Cart ID");
        $.get("" + dburl + "shoppingcart.php?task=cartid", function (cartid) {
            console.log("Cart ID: " + cartid);
            localStorage.setItem("cartid", cartid);
            additemtodb();
        });

    }

}

function additemtodb() {

    document.getElementById("navigation_cart_btn").className = "animated fadeIn";
    document.getElementById("navigation_cart_btn").style.display = "block";

    var quantity = document.getElementById("plusminuscount").innerHTML;
    var pricetotal = document.getElementById("addcart_preis").innerHTML;
    var productid = localStorage.getItem("speise");
    var speisenname_addcart = localStorage.getItem("speisenname_addcart");

    var cartid = localStorage.getItem("cartid");

    // Alle Daten gesammelt, scheibe in Warenkorb

    $.get("" + dburl + "shoppingcart.php?task=additem&cartid=" + cartid + "&quantity=" + quantity + "&productid=" + productid + "&name=" + speisenname_addcart + "&pricetotal=" + pricetotal + "", function (data) {

        $("#ispinner").fadeOut();

        swal({
                title: "Speise hinzugefügt",
                text: "" + speisenname_addcart + "<br>Anzahl: " + quantity + "<br>Preis: " + pricetotal + "€",
                type: "info",
                html: "true",
                showCancelButton: true,
                confirmButtonColor: "#EEB147",
                confirmButtonText: "Zum Warenkorb",
                cancelButtonColor: "#EEB147",
                cancelButtonText: "Zurück",
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
    
    $("#ispinner").fadeIn();

    $.get("" + dburl + "shoppingcart.php?task=list&cartid=" + cartid + "", function (data) {
        
        $("#ispinner").fadeOut();

        swal.close();

        $.get("" + dburl + "shoppingcart.php?task=total&cartid=" + cartid + "", function (preistotal) {

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

    $.get("" + dburl + "shoppingcart.php?task=remove&eintragid=" + eintragid + "", function (data) {

        shoppingcart();

    });
}

function sendorder() {

    registerorder();

    var bezahlmethode = localStorage.getItem("payoption");

    if (bezahlmethode == "Cash") {
        sendorder_step_2();
    }
    if (bezahlmethode == "PayPal") {

        shoppingcarttotal = localStorage.getItem("shoppingcarttotal");

        shoppingcarttotal = shoppingcarttotal.substring(0, shoppingcarttotal.length - 1);

        shoppingcartid = localStorage.getItem("cartid");

        location.href = "#paypal";

        paypalbrowser = window.open('' + dburl + 'paypal_go.php?shoppingcartid=' + shoppingcartid + '&shoppingcarttotal=' + shoppingcarttotal + '', '_blank', 'location=no', 'toolbar=no');

        check_payment_complete();
        document.getElementById("waiting_for_paypal_confirmation").style.display = "block";

    }
}

function cancel_paypal() {
    location.reload();
}

function reopen_paypal() {

    shoppingcarttotal = localStorage.getItem("shoppingcarttotal");
    shoppingcarttotal = shoppingcarttotal.substring(0, shoppingcarttotal.length - 1);
    shoppingcartid = localStorage.getItem("cartid");

    location.href = "#paypal";

    paypalbrowser = window.open('' + dburl + 'paypal_go.php?shoppingcartid=' + shoppingcartid + '&shoppingcarttotal=' + shoppingcarttotal + '', '_blank', 'location=no', 'toolbar=no');
}

function check_payment_complete() {

    shoppingcartid = localStorage.getItem("cartid");

    paypal_checker = setTimeout(function () {
        $.get("" + dburl + "paypal_check.php?shoppingcartid=" + shoppingcartid + "", function (data) {
            if (data == "Yes") {
                paypalbrowser.close();
                document.getElementById("waiting_for_paypal_confirmation").style.display = "none";
                sendorder_step_2();

            } else {
                check_payment_complete();
            }
        });

        console.log("paypal checker running");


    }, 2000);
}


function sendorder_step_2() {

    document.getElementById("waiting_for_confirmation").style.display = "block";

    swal({
        title: "Etwas Geduld bitte",
        text: "Bestellung wird an Curry Masala übermittelt, sobald die Bestellung übermittelt wurde erscheint eine Nachricht auf diesem Bildschirm.",
        timer: 4000,
        showConfirmButton: false
    });

    var shoppingcartid = localStorage.getItem("cartid");

    $("#waiting_for_confirmation").delay(1000).load("" + dburl + "waiting_for_confirmation.php?shoppingcartid=" + shoppingcartid + "", function (data) {

    });
}

function registerorder() {

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
    var location = localStorage.getItem("location");

    $.get("" + dburl + "sendorder.php?task=send&vorname=" + vorname + "&nachname=" + nachname + "&strasse=" + strasse + "&telefon=" + telefon + "&email=" + email + "&firma=" + firma + "&plz=" + plz + "&hinweise=" + hinweise + "&shoppingcartid=" + shoppingcartid + "&liefernoderabholen=" + liefernoderabholen + "&bezahlmethode=" + bezahlmethode + "&location=" + location + "&bestaetigung=No", function (data) {
        $.get("" + dburl + "registerorder.php?shoppingcartid=" + shoppingcartid + "", function (data) {
            localStorage.setItem("returning_user", "Yes");
        });
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

    $.get("" + dburl + "sendorder.php?task=send&vorname=" + vorname + "&nachname=" + nachname + "&strasse=" + strasse + "&telefon=" + telefon + "&email=" + email + "&firma=" + firma + "&plz=" + plz + "&hinweise=" + hinweise + "&shoppingcartid=" + shoppingcartid + "&liefernoderabholen=" + liefernoderabholen + "&bezahlmethode=" + bezahlmethode + "&bestaetigung=Yes", function (data) {
        localStorage.removeItem("cartid");
    });

}









window.addEventListener('load', function () {
    var maybePreventPullToRefresh = false;
    var lastTouchY = 0;
    var touchstartHandler = function (e) {
        if (e.touches.length != 1) return;
        lastTouchY = e.touches[0].clientY;
        // Pull-to-refresh will only trigger if the scroll begins when the
        // document's Y offset is zero.
        maybePreventPullToRefresh =
            window.pageYOffset == 0;
    }

    var touchmoveHandler = function (e) {
        var touchY = e.touches[0].clientY;
        var touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;

        if (maybePreventPullToRefresh) {
            // To suppress pull-to-refresh it is sufficient to preventDefault the
            // first overscrolling touchmove.
            maybePreventPullToRefresh = false;
            if (touchYDelta > 0) {
                e.preventDefault();
                return;
            }
        }
    }

    document.addEventListener('touchstart', touchstartHandler, false);
    document.addEventListener('touchmove', touchmoveHandler, false);
});
