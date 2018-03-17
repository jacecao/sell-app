<template>
  <div class="star-icons" :class="starType">
    <i v-for="starState in getStateArr" class="star-item" :class="starState"></i>
  </div>
</template>

<script>
import {LEN, STAR_ON, STAR_OFF, STAR_HALF} from 'common/js/default-config.js';

export default {
  name: 'RatingStar',
  props: {
    size: {
      type: Number,
      default () {
        return 24;
      }
    },
    score: {
      type: Number,
      default () {
        return 0;
      }
    }
  },
  computed: {
    starType () {
      return `star-${this.size}`;
    },
    getStateArr () {
      let _arr = [];
      // 这里这样计算的目的是用了判断分数小数位是否大于5
      let score = Math.floor(this.score * 2) / 2;
      // 通过上面计算是否有小数
      // 如果有小数那么分数小数位一定大于5
      // 带入3.4和3.5进入上面的运算，就明白其中的用意
      let hasDecimal = score % 1 !== 0;
      // 获取当前分数中的整数部分
      let integer = Math.floor(this.score);
      for (let i = 0; i < integer; i++) {
        _arr.push(STAR_ON);
      }
      // 注意这里的执行顺序不能乱
      // 首先加入满星状态、在加入半星状态、再加入灰星状态
      if (hasDecimal) {
        _arr.push(STAR_HALF);
      }
      // 注意加入灰星时，还是需要判断需要加入几颗灰星合适
      while (_arr.length < LEN) {
        _arr.push(STAR_OFF);
      }
      return _arr;
    }
  }
};
</script>

<style scoped>
@import './star.css';
</style>
