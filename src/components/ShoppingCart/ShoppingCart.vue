<template>
  <div class="shopping-cart">
    <div class="shop-info col-line">
      <button class="shop-bar" :class="{'shop-bar-active': hasFood}">
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
  </div>
</template>

<script>
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
      balls: [{show: false},{show: false},{show: false},{show: false},{show: false}],
      dropBalls: []
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
    },
  }
};
</script>

<style scoped>
  @import './shopping-cart.css';
  .shopping-cart {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #141d27;
    height: 48px;
    width: 100%;
    bottom: 0;
    left: 0;
  }
</style>
