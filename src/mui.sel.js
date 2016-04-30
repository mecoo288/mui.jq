(function($, window){
    /**
     * Author：k
     * Email: mecoo@vip.qq.com
     * Date: 2016-4-29
     * Version: 1.0
     * dom 选择器
     */
    var sibling,
        siblings,
        dir,
        slice;
    slice = [].slice;
    sibling = function( cur, dir ) {
        do {
            cur = cur[ dir ];
        } while ( cur && cur.nodeType !== 1 );

        return cur;
    }
    siblings = function( n, elem ) {
        var matched = [];
        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                matched.push( n );
            }
        }

        return matched;
    };
    dir = function( elem, dir, until ) {
        var matched = [],
            truncate = until !== undefined;

        while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                if ( truncate && jQuery( elem ).is( until ) ) {
                    break;
                }
                matched.push( elem );
            }
        }
        return matched;
    };
    $.each({
        eq: function(n){
            return $(this[n]);
        },
        siblings:function(elem){
            return siblings((this[0].parentNode||{}).firstChild , elem);
        },
        parent: function(elem){
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? $(parent) : null;
        },
        children:function(selector){
            return siblings(this[0].firstChild, selector);
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function(){

        },
        prevAll: function(){

        }
    }, function(name, fn){
        $.fn[ name ] = function(selector){
            var ret = fn.call(this, this[0]);
                ret = $.filter(ret, selector);
            return $.extend($([]), ret, {selector: selector});
        }
    });

    $.extend($.fn, {
        size: function(){
            return this.length;
        },
        get: function( num ) {
        return num != null ?

            // Return just the one element from the set
            ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

            // Return all the elements in a clean array
            slice.call( this );
        },
        filter: function(selector){

        }
    })
})(mui, window);
(function($, window){
    /**
     * Author：k
     * Email: mecoo@vip.qq.com
     * Date: 2016-4-29
     * Version: 1.0
     * dom 属性修改操作
     */
    var operatClass,
        operatDom,
        operatAttr;
    operatClass = function(classlist, operatType){
        var self = this,
            noNum = 0;
        classlist = classlist.split(/\s+/g);
        $.each(classlist, function(key, _class){
            $.each(self, function(key, doms){
                if(operatType !== "has"){
                    self[key].classList[operatType](_class);
                }else{
                    !self[key].classList.contains(_class) && noNum++;
                }
            });
        });
        return operatType === "has" ? noNum === 0 : self;
    };
    operatDom = function(val, operatType){
        if(!val && this[0]){
            return this[0][operatType];
        }
        $.each(this, function(key, obj){
            obj[operatType] = val;
        });
        return this;
    };
    operatAttr = function(data){
        var self = this;
        if(!!data && $.type(data) === "string" && this[0]){
            return this[0].getAttribute(data);
        }
        $.each(this, function(key, obj){
            $.each(data, function(key, val){
                if($.type(data) === "object"){
                    obj.setAttribute(key, val);
                }else{
                    obj.removeAttribute(val);
                }
            });
        });
        return this;
    };
    $.extend($.fn,{
        addClass: function(key){
            return operatClass.apply(this, [key, "add"]);
        },
        removeClass: function(key){
            return operatClass.apply(this, [key, "remove"]);
        },
        hasClass: function(key){
            return operatClass.apply(this, [key, "has"]);
        },
        html: function(html){
            return operatDom.apply( this, [html, "innerHTML"]);
        },
        text: function(text){
            return operatDom.apply( this, [text, "innerText"]);
        },
        val: function(val){
            return operatDom.apply( this, [val, "value"]);
        },
        css: function(key, val){
            var obj = {};
            if(!key){
                return this;
            }
            if($.type(key) === "string"){
                if(!!val){
                    obj[key] = val;
                }else{
                    return this[0].style[key]
                }
            }
            if($.type(key) === "object"){
                obj = key;
            }

            $.each(this, function(ind, O){
                $.each(obj, function(k, v){
                    O.style[k] = v;
                })
            })
            return this
        },
        attr: function(key, val){
            var data = {};
            if($.type(key) === "string"){
                if(!val){
                    data = key;
                }else{
                    data[key] = val;
                }
            }else if($.type(key) === "object"){
                data = key;
            }else{
                return this;
            }
            return operatAttr.call( this, data);
        },
        removeAttr: function(key){
            if( !key || !($.type(key) === "array" || $.type(key) === "string")){
                return this;
            }
            return operatAttr.call( this, $.type(key) === "array" ? key : key.split(/\s+/g));
        }
    });
})(mui, window);
(function($, window){
    $.extend({
        noop: function(){},
        filter: function(elements, selector){
            var idRE = /^#([\w-]+)$/;
            var classRE = /^\.([\w-]+)$/;
            var tagRE = /^[\w-]+$/;
            var ret = [];
            selector ?  $.each(elements, function(k, elem){
                $.each(selector.split(/\s*,\s*/), function(k, sel){
                    if(idRE.test(sel)){
                        $(elem).attr("id") === [].slice.call(sel, 1).join("") ? ret.push(elem):null
                    }
                    if(classRE.test(sel)){
                        $(elem).hasClass([].slice.call(sel, 1).join(""))? ret.push(elem):null
                    }
                    if(tagRE.test(sel)){
                        $(elem)[0].tagName.toLowerCase() === sel ? ret.push(elem):null;
                    }
                }) 
            }) : ret = elements;
            return $.unique(ret);
        },
        unique: function(elements){
            var ret = [];
            $.each(elements,function(k, elem){
                ret.indexOf(elem) === -1 ? ret.push(elem) : null
            });
            return ret;
        }
        
    })
})(mui, window);
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

(function($, window){
    $("body").on("tap","[data-url-open]", function(){
        window.location = $(this).attr("href")
    });
})(mui, window)