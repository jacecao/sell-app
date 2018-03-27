# vue demo

> sell application

##
**如何运行该应用**

1. 拷贝本项目

git clone git@github.com:jacecao/sell-app.git
或直接下载该项目

2. 安装运行环境

在命令端进入到该项目文件夹内，运行`npm install`, 待开发依赖安装完毕后，使用`npm run dev`进入开发环境进行开发，在浏览器中打开[本地服务器的8080端口](localhost:8080/),使用模拟移动端环境查看。

3. 执行生产打包

`npm run build` 自动完成所有组件的打包工作



##


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

**但是需要注意的是ref绑定组件和原生标签的作用是不同的，在ref绑定到组件是，返回的是vue对象，而ref绑定到原生标签时返回的是DOM对象，这一点需要注意**

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
// 这里需要注意的地方，如果这里自定义一个属性用来控制按钮是否显示，那么将会出现不堪的后果
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

* #### 在不知道屏幕宽度的情况下，如何保证图片以等宽的正方形显示呢？

为了适应匹配更多的屏幕的宽度，我们需要写一个能自适应的正方形图形，我们需要怎么做呢？下面的这段代码就能很好的解决
html结构应该这样：
```html
<div class="img-box">
  <img scr="">
</div>
```
css这样
```css
.img-box {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  /* padding-top 设置为100%就会依据元素的宽度来设定 这也是很重要的一点*/
}
.img-box img {
  postion: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
```

* #### 如何更好的实现评论分类查看

首先依然要保持数据与视图最佳的联动性，这也是VUE的最大优势和特点，但如何更好的将数据运用到视图中这就非常关键了，如在实现分类查看评论这个功能中，稍不注意就会将数据变得被动。下面是初期实现分类查看评论的方法，其中有存在很大的坑。

```JavaScript
_getSelectRate () {
  let _ratings = [];
  // 现根据当前选中需要显示评论的类别
  if (this.selectType === RATE_TYPE.ALL) {
    this.selectRatings = this.food.ratings;
  } else {
    _ratings = this.food.ratings.filter(rating => {
      return rating.rateType === this.selectType;
    });
    this.selectRatings = _ratings;
  }
  // 再看是否需要屏蔽没有内容的评论
  if (this.onlyContainText) {
    _ratings = this.selectRatings.filter(rating => {
      return rating.text.trim() !== "";
    });
    this.selectRatings = _ratings;
  }
},
```
该函数主要实现的功能就是根据当前对象指定的需要查看评论的类别，来生成当前所需的评论数据，然后再渲染到页面，这个逻辑没有为什么问题，但却需要额外的变量来保存当前筛选的评论数据，而且在每次更改查看评论内容时都需要执行该应用（也就是对数据作了一次更新），这对于视图渲染来说无疑是有点浪费性能（有些评论是无需再次渲染的）. 那么更优的解决方案就是需要灵活使用数据和VUE框架的特性，如下面这样改变代码，就显得更加优雅而且也优化了性能

```JavaScript
_rateNeedShow (type, text) {
  if (this.onlyContainText && !text) {
    return false;
  }
  if (this.selectType === RATE_TYPE.ALL) {
    return true;
  } else {
    return type === this.selectType;
  }
}
```

你看只需要做一个判断函数，在每次更改查看评论内容时，我们只需要通过该函数来评定哪些评论需要显示哪些需要隐藏，浏览器无需再次生成新的DOM，而且整个逻辑思维更加易懂。


* #### bug

购物车数据第一次添加数据无视图更新？？？

