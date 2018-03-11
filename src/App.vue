<template>
  <div id="app">
    <v-header :seller="seller"/>
    <v-tab/>
    <router-view :seller="seller"/>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Tab from '@/components/tab/Tab.vue';
import {ERR_OK} from 'common/js/default-config.js';
export default {
  name: 'App',
  data () {
    return {seller: {}}
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
  components: {
    'v-header': Header,
    'v-tab': Tab
  }
};
</script>

<style>
/*常规的默认设置*/
@import 'common/style/default.css';
/*不同优惠信息图标背景加载*/
@import 'common/style/icon/default-icon.css';
/*字体图标的加载*/
@import 'common/sell-icon/style.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
