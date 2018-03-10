<template>
  <header class="headers">
    <img :src="seller.avatar" alt="" class="background">
    <div class="content-wraper">
      <div class="avatar">
        <img :src="seller.avatar" alt="seller avatar" :title="seller.name">
      </div>
      <div class="content">
        <div class="title">
          <img class="icon" src="./img/brand@2x.png" alt="brand"><span>{{seller.name}}</span>
        </div>
        <p class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[1].type]"></span><span class="info">{{seller.supports[1].description}}</span>
          <div class="tips" v-on:click="isShowDetail">
            <span>{{seller.supports.length}}<i class="icon-keyboard_arrow_right"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="notice" v-on:click="isShowDetail">
      <span class="notice-icon"></span><span class="notice-info">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right right-icon"></i>
    </div>

    <transition name="fade">
      <v-detail v-show="showDetail" v-on:status="isShowDetail" :seller="seller"/>
    </transition>
  </header>
</template>

<script>
import detail from './detail/detail.vue';
import {ERR_OK, CLASS_MAP} from 'common/js/default-config.js';

export default {
  name: 'Header',
  data () {
    return {
      seller: {},
      showDetail: false,
      classMap: CLASS_MAP
    };
  },
  created () {
    // 通过vue-resource中间件请求数据
    this.$http.get('/api/seller').then(res => {
      // 返回的错误编号与设置的编号一样，那么数据请求成功
      if (res.body.errno === ERR_OK) {
        this.seller = res.body.data;
      }
    }, res => {
      console.log('err get data');
    });
  },
  methods: {
    isShowDetail () {
      this.showDetail = !this.showDetail ? true : false;
    }
  },
  components: {
    'v-detail': detail
  }
};
</script>

<style scoped>
  @import './header.css';
  header {
    position: relative;
    background-color: rgba(7,17,27,.5);
    overflow: hidden;
  }

  .fade-enter,.fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active {
    transition: all .5s;
  }
</style>
