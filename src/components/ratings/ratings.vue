<template>
  <!-- 店家评论页面 -->
  <div class="ratings" ref="ratings">
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
      <!-- @changeType = "_change_select_type";
        @onlyContain="_change_read" -->
      <v-ratectl
        :ratings="ratings"
        :descText="rate_desc"
        :selectType="selectType"
        :onlyContainText="onlyContainText"
        @onlyContain="_change_read"
        @changeType = "_change_select_type"
        class="rating-ctl"
      />
      <!-- 评论列表 -->
      <template v-if="ratings.length">
        <ul class="rating-ul hr-db">
          <li
            class="rating-list hr"
            v-for="rating of ratings"
            v-show="_rateNeedShow(rating.rateType, rating.text)"
          >
            <div class="rating-header">
              <img :src="rating.avatar" alt="avatar" class="avatar">
              <div class="info clearfix">
                <p class="username">{{rating.username}}
                  <span class="time">{{getTime(rating.rateTime)}}</span>
                </p>
                <v-star :size="24" :score="rating.score" class="score"/><span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="rating-content">
              <p class="text">{{rating.text}}</p>
              <div class="info">
                <i class="type"
                  :class="rating.rateType ? 'icon-thumb_down' : 'icon-thumb_up active-icon'"
                ></i>
                <ul class="recommend" v-if="rating.recommend.length">
                  <li class="food" v-for="food of rating.recommend">
                    {{food}}
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import Star from 'components/star/Star.vue';
import Scroll from 'better-scroll';
import {ERR_OK, RATE_TYPE} from 'common/js/default-config.js';
import RatingSelect from 'components/RatingSelect/RatingSelect.vue';
import {formatDate} from 'common/js/tools.js';
export default {
  name: 'ratings-page',
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
      },
      selectType: RATE_TYPE.ALL,
      onlyContainText: false
    }
  },
  created () {
    console.log(this.selectedFood);
    this.$http.get('/api/ratings').then(res => {
      if (res.body.errno === ERR_OK) {
        this.ratings = res.body.data;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Scroll(this.$refs['ratings'], {
              mouseWheel: true,
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    }, res => {
      console.log('err get data');
    });
  },
  methods: {
    getTime (date) {
      let _date_obj = new Date(date);
      return formatDate(_date_obj, 'YYYY-MM-DD hh:mm:ss');
    },
    _change_select_type (type) {
      this.selectType = type;
    },
    _change_read (bool) {
      this.onlyContainText = bool;
    },
    _rateNeedShow (type, text) {
      if (this.onlyContainText && !text) {
        return false;
      }
      if (this.selectType === RATE_TYPE.ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
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
