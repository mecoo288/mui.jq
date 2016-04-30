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