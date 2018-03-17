<template>
  <transition name="move">
    <!-- 商品售卖信息 -->
    <div class="food-detail" v-show="isShow" ref="food-detail">
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
          <button class="add sell" @click="_click_sell($event)">加入购物车</button>
        </div>
        <!-- 商品介绍 -->
        <div class="food-item food-desc hr-db" v-show="food.info">
          <h3 class="title">商品介绍</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <!-- 商品评论 -->
        <div class="food-item food-rating hr-db">
          <h3 class="title">商品评论</h3>
          <!-- 商品评论控制组件 -->
          <v-ratings
            :ratings="food.ratings"
            @changeType="_changeRateType"
            :selectType="selectType"
            :onlyContainText="onlyContainText"
            @onlyContain="_changeRead"
          />
          <!-- 评价列表 -->
          <template v-if="food.ratings">
            <ul class="rate-item food-rate-ul hr">
              <li class="rate-list hr"
                  v-for="rate of food.ratings"
                  v-show="_rateNeedShow(rate.rateType, rate.text)"
                  :key="rate.username"
              >
                <div class="clearfix">
                  <span class="rate-time">{{rate.rateTime | formDate}}</span>
                  <div class="user-info">
                    <span class="name">{{rate.username}}</span>
                    <img class="avatar" :src="rate.avatar" alt="avatar">
                  </div>
                </div>
                <p class="text"><i :class="rate.rateType ? 'icon-thumb_down' : 'icon-thumb_up active-icon'"></i>{{rate.text}}</p>
              </li>
            </ul>
          </template>
        </div>
        <!-- 退出按钮 -->
        <button class="closed" @click="hidden"><i class="icon-arrow_lift"></i></button>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from 'better-scroll';
import RatingSelect from 'components/RatingSelect/RatingSelect.vue';
import {RATE_TYPE} from 'common/js/default-config.js';
import {formatDate} from 'common/js/tools.js';
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
  filters: {
    formDate (date) {
      let _dateObj = new Date(date);
      return formatDate(_dateObj, 'YYYY-MM-DD hh:mm:ss');
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
        this.food.count++;
      }
       // 触发小球下落动画事件事件
       // 注意这里之所以有event.target,是因为这里由原生click事件生成一个event对象
       // 这里将目标元素传给父组件，用于动画事件定位动画起始位置
      this.$emit('balldrop', event.target);
    },
    show () {
      this.isShow = true;
      this.selectRatings = this.food.ratings;
      this.selectType = RATE_TYPE.ALL;
      this.onlyContainText = false;
      // 开启滚动
      this.$nextTick(() => {
        // 重置传递数据，这个非常关键
        // 如果不重置，那么会影响下次展示
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
    // 看这个方法让上面的方法显得笨拙，这里再一次体现数据驱动视图的真正内涵
    // 多体会这里的是如何实现评论分类的
    _rateNeedShow (type, text) {
      if (this.onlyContainText && !text) {
        return false;
      }
      if (this.selectType === RATE_TYPE.ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    // 改变评论显示类别
    _changeRateType (type) {
      this.selectType = type;
      // this._getContentRate();
      // this.$nextTick(() => {
      //   this.scroll.refresh();
      // });
    },
    // 是否显示没有内容的评价
    _changeRead (bool) {
      this.onlyContainText = bool;
      // this._getContentRate();
      // this.$nextTick(() => {
      //   this.scroll.refresh();
      // });
    }
  },
  components: {
    'v-ratings': RatingSelect
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
