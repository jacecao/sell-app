<template>
  <div id="app">
    <v-header/>
    <v-tab/>
    <router-view/>
  </div>
</template>

<script>
import header from '@/components/header/header.vue';
import tab from '@/components/tab/tab.vue';
export default {
  name: 'App',
  components: {
    'v-header': header,
    'v-tab': tab
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
