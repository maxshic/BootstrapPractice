/**
 * Created by Administrator on 2017/9/13.
 */
$(function(e){

    //$('[data-toggle="popover"]').popover();

    $('#btnAddSinger').bind('click' ,function(e){
        location.href = 'uploadSingerInfo.html';
    });

    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/singer/list',
        data: '',
        method: 'get',
        success: function(data){
            console.log(data);
            var objs = data.Data;
            for(var i = 0;i < objs.length; i++){
                var tr = createSingerInfoItem(objs[i] ,i);
                tr.appendTo('#tbMain');
            }

            $('[data-toggle="popover"]').popover();
        },
        dataType: 'json'
    });

    function createSingerInfoItem(item ,i){
        var $temp = $('#tbMain>tr:first').clone();

        $temp.find('td:first').text(i + 1);
        $temp.find('img').prop('src', item.Header);
        $temp.find(':nth-child(3)').text(item.Name);
        $temp.find(':nth-child(4)').text(item.Sex);
        $temp.find(':nth-child(5)').text(item.Birthday);
        $temp.find(':nth-child(6)').text(item.Height);
        $temp.find(':nth-child(7)').text(item.Star);
        $temp.find(':nth-child(8)').text(item.RegionName);
        $temp.find('button').attr({
            'title':item.Name,
            'data-content':item.Remark
        });

        return $temp;
    };



});