<template>
  <div class="header-detail">
    <div class="detail-title">
      <h3>{{seller.name}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'seller': Object
  }
};
</script>

<style scoped>
  @import './detail.css';
</style>
