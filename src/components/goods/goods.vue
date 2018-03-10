<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text hr"><span v-show="item.type > 0" class="icon" :class="class_map[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <!-- 食物列表 -->
      <ul class="food-ul">
        <h3 class="food-title" ref="food-title">{{goods[0].name}}</h3>
        <li v-for="food in foods" class="food-list hr">
          <div class="food-content">
            <img :src="food.icon" alt="icon" class="food-icon">
            <div class="food-message">
              <p class="food-name">{{food.name}}</p>
              <p class="food-desc">{{food.description}}</p>
              <p class="food-text"><span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span></p>
              <p class="food-price">￥<span class="price">{{food.price}}</span><span v-show="food.oldPrice" class="old-price"><i>￥</i>food.oldPrice</span></p>
            </div>
          </div>
          <div class="buttons">
            <v-button/>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import {ERR_OK, CLASS_MAP} from 'common/js/default-config.js';
import button from './button.vue';
import Scroll from 'better-scroll';

export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: {},
      foods: {},
      class_map: CLASS_MAP
    };
  },
  created () {
    this.$http.get('/api/goods').then(res => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        this.foods = this.goods[0].foods;
        this.$nextTick(() => {
          this._init_scroll();
        });
      }
    });
  },
  methods: {
    _init_scroll () {
      this.menuScroll = new Scroll(this.$refs['menu'], {mouseWheel: true});
      this.foodsScroll = new Scroll(this.$refs['foods'], {mouseWheel: true});
    },
    _title_show () {
      // console.log('sssssss');
      // let title = this.$refs['food-title'];
      window.addEventListener('scroll', (e) => {
        console.log(e.target);
      }, false);
    }
  },
  components: {
    'v-button': button
  }
};
</script>

<style scoped>
  @import './goods.css';
  .buttons {
    position: absolute;
    right: 16px;
    bottom: 18px;
  }
</style>
