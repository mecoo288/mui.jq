mui.jq API 
==========

 该库产出文件为``` mui.jq.js``` (mui + 简化的jquery)

### DOM选择器 ###

- siblings
- parent
- children
- eq
- first
- last
- get
- next
- prev
- nextAll
- prevAll

### 属性操作方法 ###

- addClass
- removeClass
- hasClass
- html
- text
- val
- css
- attr
- removeAttr

### 其他 ###

- size
- filter
- submit

### 常用函数 ###

- noop
- filter
- unique
- timer

### mui扩展延伸 ###

- ktoast 
- loadPop
- kajax
- kfetch

### 实例及用法 ###

注：里面链式操作借鉴自jQuery，使用方法可以 参看[jquery API](http://jquery.cuishifeng.cn/)

#### timer用法及实例 ####

`mui.timer(times, endFunction, timeFunction)`

#### ktoast用法及实例 ####

注：由于原生的 toast方法及 ajax 方法过于简陋 所以考虑到交互体验做了优化

- 完整写法
`mui.ktoast({msg:"test", "timeOut":2000, align:"middle"}, function(){  });`
- 简化写法
`mui.ktoast("test")`
 
#### loadPop用法及实例 ####

`var pop = mui.loadPop();//pop对象
pop.create();//呼出pop
pop.remove();//移除pop`
 
#### kajax用法及实例 ####

增加了服务器请求的中间过渡，优化体验

`mui.kajax({
url:url,
data:data,
success:function(){},
error:function(){}
})`

#### kfetch用法及实例 ####

侦听图片加载状态
`mui.kfetch({
	object: mui("img"),
	success: function(res){},
	error: function(res){},
	complete: function(res){}
})`
或
`$("img").kfetch({
	before: function(res){},
	success: function(res){},
	error: function(res){},
	complete: function(status, faillist){}
})`