<template>
  <transition name="move">
    <!-- 商品售卖信息 -->
    <div class="food-detail" v-show="isShow" @click="" ref="food-detail">
      <div class="container">
        <!-- 这里为什么需要单独给img添加一个盒子呢 -->
        <!-- 因为这里我们需要保证这个图片是一个正方形，而且宽度是随着屏幕变化的，宽高不能写死 -->
        <div class="post-box">
          <img class="food-post" :src="food.image" alt="food post image">
        </div>
        <div class="food-item food-info hr">
          <h3 class="title">{{food.name}}</h3>
          <p class="status">月售{{food.sellCount}}份<span>好评率{{food.rating}}%</span></p>
          <p class="price">￥<span class="now">{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥<span class="bold">{{food.oldPrice}}</span></span>
          </p>
          <!-- 购买按钮 -->
          <!-- 当前商品没有购买时，才显示购买按钮 -->
          <button class="add sell" @click="_click_sell($event)" v-show="!food.count || food.count == 0">加入购物车</button>
        </div>
        <!-- 商品介绍 -->
        <div class="food-item food-desc hr-db" v-show="food.info">
          <h3 class="title">商品介绍</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <!-- 商品评价 -->
        <div class="food-item food-rate hr-db">
          <h3 class="title">商品评价</h3>
          <div class="rate-header hr">
            <span class="rate-type all">全部<span class="num">{{food.ratings.length}}</span></span>
            <span class="rate-type type-0">推荐<span class="num">{{_rate_good}}</span></span>
            <span class="rate-type type-1">吐槽<span class="num">{{_rate_bad}}</span></span>
          </div>
          <div class="ctl-rate">
            <i class="icon icon-check_circle" @click="_has_text_rate($event)"></i> <span>值看有内容的评价</span>
          </div>
        </div>
        <!-- 评价列表 -->
        <ul class="food-item food-rate-ul hr">
          <li class="rate-list hr" v-for="rate of food.ratings" :key="rate.username">
            <div class="clearfix">
              <span class="rate-time">2018-01-02 12:34</span>
              <div class="user-info">
                <span class="name">{{rate.username}}</span>
                <img class="avatar" :src="rate.avatar" alt="username.avatar">
              </div>
            </div>
            <p class="text"><i :class="rate.rateType ? 'icon-thumb_down' : 'icon-thumb_up active-icon'"></i>{{rate.text}}</p>
          </li>
        </ul>

        <!-- 退出按钮 -->
        <button class="closed" @click="hidden"><i class="icon-arrow_lift"></i></button>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'better-scroll';
import {RATE_TYPE} from 'common/js/default-config.js';
export default {
  name: 'food-detail',
  props: {
    food: Object
  },
  data () {
    return {
      isShow: false,
      ratings: []
    };
  },
  created () {
    this.ratings = this.food.ratings;
  },
  computed: {
    // 获取坏的评价总数
    _rate_good () {
      return this._total_rate(RATE_TYPE.GOOD);
    },
    // 获取好的评价总数
    _rate_bad () {
      return this._total_rate(RATE_TYPE.BAD);
    }
  },
  methods: {
    // 点击购买按钮
    _click_sell (event) {
      if (!this.food.count) {
        // 注意这里需要使用vue.set方法来设置对象的属性。
        // 确保属性被创建后也是响应式的，同时触发视图更新
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count ++;
      }
       // 触发小球下落动画事件事件
       // 注意这里之所以有event.target,是因为这里由原生click事件生成一个event对象
       // 这里将目标元素传给父组件，用于动画事件定位动画起始位置
      this.$emit('balldrop', event.target);
    },
    show () {
      this.isShow = true;
      // 开启滚动
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Scroll(this.$refs['food-detail'], {
            mouseWheel: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    // 自身点击隐藏
    hidden () {
      this.isShow = false;
    },
    // 计算各类评价总数
    _total_rate (type) {
      let _count = 0;
      this.food.ratings.forEach(rating => {
        if (rating.rateType === type) {
          _count++;
        }
      });
      return _count
    },
    // 点击获取有内容的评价
    _has_text_rate (event) {
      // 这里查看当前图标是否添加激活图标
      if (event.target.classList.contains('active')) {
        // 如果意见激活，那么这次点击将取消激活样式
        event.target.classList.remove('active');
        // 并重新获取评论数据为传递过来的原始数据
        this.ratings = this.food.ratings;
      } else {
        // 如果没有激活图标样式，那么激活样式
        event.target.classList.add('active');
        let _ratings = [];
        // 获取有内容的评价
        this.food.ratings.forEach(rating => {
          if (rating.text.trim() !== "") {
            _ratings.push(rating);
          }
        });
        // 将有内容的评价更新到当前数据中
        this.ratings = _ratings;
      }
    }
  }
};
</script>

<style scoped>
  @import './food.css';
  .food-detail {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px; /* 要留出底边栏的距离*/
    width: 100%;
    background-color: #f3f5f7;
    text-align: left;
    overflow: hidden;
  }
  .move-enter,.move-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .move-enter-active,.move-leave-active {
    transition: all .5s linear;
  }
</style>
