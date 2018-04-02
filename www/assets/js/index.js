var baseURL = "http://mpkapi.codeofgeek.com/";
var globalMenu1 = '0'; //its mean for menu id 1
var global = 0;
var button = "<button id='back'  onClick='test();' class='btn btn-danger btn-lg btn-block' >Back</button>"
$(document).ready(function(){
    // $("#contenarea").load('pages/beranda.html');

    $("#mntarjih").click(function(e){
        // $("#contenarea").html('');
        $("#beranda").hide();
        // $("#contenarea").load('pages/putusan.html');
        $("#pagePutusan").show();
        $("#kembaliputusan").show();
        $("#button").html(button);
        $("#dStatusPutusan").hide();
        // $('#myPleaseWait').modal('show');
        $.getlistTarji();
        globalMenu1 = "1";
    });

    $('.close').click(function () {
        $("#dStatusPutusan").hide();
        $(this).parent().removeClass('in'); // hides alert with Bootstrap CSS3 implem
    });

    $("#mn-download").click(function(){
        $("#dStatusPutusan").show();$("#dStatusPutusan").addClass('in'); 
        $("#dStatusPutusan").removeClass('alert-danger alert-warning alert-info').addClass('alert-info'); 
        $("#dStatusContentPutusan" ).html("<strong>Information : </strong>Coming soon");
    });
    
    $("#mn-informasi").click(function(){
        $("#beranda").hide();
        // $("#contenarea").load('pages/putusan.html');
        $("#pageinformasi").show();
        $("#kembaliputusan").show();
        $("#button").html(button);
        $("#dStatusPutusan").hide();
        // $('#myPleaseWait').modal('show');
       // $.getlistTarji();
        globalMenu1 = "1";
        // $("#dStatusPutusan").show();$("#dStatusPutusan").addClass('in'); 
        // $("#dStatusPutusan").removeClass('alert-danger alert-warning alert-info').addClass('alert-info'); 
        // $("#dStatusContentPutusan" ).html("<strong>Information : </strong>Coming soon");
    });

    $("#mn-tentang").click(function(){
        $("#beranda").hide();
        // $("#contenarea").load('pages/putusan.html');
        $("#pageabout").show();
        $("#kembaliputusan").show();
        $("#button").html(button);
        $("#dStatusPutusan").hide();
        // $('#myPleaseWait').modal('show');
       // $.getlistTarji();
        globalMenu1 = "1";
        // $("#dStatusPutusan").show();$("#dStatusPutusan").addClass('in'); 
        // $("#dStatusPutusan").removeClass('alert-danger alert-warning alert-info').addClass('alert-info'); 
        // $("#dStatusContentPutusan" ).html("<strong>Information : </strong>Coming soon");
    });
    // $.LogOut();
    

});

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
       if($.mobile.activePage.is('#mn-informasi')){
        alert(1);
           e.preventDefault();
           navigator.app.exitApp();
       }
       else {
           navigator.app.backHistory();
       }
    }, false);
}

function test(){
    if (globalMenu1 == '1'){
        //back to home
        $("#pagePutusan").hide();
        $("#pageinformasi").hide();
        $("#pageabout").hide();
        
        $("#kembaliputusan").hide();
        $("#beranda").show();
        $("#button").html("");
        globalMenu1 = "0"
    }else if(globalMenu1 == '2'){
        $("#subMenuPutusan").hide();
        $("#pagePutusan").show();
        globalMenu1 = "1";
    }else if(globalMenu1 == '3'){
        $("#isiPutusan").hide();
        $("#subMenuPutusan").show();
        globalMenu1 = "2";
    }
}

$.getlistTarji = function () {
    var modepars = "get_koten";
	$.ajax({
            type: "GET",
            url: baseURL+"api.php",
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data:{method:modepars},
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(){
                $('#myPleaseWait').modal('show');
            },
            success: function (data) {
                var output = '';
                $('#lsPutusan').html(output);
                if(data.length != 0){
                    $.each(data, function () {
                        output += '<a href="#" align="center" id="'+this['Id']+'" name="lsvPutusan" onclick="getSubMenuTarjih(\''+this['Id']+'\')"   class="list-group-item list-group-item-success">' +this['nama_konten']+'</a><br/>';
                    });
                }else{
                    output = '<a href="#" name="lsvPutusan"  class="list-group-item list-group-item-success">data not found !</a>';
                }
                $('#lsPutusan').html(output);
	        	$('#myPleaseWait').modal('hide');
            },
            error: function(data){
                $('#myPleaseWait').modal('hide');
                $("#dStatusPutusan").show();$("#dStatusPutusan").addClass('in'); 
				$("#dStatusPutusan").removeClass('alert-danger alert-warning alert-info').addClass('alert-danger'); 
				$("#dStatusContentPutusan" ).html("<strong>Error : </strong>Check your connection");
            }
    });
};
    


function getSubMenuTarjih(idMenu){
    
    globalMenu1 = "2";
    var modepars = "get_sub_menu";
    $.ajax({
        type: "GET",
        url: baseURL+"api.php",
        headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data:{method:modepars, id:idMenu},
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(){
            $('#myPleaseWait').modal('show');
        },
        success: function (data) {
            $("#pagePutusan").hide();
            $("#subMenuPutusan").show();
            var output="";
            $("#lsSubMenuPutusan").html(output);
            if(data.length != 0){
                $.each(data, function () {
                    output += '<a href="#" align="center" id="'+this['Id']+'" name="lsvSubMenuPutusan" onclick="getFillTarjih(\''+this['Id']+'\',\''+this['Id_konten']+'\')"   class="list-group-item list-group-item-success">' +this['nama_sub_konten']+'</a><br/>';
                });
            }else{
                output = '<a href="#" name="lsvPutusan"  class="list-group-item list-group-item-success">data not found !</a>';
            }
            $('#lsSubMenuPutusan').html(output);
            $('#myPleaseWait').modal('hide');
        },
        error: function(data){
            $('#myPleaseWait').modal('hide');
            $("#dStatusPutusan").show();$("#dStatusPutusan").addClass('in'); 
            $("#dStatusPutusan").removeClass('alert-danger alert-warning alert-info').addClass('alert-danger'); 
            $("#dStatusContentPutusan" ).html("<strong>Error : </strong>Check your connection");
        }
    });
};

function getFillTarjih(idSubMenu, idMenu){
    globalMenu1 = "3";
    var modepars = "get_isi_konten";
    $.ajax({
        type: "GET",
        url: baseURL+"api.php",
        headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data:{method:modepars, Id_konten:idMenu, Id_sub_menu:idSubMenu},
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(){
            $('#myPleaseWait').modal('show');
        },
        success: function (data) {
            $("#subMenuPutusan").hide();
            $("#isiPutusan").show();
            $("#headisiputusan").html(data[0].nama_sub_konten);
            $("#isikontenputusan").html(data[0].isi_konten);
            $('#myPleaseWait').modal('hide');
        },
        error: function(data){
            $('#myPleaseWait').modal('hide');
            $("#dStatusPutusan").show();$("#dStatusPutusan").addClass('in'); 
            $("#dStatusPutusan").removeClass('alert-danger alert-warning alert-info').addClass('alert-danger'); 
            $("#dStatusContentPutusan" ).html("<strong>Error : </strong>Check your connection");
        }
    });
};