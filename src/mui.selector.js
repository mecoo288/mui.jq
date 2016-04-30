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
        dir;
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
                ret = $(ret).filter(selector);
                ret = $.unique(ret);
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
            $.slice.call( this );
        },
        filter: function(selector){
            var 
                idRE = /^#([\w-]+)$/,
                classRE = /^\.([\w-]+)$/,
                tagRE = /^[\w-]+$/,
                deal = false,
                elements = this[0],
                ret = [];
            if($.type(selector) === "function"){
                $.type(elements) === "object" && (ret = {});
                $.each(this[0], function(key, val){
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
                $.each(this[0], function(k, elem){
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
            return this[0];
        }
    })
})(mui, window);