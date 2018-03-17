<template>
  <div class="header-detail" v-on:click="changeStatus">
    <div class="detail-wrapper clearfix">
      <div class="detail-content">
        <!-- 店名-标题 -->
        <div class="detail-title">
          <h3>{{seller.name}}</h3>
          <v-star :size="48" :score="seller.score"/>
        </div>
        <!-- 优惠信息 -->
        <div class="info-content">
          <div class="info-title">
            <i class="line"></i><span>优惠信息</span><i class="line"></i>
          </div>
          <ul class="benefit-list">
            <li v-for="supportInfo in (seller.supports)">
              <i class="icon" :class="class_map[supportInfo.type]"></i><span class="info">{{supportInfo.description}}</span>
            </li>
          </ul>
        </div>
        <!-- 商家公告 -->
        <div class="info-content">
          <div class="info-title">
            <i class="line"></i><span>商家公告</span><i class="line"></i>
          </div>
          <p class="bulletin-text">{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <button type="button" class="detail-closed"><i class="icon-close"></i></button>
  </div>
</template>

<script>
import RatingStar from 'components/star/Star.vue';
import {CLASS_MAP} from 'common/js/default-config.js';
export default {
  name: 'Detail',
  props: {
    'seller': Object
  },
  data () {
    return {
      class_map: CLASS_MAP
    };
  },
  created () {
    // console.log(this.classarr);
  },
  methods: {
    changeStatus () {
      // 触发status事件，告诉父组件子组件状态变化
      // 父组件需要监听子组件status事件和事件回调函数
      this.$emit('status');
    }
  },
  components: {
    'v-star': RatingStar
  }
};
</script>

<style scoped>
  @import './detail.css';
  .detail-closed {
    position: relative;
    height: 40px;
    width: 40px;
    border: none;
    outline: none;
    border-radius: 50%;
    background: transparent;
    box-shadow: 0 0 1px 2px rgba(255,255,255,.2);
    margin: -40px auto 32px auto;
    padding: 0;
    clear: both;
  }
      .detail-closed i {
        font-size: 3.2rem;
        color: rgba(255,255,255,.5);
      }

</style>
