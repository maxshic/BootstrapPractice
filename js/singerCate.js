/**
 * Created by Administrator on 2017/9/13.
 */
$(function(e){
    var cateId = null;
    var count = 0;

    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/SingerRegion/list',
        method: 'get',
        success: function(data){
            console.log(data);
            var objs = data.Data;
            //$('#tbMain')[0].innerHTML = '';

            for(var i = 0; i < objs.length; i++){
                var $td = createSingerCate(objs[i] ,i);
                $td.appendTo($('#tbMain'));
            }
            $('#tbMain>tr:first').remove();
            //console.log($('#tbMain>tr').length);
        },
        dataType: 'json'
    });

    function createSingerCate(item ,i){
        var $temp = $('#tbMain>tr:first').clone();

        $temp.find('td:first').text(i + 1);
        $temp.find('td:nth-child(2)').text(item.Name);
        $temp.find('a').bind('click' ,function(e){
            //console.log(item.Id);

            count = $temp.index();
            cateId = item.Id;
            $('#cateEditName').val(item.Name);
            $('#dialogEdit').modal('show');
        });
        return $temp;
    };

    $('#btnEditCateSave').bind('click' , function(e){
        //console.log($('#cateEditName').val());
        //console.log(cateId);
        var self = this;
        if(cateId && $('#cateEditName').val()){
            $.ajax({
                url: 'http://192.168.9.100/htmlprojectwebapi/SingerRegion/update',
                data: {
                    id: cateId,
                    name: $('#cateEditName').val()
                },
                method: 'post',
                success: function(data){
                    console.log(data);
                    if(data.Code == 100){
                        $('#dialogEdit').modal('hide');
                        //location.reload();
                        //createSingerCate({Id:cateId,Name:$('#cateEditName').val()},$('#tbMain>tr').length + 1).appendTo('#tbMain');
                        console.log(count);
                        $('#tbMain>tr:nth-child('+(count+1)+')').find('td:nth-child(2)').text($('#cateEditName').val());
                    }
                },
                dateType: 'json'
            });
        }

    });

    $('#btnNewCateSave').bind('click' ,function(e){
        console.log($('#cateName').val());
        if($('#cateName').val()){
            $.ajax({
                url: 'http://192.168.9.100/htmlprojectwebapi/SingerRegion/create',
                data: {'name':$('#cateName').val()},
                method: 'post',
                success: function(data){
                    console.log(data);
                    if(data.Code == 100){
                        $('#dialog').modal('hide');
                        //location.reload();
                        createSingerCate({Id:data.Data.Id,Name:$('#cateName').val()},$('#tbMain>tr').length).appendTo('#tbMain');
                    }
                },
                dataType: 'json'
            });
        }
    });
});