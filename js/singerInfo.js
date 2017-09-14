/**
 * Created by Administrator on 2017/9/13.
 */
$(function(e){

    //$('[data-toggle="popover"]').popover();
    //$('#tbMain>tr:first').remove();

    var objs = [];
    var pageSize = 5;

    $('#btnAddSinger').bind('click' ,function(e){
        location.href = 'uploadSingerInfo.html';
    });

    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/singer/list',
        data: '',
        method: 'get',
        success: function(data){
            objs = data.Data;
            //console.log(data);


            drawSingerInfo(0,pageSize);

            createPageIndex();
        },
        dataType: 'json'
    });

    function drawSingerInfo(startIndex ,endIndex){
        //$('#tbMain')[0].innerHTML = '';
        $('#tbMain>tr:not(:first)').remove();
        for(var i = startIndex; i < endIndex; i++){
            var tr = createSingerInfoItem(objs[i] ,i);
            tr.appendTo('#tbMain');
        }
        $('#tbMain>tr:first').remove();
        $('[data-toggle="popover"]').popover();
    };

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

    //´´½¨Ò³Âë
    function createPageIndex(){
        var pageIndex = Math.ceil(objs.length/pageSize);
        $('#tFooter>span:last').text(pageIndex);
        for(var i = 1; i <= pageIndex; i++){
            var $li = $('<li><a href="#"></a></li>');
            $li.find('a').text(i);
            $li.appendTo('.pagination');
            $li.bind('click' ,function(e){
                e.preventDefault();
                e.stopPropagation();
                $('#tFooter>span:first').text(e.target.innerText);
                var self = e.target;
                var startIndex = (self.innerText - 1) * pageSize;
                var endIndex = (self.innerText * pageSize) < objs.length ? self.innerText * pageSize : objs.length;
                //console.log(e.target.innerText);
                drawSingerInfo(startIndex ,endIndex);
            });
        }

    };

});