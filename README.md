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

