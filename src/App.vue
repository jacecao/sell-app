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
@import 'common/style/default.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
