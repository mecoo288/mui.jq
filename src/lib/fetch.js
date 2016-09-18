(function($, window){
    /**
     * Author：k
     * Email: mecoo@vip.qq.com
     * Date: 2016-8-3
     * Version: 1.0
    */
    /**
     * [o 对象转化为数组]
     * @param  {[string|array]} obj [对象为字符串、标签、数组]
     * @return {[array]}     [返回数组]
     */
    var o = function(obj){
            return $.isArray(obj)
                ? [].concat(obj)
                    : (
                        /^([#\.]\w+|\w+)$/.test(obj)
                            ? [].concat($(obj)) 
                                : [].concat(obj) 
                    );
        };
    var objects = function(data){
        var res = [];
        // 先转化为数组
        $.each(o(data.list), function(ind, obj){
            var _object = singleObject(obj, data);
            if(!$.isEmptyObject(_object)){
              res = res.concat(_object)  
            }
        });
        return !$.isEmptyObject(res) && res;
    };
    // 单个对象处理
    var singleObject = function(obj, data){
        var res = [];
        $.each([].concat(o(obj)), function(ind, _obj){
            var src = ($.type(_obj) == "string" && _obj)
                        || $(_obj).attr("data-kimage") 
                        || _obj.src 
                        || (_obj.style["backgroundImage"]||"").replace(/(url\(['"]?|['"]?\))/g, "") 
                        || null,
                _o = null,
                tempObj = null;
            if(!src){ return;}
            if($.type(_obj) == "string"){
                tempObj = new Image();
                tempObj.src = src;
            }
            _o = {
                object:  tempObj || _obj,
                type: $(_obj).attr("data-kimage") ? "kimg" : (
                            _obj.tagName.toLowerCase() === "img" ? "img" : (
                                (_obj.style["backgroundImage"]||"").replace(/(url\(['"]?|['"]?\))/g, "") ? "bg" : null
                            )
                        ),
                src: src
            };
            data.before.call(_o.object, _o);
            res.push(_o)
        });
        return !$.isEmptyObject(res) && res;
    };
    $.extend({
        kfetch: function(options){
            var opts = $.extend({
                object: [],
                before: $.noop,
                success: $.noop,
                error: $.noop,
                complete: $.noop
            }, options);

            list = objects({
                list: opts.object, 
                before: opts.before
            });

            if( list.length <1 ){return}

            var imgNum = list.length,
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

            $.each(list, function(ind, obj){
                var img = document.createElement("img");
                    img.src = obj.src;
                img.onload = function(){
                    finishList.push(obj);
                    opts.success.call(obj.object, obj);
                };
                img.onerror = function(){
                    failList.push(obj);
                    opts.error.call(obj.object, obj);
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
