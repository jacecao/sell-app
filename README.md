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

* #### 如何强制浏览器更新视图

在小球下落的动画中我们使用clientHeight来强制浏览器对页面的渲染，那么究竟是为什么呢？

例如我想一个图片hover的时候即刻变小，然后过渡放大到原来大小
```javascript
div.onmouseover = function(){
    div.className = 'small';
    div.className = 'transition'
}
```
但浏览器会将上面两个操作合并了成div.className = 'transition'，而没有分别渲染两个效果，

代码只需要改成这样就行了：
```javascript
div.onmouseover = function(){
    div.className = 'small';
    setTimeout(function(){
        div.className = 'transition';
    }, 5000);
}
```
setTimeout这个异步函数将会给主进程空闲出5秒的时间用于网页渲染，这样你就能看到两个效果了。

浏览器很聪明，会对Paint进行优化，如果允许，会在代码栈退出后再进行刷新绘制。为什么setTimeout里面的class赋值会生效，原因就是setTimeout里面的函数放在了另外的代码栈，由事件去异步调用。

但是，我们也可以强制浏览器在同一个代码栈中进行重新绘制。这里就是上面说的“如果允许”的例外情况，看一下代码：
```javascript
div.onmouseover = function () {
    div.className = 'small';
    console.log(div.clientHeight); // 这句话强制浏览器进行重新绘制
    div.className = 'transition';
}
```
上面的代码console语句让浏览器知道，“他要获得div的布局或者样式信息了，我必须先把之前的样式设定刷新一下，才能给你正确的值”，于是浏览器就重新绘制了。后面等函数结束后，又一次重新绘制transition的效果。如果这里你还是没有肉眼看出变化，这个真的就是“太快了，你看不到”。

[原文在这里](https://segmentfault.com/q/1010000006771100)

* #### 在购物添加按钮组件中数据合理运用的重要性

在shoppingCtl组件中，如果按照下面来定义组件，将会出现意外情况
```javascript
<template>
  <div class="food-button">
    <transition name="move">
      <button type="button" class="buttons" v-show="isActive" @click="clickRemove"><i class="icon-remove_circle_outline"></i></button>
    </transition>
    <transition name="fade">
      <span class="count" v-show="isActive">{{food.count}}</span>
    </transition>
    <button type="button" class="buttons" @click="clickAdd"><i class="icon-add_circle"></i></button>
  </div>
</template>

<script>
// 这里需要注意的地方，如果这里自定义一个属性用来控制按钮是否显示，那么将会找出不堪的后果
// 不妨试一试会发生什么情况
export default {
  name: 'shoppingCtl',
  props: {
    food: {
      type: Object,
      default () {
        return {
          count: 1
        }
      }
    }
  },
  data () {
    return {isActive: false}
  },
  methods: {
    // 点击添加按钮
    clickAdd (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
        this.isActive = true;
      } else {
        this.food.count ++;
      }
    },
    // 添加移除按钮
    clickRemove () {
      if (this.food.count && this.food.count > 0) {
        this.food.count --;
        if (this.food.count == 0) {
          this.isActive = false;
        }
      }
    }
  }
};
</script>
```
由于这个组件需要在不同的组件中复用，且有些复用之间有数据关联(有些组件中会引用同一food数据)，如果在有数据关联的组件中你会发现这个组件在判断是否显示按钮（isActive）中就会出现问题。

**所以在需要复用的组件中最好使用传递数据来控制元素的一切动作，而不要使用内部数据来控制，这样能避免对数据联动性的破坏**，所以上面的例子改成下面这样就更简洁优雅。
```javascript
<template>
  <div class="food-button">
    <transition name="move">
      <button type="button" class="buttons" v-show="food.count" @click="clickRemove"><i class="icon-remove_circle_outline"></i></button>
    </transition>
    <transition name="fade">
      <span class="count" v-show="food.count">{{food.count}}</span>
    </transition>
    <button type="button" class="buttons" @click="clickAdd"><i class="icon-add_circle"></i></button>
  </div>
</template>

<script>
// 这里需要注意的地方，如果这里自定义一个属性用来控制按钮是否显示，那么将会找出不堪的后果
// 不妨试一试会发生什么情况
export default {
  name: 'shoppingCtl',
  props: {
    food: {
      type: Object,
      default () {
        return {
          count: 1
        }
      }
    }
  },
  methods: {
    // 点击添加按钮
    clickAdd (event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count ++;
      }
    },
    // 添加移除按钮
    clickRemove () {
      if (this.food.count && this.food.count > 0) {
        this.food.count --;
      }
    }
  }
};
</script>
```
你看这样就更符合数据驱动的思想，且在复用时能更好的体现数据联动性。

* #### bug

1. 问题表现：需要指定优惠信息显示宽度；头部信息布局需要重新调整，还是应该flex布局

