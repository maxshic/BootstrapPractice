/**
 * Created by Administrator on 2017/9/15.
 */
$(function(e){

    $('[data-toggle="popover"]').popover();

    $('#form').submit(function(){
        return false;
    });

    var songCateObjs = [];
    var songInfoObjs = [];
    var $copy = $('#tbMain>tr:first').remove();
    var pageSize = 5;

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


    //加载歌曲分类下拉框
    function createSongCateOpt(item){
        var $opt = $('<option></option>');
        $opt.attr({value:item.SongCategory.Name});
        $opt.text(item.SongCategory.Name);
        return $opt;
    };

    //加载歌曲信息
    function loadSongInfo(){
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/song/list',
            data: '',
            method: 'get',
            success: function(data){
                //console.log(data);
                songInfoObjs = data.Data;
                /*for(var i = 0; i < songInfoObjs.length; i++){
                    createSongInfoItem(songInfoObjs[i] ,i).appendTo('#tbMain');
                }*/
                createSongInfoList(songInfoObjs);
            },
            dataType: 'json'
        });
    };

    //创建歌曲列表项
    function createSongInfoItem(item ,i){
        var $tr = $copy.clone();
        $tr.find(':nth-child(1)').text(i + 1);
        $tr.find(':nth-child(2)>img').prop('src' ,item.Image);
        $tr.find(':nth-child(3)').text(item.Name);
        $tr.find(':nth-child(4)').text(item.SinerName);
        $tr.find(':nth-child(5)').text(item.CategoryName);
        $tr.find(':nth-child(6)').text(item.PlayNumber);
        $tr.find(':nth-child(7)>button').text('歌词').attr({'title':item.Name ,'data-content':item.Word}).popover();

        return $tr;
    };

    //创建歌曲列表
    function createSongInfoList(arr){
        $('#tbMain').html('');
        $('.pagination').html('');
        if(arr.length != 0){

            var pageLength = Math.ceil(arr.length / pageSize);
            for(var i = 0; i < pageLength; i++){
                var $li = $('<li><a href="#"></a></li>');
                $li.appendTo('.pagination').find('a').text(i + 1);
                $li.bind('click' , i ,function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    $('#tbMain').html('');
                    //$('.pagination').html('');
                    var startIndex = e.data * pageSize;
                    var endIndex = (e.data + 1) * pageSize < arr.length ? (e.data + 1) * pageSize : arr.length;
                    //console.log(startIndex +':'+ endIndex);
                    for(var i = startIndex; i < endIndex; i++){
                        createSongInfoItem(arr[i] ,i).appendTo('#tbMain');
                    }
                });
            }


            for(var i = 0; i < pageSize && i < arr.length; i++){
                createSongInfoItem(arr[i] ,i).appendTo('#tbMain');
            }
        }else{
            $('.pagination').text('暂无数据哦');
        }

    };

    //查询
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
        //console.log($temp);

        createSongInfoList($temp);
    });
});