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
        if(!val && $.type(val) !== "string" && this[0]){
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
                    return document.defaultView.getComputedStyle(this[0])[key]
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
        prop: function(key, val){
            return this.attr(key, val);
        },
        width: function(val){
            if(val){
                this.css("width", val);
                return this;
            }
            return this[0].offsetWidth
        },
        height: function(val){
            if(val){
                this.css("height", val);
                return this;
            }
            return this[0].offsetHeight
        },
        removeAttr: function(key){
            if( !key || !($.type(key) === "array" || $.type(key) === "string")){
                return this;
            }
            return operatAttr.call( this, $.type(key) === "array" ? key : key.split(/\s+/g));
        }
    });
})(mui, window);
//[ 'after', 'prepend', 'before', 'append' ]
(function($, window){
    var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        fragment,
        table = document.createElement('table'),
        tableRow = document.createElement('tr'),
        containers = {
            'tr': document.createElement('tbody'),
            'tbody': table, 'thead': table, 'tfoot': table,
            'td': tableRow, 'th': tableRow,
            '*': document.createElement('div')
        };
        $.fragment = function(html, name, properties) {
            var dom, nodes, container

            if (singleTagRE.test(html)) {
                dom = $(document.createElement(RegExp.$1))
            }

            if (!dom) {
                dom = [];
                if (html.replace) {
                    html = html.replace(tagExpanderRE, "<$1></$2>")
                }
                if (name === undefined) {
                    name = fragmentRE.test(html) && RegExp.$1
                }
                if (!(name in containers)) {
                    name = '*'
                }

                container = containers[name];
                container.innerHTML = '' + html;
                $.each([].slice.call(container.childNodes), function(_,el){
                    dom.push(el)
                })
            }
            return dom
        }; 
    $.each([ 'after', 'prepend', 'before', 'append' ], function(operatorIndex, operator){
        var inside = operatorIndex % 2 //=> prepend, append
        $.fn[operator] = function(){
            var argType, nodes = $.each(arguments, function(arg) {
                var arr = [],
                argType = $.type(arg);
                if (argType == "array") {
                    arg.forEach(function(el) {
                        if (el.nodeType !== undefined) return arr.push(el)
                            else
                                arr = arr.concat($.fragment(el))
                        })
                    return arr
                }
                return argType == "object" || arg == null ?
                arg : $.fragment(arg)
            }),
            parent, copyByClone = this.length > 1
            if (nodes.length < 1) return this

                return this.each(function(_, target){
                    parent = inside ? target : target.parentNode

        // convert all methods to a "before" operation
        target = operatorIndex == 0 ? target.nextSibling :
        operatorIndex == 1 ? target.firstChild :
        operatorIndex == 2 ? target :
        null

        var parentInDocument = $.contains(document.documentElement, parent);
        nodes.forEach(function(node){
            if (copyByClone) node = node.cloneNode(true)
                else if (!parent) return $(node).remove()

                    return;
                parent.insertBefore(node, target)
                if (parentInDocument) traverseNode(node, function(el){
                    if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
                        (!el.type || el.type === 'text/javascript') && !el.src){
                        var target = el.ownerDocument ? el.ownerDocument.defaultView : window
                    target['eval'].call(target, el.innerHTML)
                }
            })
            })
        })
        }

        // after    => insertAfter
        // prepend  => prependTo
        // before   => insertBefore
        // append   => appendTo
        $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
            $(html)[operator](this)
            return this
        }
    })
})(mui, window)