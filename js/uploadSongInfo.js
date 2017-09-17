/**
 * Created by Administrator on 2017/9/16.
 */
$(function(e){

    //fileReader封面
    $('#songHeader')[0].onchange = function(e){
        var reader = new FileReader();
        reader.onload = function(e){
            $('#songHeaderImg').prop('src' ,this.result);
        };
        reader.readAsDataURL($('#songHeader')[0].files[0]);
    };

    $('#btnSongSource').click(function(e){
        $('#songSource').click();
    });

    //获取MP3文件和时长
    $('#songSource')[0].onchange = function(e){
        var self = this;

        if(self.files[0].type == 'audio/mp3' && self.files[0].size <= 2*1024*1024){
            var reader = new FileReader();
            $('#txtSongSource').val(self.value);
            reader.onload = function(e){
                console.log(e);
                $('#audio').prop('src' ,this.result);

                $('#audio').on('canplay' ,function(e){
                    $('#songDuration').val($('#audio')[0].duration.toFixed(0));
                });

            };
            reader.readAsDataURL($('#songSource')[0].files[0]);
        }else{
            console.log('error');
        }
    };

    loadCateList();

    //加载歌曲分类列表
    function loadCateList(){
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/SongCategory/list',
            data: '',
            method: '',
            success: function(data){
                var objs = data.Data;
                for(var i = 0; i < objs.length; i++){
                    var $opt = $('<option></option>');
                    $opt.text(objs[i].SongCategory.Name).attr({'value':objs[i].SongCategory.Id}).appendTo('#songCate');
                }
            },
            dataType: 'json'
        });
    };



    loadSingerList();

    //加载歌手列表项
    function loadSingerList(){
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/singer/list',
            data: '',
            method: 'get',
            success: function(data){
                console.log(data);
                var objs = data.Data;
                for(var i = 0; i < objs.length; i++){
                    var $opt = $('<option></option>');
                    $opt.text(objs[i].Name).attr({'value':objs[i].Id}).appendTo('#songSinger');
                }
            },
            dataType: 'json'
        });
    };

    //上传音乐
    $('#btnUpload').bind('click' ,function(e){
        var form = $('#form')[0];
        var formData = new FormData(form);
        console.log(formData);
        $.ajax({
            url: 'http://192.168.9.100/htmlprojectwebapi/song/create',
            data: formData,
            method: 'post',
            contentType:false,
            processData:false,
            cache:false,
            success: function(data){
                console.log(data);
                if(data.Code == 100){
                    location.href = 'songInfo.html';
                }
            }
        });
    });
});