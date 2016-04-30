(function($, window){
    /**
     * Author：k
     * Email: mecoo@vip.qq.com
     * Date: 2016-4-29
     * Version: 1.0
     * 功能业务模块
     */
    $.extend({
        ktoast: function(str, callback){ // 提示框
            var msg,
                _align = "middle" 
                align = _align,
                timeOut = 0;
            callback = callback || function(){};
            if($.isObject(str)){
                msg = str.msg;
                align = str.align;
                timeOut = str.timeOut;
            }else{
                msg = str;
            }
            timeOut = !!timeOut ? timeOut : 2000;
            align =  ["top", "middle", "bottom"].indexOf(align) < 0 ? _align : align;
            var toast = document.createElement('div');
            toast.classList.add('mui-toast-container');
            toast.classList.add(align);
            toast.innerHTML = '<div class="mui-toast-message">' + msg + '</div>';
            document.body.appendChild(toast);
            setTimeout(function() {
                document.body.removeChild(toast);
                callback();
            }, timeOut);
        },
        loadPop: function(){
            var pop;
            return{
                create: function(callback){
                    callback = callback||$.noop;
                    if(pop){
                        document.body.removeChild(pop); 
                        return;
                    }
                    pop = document.createElement("div");
                    pop.classList.add('kim-loading-pop');
                    pop.innerHTML = '<div class="kim-loading-message"><span class="kim-loading-spinner"></span></div>';
                    document.body.appendChild(pop);
                    callback();
                },
                remove:function(callback){
                    callback = callback||$.noop;
                    if(!pop){return;}
                    setTimeout(function(){
                        document.body.removeChild(pop);
                        pop = null;
                        callback();
                    }, 1000);
                }
            };
        },
        kajax: function(parmas){
            parmas = $.extend({success:$.noop,error:$.noop}, parmas);
            var pop = $.loadPop();
            pop.create();
            $.ajax(parmas.url, {
                data: parmas.data,
                dataType:'json',
                type:'post',
                timeout:10000,
                success: function(){
                    pop.remove();
                    parmas.success.apply([], arguments)
                },
                error: function(){
                    pop.remove();
                    parmas.error.apply([], arguments)
                }
            })
        }
    })
})(mui, window);