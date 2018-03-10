<template>
  <div class="food-button">
    <button type="button" class="buttons" hidden><i class="icon-remove_circle_outline"></i></button>
    <span class="count" hidden>2</span>
    <button type="button" class="buttons"><i class="icon-add_circle"></i></button>
  </div>
</template>

<script>
export default {
  name: 'GoodButton'
};
</script>

<style scoped>
  .food-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 2.4rem;
  }
  .food-button .buttons {
    height: 24px;
    width: 24px;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 2.4rem;
    color: rgb(0, 160, 220);
    background: transparent; /* 消除按钮在移动端显示默认背景颜色 */
  }
  .food-button .count {
    font-size: 1rem;
    color: rgb(147, 153, 159);
    padding: 0 10px;
  }
</style>
