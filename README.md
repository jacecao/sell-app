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
