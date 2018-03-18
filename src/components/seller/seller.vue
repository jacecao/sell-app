<template>
  <div class="seller-page" ref="seller">
    <div class="seller-content">
      <!-- 头部 -->
      <section class="header hr">
        <div class="overview hr">
          <div class="score">
            <p class="seller-name">{{seller.name}}</p>
            <v-star :size="36" :score="seller.score" class="stars"/>
            <span class="count rating-count">({{seller.ratingCount}})</span>
            <span class="count sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collection">
            <i class="icon-favorite collection-icon" :class="{'active-icon':collection}"></i>
            <p class="[collection ? 'active' : '', text]">{{collection ? '已收藏' : '收藏'}}</p>
          </div>
        </div>
        <div class="desc">
          <dl class="desc-item col-line">
            <dt class="title">起送价</dt>
            <dd class="info">{{seller.minPrice}}<span class="tag">元</span></dd>
          </dl>
          <dl class="desc-item col-line">
            <dt class="title">商家配送</dt>
            <dd class="info">{{seller.deliveryPrice}}<span class="tag">元</span></dd>
          </dl>
          <dl class="desc-item">
            <dt class="title">平均配送时间</dt>
            <dd class="info">{{seller.deliveryTime}}<span class="tag">分钟</span></dd>
          </dl>
        </div>
      </section>
      <!-- 广告/活动 -->
      <section class="items activity hr-db">
        <h3 class="title">公告与活动</h3>
        <p class="bulletin hr">{{seller.bulletin}}</p>
        <ul class="benefit-list">
          <li v-for="supportInfo in (seller.supports)" class="support hr">
            <i class="icon" :class="class_map[supportInfo.type]"></i><span class="info">{{supportInfo.description}}</span>
          </li>
        </ul>
      </section>
      <!-- 商家实景 -->
      <section class="items photo hr-db">
        <h3 class="title">商家实景</h3>
        <ul class="photo-list">
          <li v-for="picture in (seller.pics)" class="support hr">
            <img :src="picture" alt="picture" class="photo">
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import Star from 'components/star/Star.vue';
  import Scroll from 'better-scroll';
  import {CLASS_MAP} from 'common/js/default-config.js';
  export default {
    props: {
      seller: Object
    },
    data () {
      return {
        collection: true,
        class_map: CLASS_MAP
      };
    },
    created () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Scroll(this.$refs['seller'], {
            mouseWheel: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style scoped>
  @import './seller.css';
</style>
