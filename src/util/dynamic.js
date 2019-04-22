/*
* @Author: MengZhang
* @Date:   2019-04-18 23:55:25
* @Last Modified by:   MengZhang
* @Last Modified time: 2019-04-20 22:49:19
*/

var Hogan = require('hogan.js');
var conf  = {
    serverHost : ''
};

var _de   = {
    //网络处理
    request : function(param){
        var _this = this;

        $.ajax({
            type        : param.method || 'get',
            url         : param.url    || '',
            dataType    : param.type   || 'json',
            data        : param.data   || '',
            success     : function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.sucess === 'function' && param.sucess(res.data, res.msg);

                }
                //没有登陆状态，需要强制登陆
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);

                }

            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.status);

            }

        });

    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        //e.g. happymmal.com/product/list?keyword=xxx&page=1
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模版 
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate), 
            result   = template.render(data);

        return result;
    },

    //统一登录处理
    doLogin : function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
        //用encode防止url中特殊字符造成截断
    }

};

module.exports = _de;