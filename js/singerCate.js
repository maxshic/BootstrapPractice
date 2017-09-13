/**
 * Created by Administrator on 2017/9/13.
 */
$(function(e){
    var cateId = null;

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
        },
        dataType: 'json'
    });

    function createSingerCate(item ,i){
        var $temp = $('#tbMain>tr:first').clone();

        $temp.find('td:first').text(i + 1);
        $temp.find('td:nth-child(2)').text(item.Name);
        $temp.find('a').bind('click' ,function(e){
            //console.log(item.Id);
            cateId = item.Id;
            $('#cateEditName').val(item.Name);
            $('#dialogEdit').modal('show');
        });
        return $temp;
    };

    $('#btnEditCateSave').bind('click' , function(e){
        //console.log($('#cateEditName').val());
        //console.log(cateId);
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
                        location.reload();
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
                        location.reload();
                    }
                },
                dataType: 'json'
            });
        }
    });
});