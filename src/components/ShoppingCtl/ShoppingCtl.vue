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
export default {
  name: 'shoppingCtl',
  props: {
    food: Object,
    default () {
      return {
        count: 1
      }
    }
  },
  data () {
    return {
      isActive: false
    };
  },
  computed: {

  },
  methods: {
    // 外部触发更改显示状态
    isShow () {
      if (this.food.count && this.food.count > 0) {
        this.isActive = true;
      }
    },
    clickAdd (event) {
      if (!this.food.count) {
        // 注意这里需要使用vue.set方法来设置对象的属性。
        // 确保属性被创建后也是响应式的，同时触发视图更新
        this.$set(this.food, 'count', 1);
        this.isActive = true;
      } else {
        this.food.count += 1;
      }
       // 触发小球下落动画事件事件
       // 注意这里之所以有event.target,是因为这里由原生click事件生成一个event对象
       // 这里将目标元素传给父组件，用于动画事件定位动画起始位置
      this.$emit('balldrop', event.target);
    },
    clickRemove () {
      this.food.count -= 1;
      if (this.food.count == 0) {
        this.isActive = false;
      }
    }
  }
};
</script>

<style scoped>
  .food-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 2.4rem;
  }
  .food-button .buttons {
    height: 24px;
    width: 24px;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 2.4rem;
    color: rgb(0, 160, 220);
    background: transparent; /* 消除按钮在移动端显示默认背景颜色 */
  }
  .food-button .count {
    display: block;
    height: 24px;
    font-size: 1rem;
    color: rgb(147, 153, 159);
    padding: 0 10px;
    min-width: 14px;
    width: 14px;
  }

  .fade-enter,.fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active,
  .move-enter-active,.move-leave-active {
    transition: all .5s;
  }
  .move-enter,.move-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(180deg);
  }

</style>
