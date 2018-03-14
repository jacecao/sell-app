<template>
  <div class="rating-select">
    <template v-if="ratings.length">
      <div class="rate-header hr">
        <span class="rate-type type-all"
              :class="{active: selectType === 2}"
              @click="_change_rate_type(2)"
        >{{desc_text.all}}<span class="num">{{ratings.length}}</span></span>
        <span class="rate-type type-0"
              :class="{active: selectType === 0}"
              @click="_change_rate_type(0)"
        >{{desc_text.good}}<span class="num">{{_rate_good.length}}</span></span>
        <span class="rate-type type-1"
              :class="{active: selectType === 1}"
              @click="_change_rate_type(1)"
        >{{desc_text.bad}}<span class="num">{{_rate_bad.length}}</span></span>
      </div>
      <div class="ctl-rate">
        <i class="icon icon-check_circle"
          :class="{active: onlyContainText}"
          @click="_has_text_rate()"
        ></i><span>只看有内容的评价</span>
      </div>
    </template>
    <p class="no-rate" v-else>目前还没有评价喔</p>
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
  computed: {
    // 获取点赞评论
    _rate_good () {
      return this.ratings.filter((rating) => {
        return rating.rateType === RATE_TYPE.GOOD;
      });
    },
    // 获取吐槽评论
    _rate_bad () {
      return this.ratings.filter(rating => {
        return rating.rateType === RATE_TYPE.BAD;
      });
    }
  },
  methods: {
    // 点击获取有内容的评价
    _has_text_rate () {
      this.$emit('onlyContain', !this.onlyContainText);
    },
    // 改变评价显示内容
    _change_rate_type (type) {
      this.$emit('changeType', type);
    }

  }
};
</script>

<style scoped>
@import './RatingSelect.css';
</style>
