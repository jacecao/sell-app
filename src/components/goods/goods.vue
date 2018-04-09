<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) of goods" class="menu-item" :class="{'menu-active': currentIndex === index}" @click="selectMenu(index)">
          <span class="text hr"><span v-show="item.type > 0" class="icon" :class="class_map[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" ref="foods">
      <!-- 食物列表 -->
      <ul class="food-ul">
        <li class="food-item food-item-hook" v-for="item of goods">
          <h3 class="food-title">{{item.name}}</h3>
          <ul class="food-item-ul">
            <li v-for="food of item.foods" class="food-list hr">
              <div class="food-content" @click="_scanFood(food)">
                <img :src="food.icon" alt="icon" class="food-icon">
                <div class="food-message">
                  <p class="food-name">{{food.name}}</p>
                  <p class="food-desc">{{food.description}}</p>
                  <p class="food-text"><span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span></p>
                  <p class="food-price">￥<span class="price">{{food.price}}</span><span v-show="food.oldPrice" class="old-price"><i>￥</i>{{food.oldPrice}}</span></p>
                </div>
              </div>
              <div class="buttons">
                <v-button
                  :food="food"
                  v-on:selected="selected_food"
                />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 菜品详情组件 -->
    <v-food ref="scan-food" :food="scanFood" @selected="selected_food"/>
  </div>
</template>

<script>
import {ERR_OK, CLASS_MAP} from 'common/js/default-config.js';
import Button from 'components/ShoppingCtl/ShoppingCtl.vue';
import ShoppingCart from 'components/ShoppingCart/ShoppingCart.vue';
import Food from 'components/food/Food.vue';
import Scroll from 'better-scroll';

export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object
    },
    goods: Array
  },
  data () {
    return {
      class_map: CLASS_MAP,
      listHeight: [],
      scrollY: 0,
      scanFood: {}
    };
  },
  created () {
    this.$http.get('/api/goods').then(res => {
      res = res.body;
      if (res.errno === ERR_OK) {
        res.data.forEach(item => {
          this.goods.push(item);
        });
        // this.foods = this.goods[0].foods;
        this.$nextTick(() => {
          this._init_scroll();
          this._calculateHeight();
        });
      }
    });
  },
  computed: {
    // 获取当前滚动位置对应左侧菜单的索引值
    /*
    ** 实现原理
    ** 首先储存各个项目的列表高度
    ** listHeight列表高度数组中的个数大于左侧菜单
    ** 因为我们需要的是区间取值，如下这样理解
    ** [a项] => [0 - a.height]
     * [b项] => [a.height - b.height] ......
     * 通过监听滚动事件来获取当前滚动所处区间的索引
     * 而这里就是获取这个索引
     * 判断索引与项目是否匹配，如果匹配则添加激活样式
     * :class="{'menu-active': currentIndex === index}"
     */
    currentIndex () {
      let _y = this.scrollY;
      let listHeight = this.listHeight;
      for (let i = 0; i < listHeight.length; i++) {
        if (!listHeight[i+1] || _y >= listHeight[i] && _y < listHeight[i+1]) {
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    // 添加滚动组件，让左右列表能完美的实现滚动
    _init_scroll () {
      this.menuScroll = new Scroll(this.$refs['menu'], {
        mouseWheel: true,
        click: true
      });
      this.foodsScroll = new Scroll(this.$refs['foods'], {
        mouseWheel: true,
        click: true,
        probeType: 3
      });

      // 监听滚动
      this.foodsScroll.on('scroll', (pos) => {
        // 取整取正值
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    // 获取每项列表的高度，并存储在this.listHeight数组中
    _calculateHeight () {
      let foodList = this.$refs.foods.querySelectorAll('.food-item-hook');
      // 将foodList真正数组化
      // let listArr = [...foodList];
      let listArr = Array.from(foodList);
      // 注意这里需要首先填入一个起始值
      let _height = 0;
      // 这样的目的是方便判断各个取值区间
      this.listHeight.push(_height);
      listArr.forEach((ele) => {
        this.listHeight.push(_height += ele.clientHeight);
      });
    },
    // 右侧菜单导航实现
    selectMenu (index) {
      let foodList = this.$refs.foods.querySelectorAll('.food-item-hook');
      let activeEle = foodList[index];
      // 这里调用的是better-scrol里的方法实现
      // 需要两个参数：1.显示的目标元素，2.过渡动画时间
      this.foodsScroll.scrollToElement(activeEle, 300);
    },
    // 监听购买事件
    selected_food (target) {
      // 触发购买事件到最外层，通知购物车组件激活小球下落动画
      this.$emit('selected', target);
    },
    // 给food列表绑定点击事件
    // 展示食物详情页
    _scanFood (food) {
      // 然后传入当前food对象，将对象赋值给scanFood
      // scanFood将传给v-food组件
      this.scanFood = food;
      // 绑定v-food子组件,并调用该组件的show方法
      this.$refs['scan-food'].show();
      // 改变网页标题显示
      window.document.title = `sell-${food.name}`;
    }

  },
  components: {
    'v-button': Button,
    'v-shopcart': ShoppingCart,
    'v-food': Food
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
