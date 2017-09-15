/**
 * Created by Administrator on 2017/9/15.
 */
$(function(e){

    $('#form').submit(function(){
        return false;
    });

    var songCateObjs = [];
    var songInfoObjs = [];

    loadSongCateOpt();

    loadSongInfo();

    function loadSongCateOpt(){
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/list',
            data: '',
            method: 'get',
            success: function(data){
                //console.log(data);
                songCateObjs = data.Data;
                for(var i = 0; i < songCateObjs.length; i++){
                    createSongCateOpt(songCateObjs[i]).appendTo('#selCate');
                }

            },
            dataType: 'json'
        });
    };


    //
    function createSongCateOpt(item){
        var $opt = $('<option></option>');
        $opt.attr({value:item.SongCategory.Name});
        $opt.text(item.SongCategory.Name);
        return $opt;
    };

    //
    function loadSongInfo(){
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/song/list',
            data: '',
            method: 'get',
            success: function(data){
                console.log(data);
                songInfoObjs = data.Data;
            },
            dataType: 'json'
        });
    };

    //
    $('#btnSearch').bind('click' ,function(e){
        var $temp = Array.from(songInfoObjs);
        if($('#selCate').val() != 0){
            //console.log($('#selCate').val());
            //console.log($temp);
            for(var i = $temp.length - 1; i >= 0 ; i--){
                if($temp[i].CategoryName !== $('#selCate').val()){
                    $temp.splice(i ,1);
                }
            }
            //console.log($temp);
        }
        if($('#selSingerName').val() != ''){
            for(var i = $temp.length - 1; i >= 0; i--){
                if($temp[i].SinerName.indexOf($('#selSingerName').val()) == -1){
                    $temp.splice(i ,1);
                }
            }
        }
        console.log($temp);
    });
});