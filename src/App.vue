<template>
  <div id="app">
    <v-header :seller="seller"/>
    <v-tab/>
    <keep-alive>
      <router-view
        :seller="seller"
        :selectedFood="selectedFood"
        @selected="selectedListener"
      />
    </keep-alive>
    <v-shopcart
      :minPrice="seller.minPrice"
      :deliveryPrice="seller.deliveryPrice"
      :selectedFood="selectedFood"
      ref="shopcart"
    />
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart.vue';
import Tab from '@/components/tab/Tab.vue';
import {ERR_OK} from 'common/js/default-config.js';
import {urlParse} from 'common/js/tools.js';
export default {
  name: 'App',
  data () {
    return {
      seller: {
        id: urlParse().id
      },
      selectedFood: [] // 已经挑选购买的产品
    }
  },
  created () {
    // 通过vue-resource中间件请求数据
    this.$http.get('/api/seller/?id=' + this.seller.id).then(res => {
      // 返回的错误编号与设置的编号一样，那么数据请求成功
      if (res.body.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.body.data);
      }
    }, res => {
      console.log('err get data');
    });
  },
  methods: {
    // 监听购车触发的小球下落动画事件
    // 注意这里事件三方数据转换
    // 1. ’购物按钮组件‘传递给’goods组件‘ （通过事件触发）
    // 2. goods组件再将‘购物按钮组件’传递的数据传给‘购物车组件、（通过$ref主动执行’购物车组件中的方法‘）
    // VUE实在太酷啦
    selectedListener (target) {
      // console.log(this.selectedFood);
      // 优化性能异步执行
      this.$nextTick(() => {
        // 通过ref获取购物车组件
        let shopcart = this.$refs.shopcart;
        // 执行购物车组件中小球下落动画函数
        // console.log(shopcart);
        shopcart.drop(target);
      });
    },
  },
  components: {
    'v-header': Header,
    'v-tab': Tab,
    'v-shopcart': ShoppingCart
  }
};
</script>

<style>
/*常规的默认设置*/
@import 'common/style/default.css';
/*不同优惠信息图标背景加载*/
@import 'common/style/icon/default-icon.css';
/*字体图标的加载*/
@import 'common/sell-icon/style.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*常用过渡动画css*/
.fade-enter,.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,.fade-leave-active {
  transition: all .5s;
}
</style>
