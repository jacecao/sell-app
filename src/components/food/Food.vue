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
          <button class="add sell" @click="_click_sell($event)">加入购物车</button>
        </div>
        <!-- 商品介绍 -->
        <div class="food-item food-desc hr-db" v-show="food.info">
          <h3 class="title">商品介绍</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <!-- 商品评价组件 -->
        <v-ratings
          :ratings="food.ratings"
          @changeType="_changeRateType"
          :selectRatings="selectRatings"
          :selectType="selectType"
          :onlyContainText="onlyContainText"
          @changeRead="_changeRead"
        />
        <!-- 退出按钮 -->
        <button class="closed" @click="hidden"><i class="icon-arrow_lift"></i></button>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'better-scroll';
import RatingList from 'components/RatingList/RatingList.vue';
import {RATE_TYPE} from 'common/js/default-config.js';
export default {
  name: 'food-detail',
  props: {
    food: Object
  },
  data () {
    return {
      isShow: false,
      selectRatings: this.food.ratings,
      selectType: RATE_TYPE.ALL,
      onlyContainText: false
    };
  },
  methods: {
    // 点击购买按钮
    _click_sell (event) {
      if (!this.food.count) {
        // 注意这里需要使用vue.set方法来设置对象的属性。
        // 确保属性被创建后也是响应式的，同时触发视图更新
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
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
        // 重置传递数据，这个非常关键
        // 如果不重置，那么会影响下次展示
        this.selectRatings = this.food.ratings;
        this.selectType = RATE_TYPE.ALL;
        this.onlyContainText = false;
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
    // 根据指定要求筛选评论
    // 评论筛选核心
    _getContentRate () {
      let _ratings = [];
      // 现根据当前选中需要显示评论的类别
      if (this.selectType === RATE_TYPE.ALL) {
        this.selectRatings = this.food.ratings;
      } else {
        this.food.ratings.forEach(rating => {
          if (rating.rateType === this.selectType) {
            _ratings.push(rating);
          }
        });
        this.selectRatings = _ratings;
      }
      // 再看是否需要屏蔽没有内容的评论
      if (this.onlyContainText) {
        _ratings = [];
        this.selectRatings.forEach(rating => {
          if (rating.text.trim() !== "") {
            _ratings.push(rating);
          }
        });
        this.selectRatings = _ratings;
      }
    },
    // 改变评论显示类别
    _changeRateType (type) {
      this.selectType = type;
      this._getContentRate();
    },
    // 是否显示没有内容的评价
    _changeRead (bool) {
      this.onlyContainText = bool;
      this._getContentRate();
    }
  },
  components: {
    'v-ratings': RatingList
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
