import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: () =>
      	  import ('@/views/index')
    },
    {
      path: '/test',
      name: 'test',
      component: () =>
      	  import ('@/views/Test')
    },
    {
      path: '/product',
      name: 'product',
      component: () =>
      	  import ('@/views/product/productList')
    },
    {
      path: '/purchaseOrderList',
      name: 'purchaseOrderList',
      component: () =>
      	  import ('@/views/purchase/purchaseOrderList')
    },
    {
      path: '/purchaseOrder/:id/:date/detail',
      name: 'purchaseOrder',
      component: () =>
      	  import ('@/views/purchase/purchaseOrder')
    },
    {
      path: '/sellOrderList',
      name: 'sellOrderList',
      component: () =>
      	  import ('@/views/sell/sellOrderList')
    },
    {
      path: '/sellOrder/:id/:date/:customer/detail',
      name: 'sellOrder',
      component: () =>
      	  import ('@/views/sell/sellOrder')
    },
    {
      path: '/productStockStat',
      name: 'productStockStat',
      component: () =>
      	  import ('@/views/product/productStockStat')
    },
    {
      path: '/productSellRanking',
      name: 'productSellRanking',
      component: () =>
      	  import ('@/views/product/sellRanking')
    },
    {
      path: '/subsidyList',
      name: 'subsidyList',
      component: () =>
      	  import ('@/views/subsidy/subsidyList')
    },
    {
      path: '/subsidyStat',
      name: 'subsidyStat',
      component: () =>
      	  import ('@/views/subsidy/subsidyStatistic')
    }
  ]
})
