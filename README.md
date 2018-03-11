# vue demo

> sell application

* #### css识别物理像素比
```css
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
  ...css-code...
}

@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
  ...css-code...
}
```

* #### 如何更好的将图标打包到组件
在该组件下需要使用的图标保存到该组件下，然后通过相对路径来引用图标，这样最后将图标转译成base64格式，优化后期数据请求。

* #### 在sublime如何创建vue一个文档模板
在`tools`->`developer`->`new snippet`
```
<snippet>
  <content><![CDATA[
<template>

</template>

<script>
export default {}
</script>

<style>

</style>
]]></content>
  <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
  <tabTrigger>vue</tabTrigger>
  <!-- Optional: Set a scope to limit where the snippet will trigger -->
  <scope>text.html.vue</scope>
</snippet>

```
将上面文件以这样的名字`name.sublime-snippet`保存在默认目录下，这样设置后，在新建的vue文件中，输入`vue`然后按`tab`键将自动生成vue文件结构。


* #### ref\ $refs \$set \$emit

Vue中父组件和子组件的通信，都离不开上面几个方法，子组件需要外传信息给父组件时，就可以使用$set和$emit两个方法来实现

其中$set,是作用于父组件给子组件的数据，子组件通过$set方法更改父组件信息，并触发视图更新。

而$emit则是通过触发子组件约定时间来传递信息，子组件告诉父组件需要监听的事件名（暗号）,然后子组件在内部触发该事件，并传递一组信息出去，父组件监听后获取该信息
```
子组件内部： this.$emit('eventname', data);
父组件：@:eventname="callback"

```
而ref和$refs,则是父组件最常用的获取子组件对象的最佳方法，父组件需要主动触发子组件某个方法则必须使用ref和$refs


* ####bug

1. 问题表现：需要指定优惠信息显示宽度；头部信息布局需要重新调整，还是应该flex布局

