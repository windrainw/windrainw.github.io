/**
 * ajax请求验证方法
 * 1.默认用POST方
 * 2.服务端返回json数据包括{'status':''},其他的数据可以扩展
 * @param {object} args 参数为对象形式
 *  如{'name':'zhangsan', 'age':'10', 'url':'http://www.example.com', 'http_method':'POST', 'success':function, 'failure':function, ‘success_return’:false}
 *  表示:传递了两个参数，适用post方法，失败和成功后都调用相应的函数
 * @returns 根据参数success_return来订
 */
function ajaxRequest(args){
    var http_method = 'POST';
    if(args['http_method'] != 'undifined'){
        http_method = 'POST';
    }
    var action = '';
    if(args['action'] != 'undifined'){
        action = args['action'];
    }

    var success_return = false;
    if(args['success_return'] != 'undifined'){
        success_return = args['success_return'];
    }

    var loading = null;
    if(args['loading'] != 'undifined'){
        loading = args['loading'];
    }
    var data = {};
    var reservedArgs = Array('action', 'http_method', 'success', 'failure', 'loading');
    for(var property in args){
        if (reservedArgs.indexOf(property) >= 0) { continue; }
        data[property] = args[property];
    }
    $.ajax({
        "type": http_method,
        "url": action,
        "data" : data,
        "dataType" : "json"
    }).done(function(data) {
        if(loading){
            $(loading).hideLoading();
        }
        console.log(data);
        if (data.status == 'success') {
            args['success'](data);
            return success_return;
        } else {
            args['failure'](data);
        }
    });
    return false;
}

function parseUrl(url){
    var i=url.indexOf('?');
    if(i==-1)return;
    var querystr=url.substr(i+1);
    var arr1=querystr.split('&');
    var arr2=new Object();
    arr2['uri'] = url.substr(0, i);
    for (i in arr1){
        var ta=arr1[i].split('=');
        arr2[ta[0]]=ta[1];
    }
    return arr2;
}

/**
 *在代码块儿头部展示代码块的语言
 */
function showCodeBlockLanguage(){
    var highlights = $('.highlights');
    for(var item in highlights){
        var lang = $(item).children('code')[0].attr('date-lang');
        console.log(lang);
        break; 
    }
}

$(document).ready(function(){
    showCodeBlockLanguage();
});
