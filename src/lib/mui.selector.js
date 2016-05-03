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
    dir = function( elem, dir ) {
        var matched = [];
        if(!elem){
            return matched;
        };
        while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                matched.push( elem );
            }
        }
        return matched;
    };
    $.each({
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
        nextAll: function( elem ){
            return dir( elem, "nextSibling" );
        },
        prevAll: function( elem ){
            return dir( elem, "previousSibling" );
        }
    }, function(name, fn){
        $.fn[ name ] = function(until, selector){
            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }
            var ret = fn.call(this, this[0]);
                $.type(ret) === "array" ? 
                    ((ret = $(ret).filter(selector)) && (ret = $.unique(ret))) : ret = $( ret );
            return ret.length > 0 ? $.extend($(""), ret, {selector: selector}) : $("");
        }
    });

    $.extend($.fn, {
        size: function(){
            return this.length;
        },
        eq: function(n){
            return $(this[n]);
        },
        get: function( num ) {
            return num != null ?

                // Return just the one element from the set
                ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

                // Return all the elements in a clean array
                $.slice.call( this );
        },
        filter: function(selector){
            return $.filter(this[0], selector)
        }
    })
})(mui, window);