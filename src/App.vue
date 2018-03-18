<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <div style="background-color: #545c64; color: white; font-size: 30px; padding: 20px 20px">系统菜单</div>
        <el-menu
          default-active="/product"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-active="$route.path"
          :router="true">
          <el-menu-item index="/product">
            <i class="el-icon-menu"></i>
            <span slot="title">产品管理</span>
          </el-menu-item>
          <el-menu-item index="/in">
            <i class="el-icon-download"></i>
            <span slot="title">入库管理</span>
          </el-menu-item>
          <el-menu-item index="/out">
            <i class="el-icon-upload2"></i>
            <span slot="title">出库管理</span>
          </el-menu-item>
          <el-menu-item index="/subsidy">
            <i class="el-icon-date"></i>
            <span slot="title">报单补助管理</span>
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
  name: 'App'
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
