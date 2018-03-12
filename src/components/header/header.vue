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
import Detail from './detail/Detail.vue';
import {ERR_OK, CLASS_MAP} from 'common/js/default-config.js';

export default {
  name: 'Header',
  props: {
    seller: Object
  },
  data () {
    return {
      showDetail: false,
      classMap: CLASS_MAP
    };
  },
  methods: {
    isShowDetail () {
      this.showDetail = !this.showDetail ? true : false;
    }
  },
  components: {
    'v-detail': Detail
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
</style>
