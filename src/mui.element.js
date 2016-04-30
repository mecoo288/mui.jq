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
                    operatType !== "has"?
                        self[key].classList[operatType](_class):
                        !self[key].classList.contains(_class) && noNum++;
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
                $.type(data) === "object" ? 
                    obj.setAttribute(key, val) :
                    obj.removeAttribute(val);
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