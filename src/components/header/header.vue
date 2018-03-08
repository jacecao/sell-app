<template>
  <header class="headers" :style="{background: style}">
    <div class="content-wraper">
      <div class="avatar">
        <img :src="seller.avatar" alt="seller avatar" :title="seller.name">
      </div>
      <div class="content">
        <div class="title">
          <img class="icon" src="/static/img/brand@2x.png" alt="brand"><span>{{seller.name}}</span>
        </div>
        <p class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span><span class="info">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
const ERR_NO = 0;
export default {
  data () {
    return {
      seller: {},
      style: '',
      classMap: ['decrease', 'discount', 'special', 'invoice']
    };
  },
  created () {
    this.$http.get('/api/seller').then(res => {
      if (res.body.errno === ERR_NO) {
        this.seller = res.body.data;
        this.style = `url(${res.body.data.avatar})`;
      }
    }, res => {
      console.log('err get data');
    });
  }
};
</script>

<style scoped>
  .content-wraper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: rgba(7,17,27,.5);
    padding-bottom: 18px;
  }
  .content-wraper .avatar {
    margin: 24px 0 0 24px;
    width: 6.4rem;
    height: 6.4rem;
  }
  .content-wraper .avatar img {
    height: 100%;
    width: 100%;
    border-radius: 0.2rem;
  }

  .content-wraper .content {
    margin:26px 0 0 16px;
  }

  .content .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.6rem;
    color: rgb(255,255,255);
    font-weight: bold;
    line-height: 1.8rem;
  }
  .content .title img {
    height: 2.1rem;
  }
  .content .title span {
    margin-left: 6px;
  }

  .content .desc {
    margin-top: 8px;
    font-size: 1.2rem;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 1.2rem;
    text-align: left;
  }
  .content .support {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .content .support  .icon{
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    background-size: 100%;
  }
  .content .support .info {
    margin-left: 4px;
    font-size: 1rem;
    color: rgb(255,255,255);
    font-weight: 200;
    line-height: 1rem;
  }

  /*支持信息中 针对不同的信息给出不同的图标*/
  .support .decrease {
    background-image: url('/static/img/decrease_1@3x.png');
  }
  .support .discount {
    background-image: url('/static/img/discount_1@3x.png');
  }
  .support .special {
    background-image: url('/static/img/special_1@3x.png');
  }
  .support .invoice {
    background-image: url('/static/img/invoice_1@3x.png');
  }
</style>
