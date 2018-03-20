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
        <div class="photo-wrapper" ref="photo-wrapper">
          <ul class="photo-ul" ref="photo-ul">
            <li v-for="picture in (seller.pics)" class="photo-list hr">
              <img :src="picture" alt="picture" class="photo">
            </li>
          </ul>
        </div>
      </section>
      <!-- 商家信息 -->
      <section class="items sell-info hr-db">
        <h3 class="title hr">商家信息</h3>
        <ul class="info">
          <li class="info-list hr" v-for="info of seller.infos">{{info}}</li>
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
        collection: false,
        class_map: CLASS_MAP
      };
    },
    created () {
      this._get_seller();
    },
    watch: {
      // 这里需要对传入的seller作监控
      // 这样当后期信息发送变化时可以及时刷新页面
      'seller' () {
        this._get_seller();
      }
    },
    methods: {
      // 获取seller数据
      _get_seller () {
        let _pics_length = null;
        // 获取图片长度
        if (this.seller.pics) {
          _pics_length = this.seller.pics.length;
        }
        this.$nextTick(() => {
          if (_pics_length && this.$refs['photo-ul']) {
            // 重新设定图片容器的宽度
            this.$refs['photo-ul'].style.width = 120 * _pics_length + 6 * (_pics_length - 1) + 'px';
          }
          if (!this.scroll) {
            this.scroll = new Scroll(this.$refs['seller'], {
              mouseWheel: true,
              click: true
            });
            // 添加图片滚动
            this.scrollPics = new Scroll(this.$refs['photo-wrapper'], {
              mouseWheel: true,
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.scroll.refresh();
            this.scrollPics.refresh();
          }
        });
      }
    },
    components: {
      'v-star': Star
    }
  };
</script>

<style scoped>
  @import './seller.css';
</style>
