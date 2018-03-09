<template>
  <div class="header-detail">
    <div class="detail-content clearfix">
      <div class="detail-main">
        <!--
        <div class="detail-title">
          <h3>{{seller.name}}</h3>
          <v-star :size="36" :score="seller.score"/>
        </div>
        -->
        <!-- 优惠信息 -->
        <!--
        <div class="info-content">
          <div class="info-title">
            <i class="line"></i><span>优惠信息</span><i class="line"></i>
          </div>
          <ul class="benefit-list">
            <li v-for="supportInfo in (seller.supports)">
              <i class="icon" :class="classarr[supportInfo.type]"></i><span class="info">{{supportInfo.description}}</span>
            </li>
          </ul>
        </div>
        -->
        <!-- 商家公告 -->
        <!--
        <div class="info-content">
          <div class="info-title">
            <i class="line"></i><span>商家公告</span><i class="line"></i>
          </div>
          <p class="bulletin-text">{{}}</p>
        </div>
        -->
      </div>
    </div>
    <button type="button" class="detail-closed" v-on:click="changStatus"><i class="icon-close"></i></button>
  </div>
</template>

<script>
import star from 'components/star/star.vue';
export default {
  props: {
    'seller': Object,
    'classarr': Array
  },
  created () {
    // console.log(this.classarr);
  },
  methods: {
    changStatus () {
      // 触发status事件，告诉父组件子组件状态变化
      // 父组件需要监听子组件status事件和事件回调函数
      this.$emit('status');
    }
  },
  components: {
    'v-star': star
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
    border-radius: 50%;
    background: transparent;
    box-shadow: 0 0 1px 2px rgba(255,255,255,.2);
    margin: -64px auto 0 auto;
    padding: 0;
    clear: both;
  }
      .detail-closed i {
        font-size: 3.2rem;
        color: rgba(255,255,255,.5);
      }

</style>
