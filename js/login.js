/**
 * Created by Administrator on 2017/9/14.
 */
$(function(e){
    $('#logName').blur(function(e){
        if($('#logName').val() == '' || $('#logName').val().length < 5){
            $('#nameContent').css({'border':'2px red solid'});
            //console.log($('#logName').val());
        }else{
            $('#nameContent').css({'border':'rgba(255,255,255,0.2) 2px solid'});
        }

    });

    $('#logPass').blur(function(e){
        if($('#logPass').val() == '' || $('#logPass').val().length < 5){
            $('#passContent').css({'border':'2px red solid'});
        }else{
            $('#passContent').css({'border':'rgba(255,255,255,0.2) 2px solid'});
        }
    });

    $('#logName').keydown(function(e){
        if($('#logName').val() == '' || $('#logName').val().length < 5){
            $('#nameContent').css({'border':'2px red solid'});
            //console.log($('#logName').val());
        }else{
            $('#nameContent').css({'border':'rgba(255,255,255,0.2) 2px solid'});
        }
    });

    $('#logPass').keydown(function(e){
        if($('#logPass').val() == '' || $('#logPass').val().length < 5){
            $('#passContent').css({'border':'2px red solid'});
        }else{
            $('#passContent').css({'border':'rgba(255,255,255,0.2) 2px solid'});
        }
    });



    function checkName(){
        if($('#logName').val() == '' || $('#logName').val().length < 5){
            $('#nameContent').css({'border':'2px red solid'});
            return false;
        }else{
            $('#nameContent').css({'border':'rgba(255,255,255,0.2) 2px solid'});
            return true;
        }
    };

    function checkPass(){
        if($('#logPass').val() == '' || $('#logPass').val().length < 5){
            $('#passContent').css({'border':'2px red solid'});
            return false;
        }else{
            $('#passContent').css({'border':'rgba(255,255,255,0.2) 2px solid'});
            return true;
        }
    };


    $('#btnLog').bind('click' ,function(e){
        if(checkName() && checkPass()){
            location.href = 'main.html';
        }else{
            console.log('false');
        }
    });

});