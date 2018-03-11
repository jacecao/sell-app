<template>
  <ul class="tab hr">
      <li><router-link to="/" exact>商品</router-link></li>
      <li> <router-link to="/ratings">评价</router-link></li>
      <li> <router-link to="/seller">商家</router-link></li>
  </ul>
</template>

<script>
export default {

};
</script>

<style scoped>
  .tab {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: #f9f9f9;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .tab::after {
    position: absolute;
    bottom: -1px;
  }

  .tab li {
    flex: 1;
  }

  .tab li a {
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-decoration: none;
    color: rgb(77, 85, 93);
  }

  .tab li a.v-active {
    /*background-color: #05d2c9;*/
    /*color: #fff;*/
    color: #05d2c9;
  }
</style>
