(function($, window){
    /**
     * Author：k
     * Email: mecoo@vip.qq.com
     * Date: 2016-4-29
     * Version: 1.0
     * 功能业务模块
     */
    $.extend({
        ktoast: function(option, cb){ // 提示框
            var opts = $.extend({
                msg : "",
                align: "middle",
                timeOut: 2000
            }, $.isObject(option) ? option : {msg: option}),
                css = ["top", "middle", "bottom"];

            cb = cb || $.noop;
            var toast = document.createElement('div');
            toast.classList.add('ktoast-container');
            toast.classList.add(css.indexOf(opts.align) + 1 ? opts.align : css[1]);
            toast.innerHTML = '<div class="ktoast-message">' + opts.msg + '</div>';
            document.body.appendChild(toast);
            setTimeout(function() {
                document.body.removeChild(toast);
                cb();
            }, opts.timeOut);
        },
        loadPop: function(){
            var pop;
            return{
                create: function(cb){
                    cb = cb||$.noop;
                    if(pop){
                        document.body.removeChild(pop); 
                        return;
                    }
                    pop = document.createElement("div");
                    pop.classList.add('kloading-pop');
                    pop.innerHTML = '<div class="kloading-message"><span class="kloading-spinner"></span></div>';
                    document.body.appendChild(pop);
                    cb();
                },
                remove:function(cb){
                    cb = cb||$.noop;
                    if(!pop){return;}
                    setTimeout(function(){
                        document.body.removeChild(pop);
                        pop = null;
                        cb();
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
                    var grgs = arguments;
                    pop.remove(function(){
                        parmas.success.apply([], grgs)
                    });
                },
                error: function(){
                    var grgs = arguments;
                    pop.remove(function(){
                        parmas.error.apply([], grgs)
                    });
                }
            })
        }
    })
})(mui, window);
