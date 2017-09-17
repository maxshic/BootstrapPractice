/**
 * Created by Administrator on 2017/9/17.
 */
$(function(e){
    var singerChart = echarts.init(document.getElementById('charts'));
    var arrCate = [];
    var arrNum = [];

    //
    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/SingerRegion/list',
        data: '',
        method: 'get',
        async: false,
        success: function(data){
            console.log(data);
            var objs = data.Data;
            for(var i = 0; i < objs.length; i++){
                arrCate.push(objs[i].Name);
            }
        },
        dataType: 'json'
    });

    var arrNum = new Array(arrCate.length);
    for(var i = 0; i < arrNum.length; i++){
        arrNum[i] = 0;
    }
    //
    //
    $.ajax({
        url: 'http://192.168.9.100/htmlprojectwebapi/singer/list',
        data: '',
        method: 'get',
        async: false,
        success: function(data){
            console.log(data);
            var objs = data.Data;
            for(var i = 0; i < objs.length; i++){
                for(var j = 0; j < arrCate.length; j++){
                    if(objs[i].RegionName == arrCate[j]){
                        arrNum[j]++;
                    }
                }
            }
        },
        dataType: 'json'
    });

    console.log(arrNum);

    console.log(arrCate);

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '歌手类别统计'
        },
        tooltip: {},
        legend: {
            data:['数量']
        },
        xAxis: {
            data: arrCate//["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '数量',
            type: 'bar',
            data: arrNum//[5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    singerChart.setOption(option);
});