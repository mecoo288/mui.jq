(function($, window){
    $.extend({
        noop: function(){},
        filter: function(elements, selector){
            var 
                idRE = /^#([\w-]+)$/,
                classRE = /^\.([\w-]+)$/,
                tagRE = /^[\w-]+$/,
                deal = false,
                ret = [];
            if($.type(selector) === "function"){
                $.type(elements) === "object" && (ret = {});
                $.each(elements, function(key, val){
                    var r = selector(key, val);
                    $.type(r) === "boolean" && (r && (r = val));
                    $.type(r) === "number" ? 
                        ($.type(key) === "number" ? ret.push(r) : ret[key] = r)
                        :
                        (r && ( $.type(key) === "number" ? ret.push(r):ret[key] = val))
                });
                return ret;
            }
            if( $.type(selector) === "string"){
                $.each(elements, function(k, elem){
                    $.each(selector.split(/\s*,\s*/), function(k, sel){
                        if(idRE.test(sel)){
                            $(elem).attr("id") === $.slice.call(sel, 1).join("") ? ret.push(elem):null
                        }
                        if(classRE.test(sel)){
                            $(elem).hasClass($.slice.call(sel, 1).join(""))? ret.push(elem):null
                        }
                        if(tagRE.test(sel)){
                            $(elem)[0].tagName.toLowerCase() === sel ? ret.push(elem):null;
                        }
                    }) 
                });
                return ret;
            }
            return elements;
        },
        unique: function(elements){
            var ret = [];
            $.each(elements,function(k, elem){
                ret.indexOf(elem) === -1 ? ret.push(elem) : null
            });
            return ret;
        },
        timer:function(N,endFn, timeFn){
            endFn = endFn || $.noop();
            timeFn = timeFn || $.noop();
            (function(N){
                var args = arguments;
                if(N === 0){
                    endFn();
                    return;
                }
                    timeFn(N)
                setTimeout(function(){
                    args.callee(--N);
                }, 1000);
            })(N);
        }
        
    })
})(mui, window);
(function($, window){
    $.extend($.fn, {
        submit: function(){
            if(this.size()<1){
                return;
            }
            this[0].tagName.toLowerCase() === "form" && this[0].submit();
        }
    })
})(mui, window);
(function($, window){
    $("body").on("tap", "[data-url-open]", function(e){
        e.stopPropagation();
        var link = $(this).attr("href");
        if(!!link){
            window.location.href = link;
        }
    });
})(mui, window);