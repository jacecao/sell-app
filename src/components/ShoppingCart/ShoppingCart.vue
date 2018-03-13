<template>
  <!-- 地不购物栏按钮 -->
  <div class="shopping-cart">
    <!-- 购物底边栏 -->
    <div class="shopping-bar">
      <div class="shop-info col-line">
        <button class="shop-bar" :class="{'shop-bar-active': hasFood}" @click="toggleList">
          <i class="icon-shopping_cart cart-icon"></i>
          <span class="total-count" v-show="hasFood">{{totalCount}}</span>
        </button>
        <span class="shop-money">￥<span class="total" :class="{'shop-money-active': hasFood}">{{totalPrice}}</span>元</span>
      </div>
      <div class="shop-tip">
        <p class="shop-tip-text">另需配送费￥{{deliveryPrice}}元</p>
      </div>
      <div class="shop-pay" :class="{'shop-pay-active': mayPay}">
        <button class="shop-pay-button">{{changePay}}</button>
      </div>
    </div>
    <!-- 下落小球 -->
    <div class="ball-container">
      <transition
        v-for="ball of balls"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
      name="drop">
        <div class="ball" v-show="ball.show"></div>
      </transition>
    </div>
    <!-- 购物车列表 -->
    <transition name="move">
      <div class="shopping-list" v-show="showList">
        <div class="list-header hr">
          <span>购物车</span>
          <button class="empty" @click="emptySelect">清空</button>
        </div>
        <div class="list-content-wrapper" ref="list">
          <ul class="list-container">
            <li class="list-item hr" v-for="food of selectFoods">
              <span class="item-name">{{food.name}}</span>
              <span class="item-cash"><span class="icon">￥</span>{{food.price * food.count}}</span>
              <v-button :food="food" class="list-ctl" @balldrop="drop"/>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- 遮罩 -->
    <transition name="fade">
      <div class="list-mask" v-show="showList" @click="toggleList"></div>
    </transition>
  </div>
</template>

<script>
import ShoppingCtl from 'components/ShoppingCtl/ShoppingCtl.vue';
import Scroll from 'better-scroll';
export default {
  name: 'shoppine-cart',
  props: {
    selectFoods: {
      type: Array,
      // 注意数组和对象的默认值应该通过一个工厂函数返回
      default () {
        return [{
          price: 5,
          count: 5
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hasFood: false,
      mayPay: false,
      balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
      dropBalls: [],
      showList: false
    };
  },
  computed: {
    // 计算总价
    totalPrice () {
      let _totalPrice = 0;
      if (this.selectFoods.length > 0) {
        this.selectFoods.forEach(food =>{
          // 这里传过来的值应该是包含商品单价和数量的对象
          _totalPrice += food.price * food.count;
        });
      }
      return _totalPrice;
    },
    // 计算购买商品数量
    totalCount () {
      let _totalCount = 0;
      if (this.selectFoods.length > 0) {
        this.hasFood = true;
        this.selectFoods.forEach(food =>{
          // 这里传过来的值应该是包含商品单价和数量的对象
          _totalCount += food.count;
        });
      } else {
        this.hasFood = false;
        // 如果没有选择产品那么关闭产品列表
        this.showList = false;
      }
      return _totalCount;
    },
    // 计算是否符合配送
    changePay () {
      let _totalPrice = this.totalPrice;
      if (_totalPrice > 0) {
        if (_totalPrice < this.minPrice) {
          this.mayPay = false;
          return `还差￥${this.minPrice - _totalPrice}起送`;
        } else {
          this.mayPay = true;
          return '结算';
        }
      } else {
        this.mayPay = false;
        return `￥${this.minPrice}元起送`;
      }
    }
  },
  methods: {
    // 折叠购物清单
    toggleList () {
      if (this.totalCount > 0) {
        this.showList = !this.showList ? true : false;
      }
      // 如果当前要显示列表
      if (this.showList) {
        // 那么在下次更新DOM中生效
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Scroll(this.$refs['list'], {mouseWheel: true});
          } else {
            this.scroll.refresh();
          }
          // console.log(this.$refs.list);
        });
      }
    },
    // 情况购物清单
    emptySelect () {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    // 执行小球下落动画
    drop (target) {
      // 获取当前可以触发下落动画的小球
      // 也就是这里还未显示的小球才可以执行下落动画
      // this.balls[0].show = true;
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true;
          this.balls[i].ele = target;
          this.dropBalls.push(this.balls[i]);
          // 一但找到条件符合的对象那么退出当前函数
          // console.log(this.dropBalls);
          return;
        }
      }
    },
    // 过渡动画执行方法
    // 注意在监听过渡动画时会将需要执行动画的元素传入
    beforeEnter (el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          // 获取触发元素定位
          let position = ball.ele.getBoundingClientRect();
          // 这里需要处理ball自身高度和left、top定位
          let x = position.left - 72;
          let y = -(window.innerHeight - position.top) + 58;
          el.style.display = 'block';
          el.style.webkitTransform = `translate3d(${x}px,${y}px,0)`;
          el.style.transform = `translate3d(${x}px,${y}px,0)`;
        }
      }
    },
    enter (el) {
      // 这里是主动触发浏览器对页面的渲染
      // 这里非常关键，如果没有强制重绘那么动画效果就难以实现
      // 为什么会这样呢？
      // 主要是因为我们在同一执行栈中给el同样的属性设置了不同的值
      // el.style.transform 设置了不同的值
      // 浏览器在执行过程中就会直接设置为最后一个值
      // 类似于 var a = 1; a = 2; 最后你看不到a = 1 再到 a = 2这个过程
      // 所以这里执行el.offsetHeight，在获取该元素自身高度时，
      // 浏览器必须按照已经设置好的属性重新绘制页面
      el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0';
        el.style.transform = 'translate3d(0,0,0';
      });
    },
    afterEnter (el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    }
  },
  components: {
    'v-button': ShoppingCtl
  }
};
</script>

<style scoped>
  @import './ShoppingCart.css';
  .shopping-cart {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
</style>
