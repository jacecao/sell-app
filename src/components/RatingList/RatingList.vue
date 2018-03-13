<template>
  <div class="ratings">
    <div class="rate-item food-rate hr-db">
      <h3 class="title">商品评价</h3>
      <template v-if="ratings.length">
        <div class="rate-header hr">
          <span class="rate-type type-all"
                :class="{active: ratingType === 2}"
                @click="_change_rate_type(2)"
          >{{desc_text.all}}<span class="num">{{ratings.length}}</span></span>
          <span class="rate-type type-0"
                :class="{active: ratingType === 0}"
                @click="_change_rate_type(0)"
          >{{desc_text.good}}<span class="num">{{_rate_good}}</span></span>
          <span class="rate-type type-1"
                :class="{active: ratingType === 1}"
                @click="_change_rate_type(1)"
          >{{desc_text.bad}}<span class="num">{{_rate_bad}}</span></span>
        </div>
        <div class="ctl-rate">
          <i class="icon icon-check_circle" :class="{active: onlyContainText}" @click="_has_text_rate()"></i> <span>只看有内容的评价</span>
        </div>
      </template>
      <p class="no-rate" v-else>目前还没有评价喔</p>
    </div>
    <!-- 简单的评价列表 -->
    <template v-if="ratings.length">
      <ul class="rate-item food-rate-ul hr" v-if="listType == 'simple'">
        <li class="rate-list hr" v-for="rate of selectRatings" :key="rate.username">
          <div class="clearfix">
            <span class="rate-time">2018-01-02 12:34</span>
            <div class="user-info">
              <span class="name">{{rate.username}}</span>
              <img class="avatar" :src="rate.avatar" alt="avatar">
            </div>
          </div>
          <p class="text"><i :class="rate.rateType ? 'icon-thumb_down' : 'icon-thumb_up active-icon'"></i>{{rate.text}}</p>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import {RATE_TYPE} from 'common/js/default-config.js';
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    onlyContainText: {
      type: Boolean,
      defaule () {
        return false;
      }
    },
    selectType: {
      type: Number,
      default () {
        return 2;
      }
    },
    // 列表渲染样式类型，可选简单和详细，‘simple/detail’
    listType: {
      type: String,
      default () {
        return 'simple';
      }
    },
    selectRatings: {
      type: Array,
      default () {
        return [];
      }
    },
    desc_text: {
      type: Object,
      default () {
        return {
          'all': '全部',
          'good': '推荐',
          'bad': '吐槽'
        };
      }
    }
  },
  data () {
    return {
      ratingType: this.selectType
    };
  },
  computed: {
    // 获取坏的评价总数
    _rate_good () {
      return this._total_rate(RATE_TYPE.GOOD);
    },
    // 获取好的评价总数
    _rate_bad () {
      return this._total_rate(RATE_TYPE.BAD);
    }
  },
  methods: {
    // 点击获取有内容的评价
    _has_text_rate () {
      this.$emit('changeRead', !this.onlyContainText);
    },
    // 计算各类评价总数
    _total_rate (type) {
      let _count = 0;
      this.ratings.forEach(rating => {
        if (rating.rateType === type) {
          _count++;
        }
      });
      return _count
    },
    // 改变评价显示内容
    _change_rate_type (type) {
      this.ratingType = type;
      this.$emit('changeType', type);
    }
  }
};
</script>

<style scoped>
@import './RatingList.css';
</style>
