### 前端

##### 1、DOCTYPE有什么作用？标准模式与混杂模式如何区分？它们有什么意义？
DOCTYPE告诉浏览器使用哪个版本的HTML规范来解析文档。
不声明DOCTYPE或者DOCTYPE格式不正确会导致HTML以混杂模式解析。
标准模式：以浏览器支持的最高标准运行。
混杂模式：使用向下兼容的方式来解析。
##### 2、行内元素有哪些？块元素有哪些？空元素有哪些？
行内元素：a b span img input textarea select
块元素：div ul li ol dl p h1-h6 table form
空元素：br hr link meta
##### 3、link和@import有什么区别？
link是xhtml标签，除了加载css外，还可以定义RSS等其他事务，@import属于css范畴，只能加载css；
link引用css是，页面载入时同时加载，@import需要在页面完全加载以后加载，而且@import被引用的css会等到引用它的css文件加载完才加载；
link是xhtml标签，无兼容问题，而@import是在css2.1提出来的，低版本的浏览器不支持；
link支持使用js去控制样式，@import不支持；
link方式的权重高于@import
