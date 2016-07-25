(function($, window){
    /**
     * Author：k
     * Email: mecoo@vip.qq.com
     * Date: 2016-7-22
     * Version: 1.0
     * 功能业务模块
     */
    /*
    
        {
            object: $("img")
            success: function(obj){} // 单个获取成功
            complete: function(res){} // 请求完成
            error: function(obj){} //  单个获取失败
        }
    */
    var toarr = function(arr){
        var _arr = $.type(arr) == "string" ? $(arr) :  arr,
            res = [],
            img;
        img = function(val){
            var type = val.tagName.toLowerCase();
            if(type == "img"){
                return val
            }
            val = $(val).css("backgroundImage");
            if(!!val){
                val = val.split("\"")[1];
                var img = document.createElement("img");
                    img.src = val;
                return img
            }
            return null;
        };
        $.each(_arr, function(ind, val){
            if(img(val)){
                res.push(img(val))
            }
        });
        return res;
    }
    $.extend({
        kfetch: function(options){
            var opts = $.extend({
                object: [],
                success: $.noop,
                error: $.noop,
                complete: $.noop
            }, options);
            if(!opts.object){return}
            arr = toarr(opts.object);
            var imgNum = arr.length,
                over = false,
                finishList = [],
                failList = [],
                intV = setInterval(function(){
                    if(finishList.length + failList.length == imgNum){
                        clearInterval(intV);
                        opts.complete({
                            status: failList.length === 0,
                            failList: failList
                        })
                    }
                },40);
            $.each(arr, function(ind, obj){
                obj.onload = function(){
                    finishList.push(obj);
                    opts.success(obj);
                };
                obj.onerror = function(){
                    failList.push(obj);
                    opts.error(obj);
                };
            });
        }
    });
    $.extend($.fn, {
        kfetch: function(opts){
            $.kfetch.call(this, $.extend(opts, {object: this}))
        }
    })
})(mui, window);
