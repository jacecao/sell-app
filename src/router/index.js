import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'components/goods/Goods.vue';
import Seller from 'components/seller/Seller.vue';
import Ratings from 'components/ratings/Ratings.vue';

Vue.use(Router);

export default new Router({
  // 配置链接激活类名
  linkActiveClass: 'v-active',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
});
