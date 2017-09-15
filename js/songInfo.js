/**
 * Created by Administrator on 2017/9/15.
 */
$(function(e){

    var songCateObjs = [];

    loadSongCateOpt();

    function loadSongCateOpt(){
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/list',
            data: '',
            method: 'get',
            success: function(data){
                console.log(data);
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
});