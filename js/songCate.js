/**
 * Created by Administrator on 2017/9/14.
 */
$(function(e){
    var $temp = $('#tbMain>tr:first').remove();
    var cateId = 0;
    var lineNum = 0;

    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/list',
        data: '',
        method: 'get',
        success: function(data){
            //console.log(data);
            var objs = data.Data;

            for(var i = 0; i < objs.length; i++){
                createSongCateItem(objs[i].SongCategory, objs[i].Count ,i).appendTo('#tbMain');
            }

        },
        dataType: 'json'
    });

    function createSongCateItem(item , count ,i){
        //var $tr = $('<tr><td>1</td><td>经典老歌</td><td>99</td><td><a href="#"><i class="glyphicon glyphicon-book"></i> 编辑</a></td></tr>');
        //console.log($temp);
        var $tr = $temp.clone();
        $tr.find('td:first').text(i + 1);
        $tr.find(':nth-child(2)').text(item.Name);
        $tr.find(':nth-child(3)').text(count);

        $tr.find(':nth-child(4)>a').bind('click' , {id:item.Id,name:item.Name,num:i+1} ,function(e){
            $('#cateEditName').val(e.data.name);
            cateId = e.data.id;
            /*$.ajax({
                url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/update',
                data: {id: e.data.id,name: e.data.name},
                method: 'post',
                success: function(data){
                    console.log(data);
                },
                dataType: 'json'
            });*/
            lineNum = e.data.num;
            $('#dialogEdit').modal('show');
        });

        return $tr;

    };

    //保存
    $('#btnNewCateSave').bind('click' ,function(e){
        if($('#cateName').val()){
            $.ajax({
                url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/create',
                data: {name : $('#cateName').val()},
                method: 'post',
                success: function(data){
                    console.log(data);
                    var lines = $('#tbMain>tr').length;
                    createSongCateItem(data.Data ,0 ,lines).appendTo('#tbMain');
                    $('#dialog').modal('hide');
                },
                dataType: 'json'
            });
        }
    });

    //更新
    $('#btnEditCateSave').bind('click' , cateId ,function(e){
        if($('#cateEditName').val()){
            $.ajax({
                url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/update',
                data: {id: cateId,name: $('#cateEditName').val()},
                method: 'post',
                success: function(data){
                    //console.log(data);
                    //console.log(lineNum);
                    $('#tbMain>tr:nth-child('+ lineNum +')>td:nth-child(2)').text(data.Data.Name);
                    $('#dialogEdit').modal('hide');
                },
                dataType: 'json'
            });
        }
    });
});