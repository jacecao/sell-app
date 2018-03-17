<template>
  <!-- 店家评论页面 -->
  <div class="ratings">
    <div class="ratings-content">
      <!-- 综合评分 -->
      <div class="rating-overview">
        <div class="overview-left col-line">
          <p class="score">{{seller.score}}</p>
          <p class="title">综合评分</p>
          <p class="info">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="service service-score">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore"/>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="service food-score">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"/>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="service delivery-time">
            <span class="title">送达时间</span>
            <span class="info">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <!-- 查看评论控制 -->
      <v-ratectl :ratings="ratings" :descText="rate_desc" class="rating-ctl"/>
    </div>
  </div>
</template>

<script>
import Star from 'components/star/Star.vue';
import {ERR_OK} from 'common/js/default-config.js';
import RatingSelect from 'components/RatingSelect/RatingSelect.vue';
export default {
  props: {
    seller: Object
  },
  data () {
    return {
      ratings: [],
      rate_desc: {
        'all': '全部',
        'good': '满意',
        'bad': '不满意'
      }
    }
  },
  created () {
    this.$http.get('/api/ratings').then(res => {
      if (res.body.errno === ERR_OK) {
        this.ratings = res.body.data;
      }
    }, res => {
      console.log('err get data');
    });
  },
  components: {
    'v-star': Star,
    'v-ratectl': RatingSelect
  }
};
</script>

<style scoped>
  @import './ratings.css';
</style>
