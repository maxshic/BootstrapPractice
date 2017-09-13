/**
 * Created by Administrator on 2017/9/13.
 */
$(function(e){
    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/SingerRegion/list',
        data: '',
        method: 'get',
        success: function(data){
            console.log(data);
            var objs = data.Data;
            for(var i = 0; i < objs.length; i++){
                var $opt = $('<option></option>');
                $opt.text(objs[i].Name);
                $opt.attr({'value':objs[i].Id});
                $opt.appendTo('#singerCategory');
            }
        },
        dataType: 'json'
    });

    //fileReader
    $('#singerHeader')[0].onchange = function(e){
        var reader = new FileReader();
        reader.onload = function(e){
            $('#singerHeaderImg').prop('src' ,this.result);
        };
        reader.readAsDataURL($('#singerHeader')[0].files[0]);
    };

    //ÉÏ´«
    $('#btnUpload').bind('click' ,function(e){
        var singerHeader = $('#singerHeader')[0].files[0];
        var singerName = $('#singerName').val();
        var singerSex = $('input[name=singerSex]:checked').val();
        var singerBirth = $('#singerBirth').val();
        var singerHeight = $('#singerHeight').val();
        var singerStar = $('#singerStar').val();
        var singerCategory = $('#singerCategory').val();
        var singerRemark = $('#singerRemark').val();

        var formData = new FormData();
        formData.append('name', singerName);
        formData.append('sex', singerSex);
        formData.append('birthday', singerBirth);
        formData.append('height', singerHeight);
        formData.append('star', singerStar);
        formData.append('regionId', singerCategory);
        formData.append('remark', singerRemark);
        formData.append('header', singerHeader);

        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/singer/create',
            data: formData,
            method: 'post',
            contentType: false,
            processData: false,
            cache: false,
            success: function(data){
                //console.log(data);
                if(data.Code == 100){
                    location.href = 'singerInfo.html';
                }
            }
        });

    });
});