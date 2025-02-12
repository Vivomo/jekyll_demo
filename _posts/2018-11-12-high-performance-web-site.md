---
layout: blog
title: 高性能网站建设指南总结
description: 总结一下 高性能网站建设指南 这本书的主要知识点
keywords: 高性能网站 网站性能优化
tags: text
---

### 1.减少HTTP请求
* 图片地图

```html
<!-- example -->
<img src="http://a.a.jpg" alt="" usemap="#map1">
<map name="map1">
    <area shape="rect" coords="0, 0, 20, 20" href="http://google.com" title="google">
    <area shape="rect" coords="20, 20, 40, 40" href="http://google.com" title="google1">
</map>
```
* CSS Sprite
* 内联图片 `data:[<mediatype>][;base64],<data>`
* 合并脚本和样式表

### 2.使用内容发布网络 CDN (Content Delivery Network)

### 3.添加Expires头
```text
web服务器使用Expires可以让web客户端使用当前组件(图片/脚本/样式表...)的一个副本,直到指定时间
Expires: Mon, 12 Apr 2030 12:00:00 GMT
但这个消息头需要服务端和客户端时间同步
Cache-Control头可以克服这个限制 max-age 单位是秒
Cache-Control: max-age=8640000

Apache mod_expires模块可以使Expires的设置方式如Cache-Control一样
```
### 4.压缩组件
`Accept-Encoding: gzip, deflate`

### 5.样式表放头部
### 6.将脚本放在底部

### 7.避免CSS的表达式
```css
/* expression IE支持, 其他浏览器会忽略 */ 
body {
    background-color: expression((new Date()).getHours() % 2 ? 'red' : 'black');
}
```
避开该问题可以用 `一次性表达式` 或 `事件处理器`

##### 一次性表达式
```css
p {
    background-color: expression(altBgcolor(this));
}
```
```js
function altBgcolor(elem) {
    elem.style.backgroundColor = (new Date).getHours() % 2 ? 'red' : 'black';
}
```

### 8.使用外部的JS和CSS
为了可以缓存

### 9.减少DNS查找
通过keep-alive 和 较少的域名来减少DNS查找

### 10.精简JS
通过对JS亚索混淆来减少JS的体积

### 11.避免重定向
重定向的状态码3XX

### 12.删除重复脚本
这是一个团队协作问题, 现在用package.json 管理可以避免这个问题

### 13.配置ETag

ETag是确认缓存组件有效性的一种机制

### 14.使Ajax可缓存