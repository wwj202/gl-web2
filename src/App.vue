<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <div style="background-color: #545c64; color: white; font-size: 30px; padding: 20px 20px; border-right: solid 1px #e6e6e6;">系统菜单</div>
        <el-menu
          default-active="/product"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
          :router="true"
          :style="menuStyle">
          <el-menu-item index="/product">
            <i class="el-icon-menu"></i>
            <span slot="title">产品管理</span>
          </el-menu-item>
          <el-menu-item index="/purchaseOrderList">
            <i class="el-icon-download"></i>
            <span slot="title">进货管理</span>
          </el-menu-item>
          <el-menu-item index="/sellOrderList">
            <i class="el-icon-upload2"></i>
            <span slot="title">售货管理</span>
          </el-menu-item>
          <el-menu-item index="/productStockStat">
            <i class="el-icon-picture"></i>
            <span slot="title">产品库存统计</span>
          </el-menu-item>
          <el-menu-item index="/productSellRanking">
            <i class="el-icon-star-on"></i>
            <span slot="title">产品销售排名</span>
          </el-menu-item>
          <el-menu-item index="/subsidyList">
            <i class="el-icon-tickets"></i>
            <span slot="title">报单补助列表</span>
          </el-menu-item>
          <el-menu-item index="/subsidyStat">
            <i class="el-icon-date"></i>
            <span slot="title">报单补助统计</span>
          </el-menu-item>
          <!-- <el-menu-item index="/test">
            <i class="el-icon-setting"></i>
            <span slot="title">测试</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    menuStyle() {
      return "min-height:" + document.body.clientHeight + "px";
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
