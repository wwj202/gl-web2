<template>
        <el-main>
            <el-card>
                <div slot="header">产品列表</div>
                <el-row type="flex" justify="end">
                    <el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :background="true"
                        :total="list.length"
                        :current-page="currentPage"
                        @current-change="onCurrentChange"
                        :page-size="pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        @size-change="onSizeChange" />
                </el-row>
                <el-table :data="pageData" v-loading="list.length < 1">
                    <el-table-column label="id" prop="id" />
                    <el-table-column label="产品名称" prop="fldName" />
                    <el-table-column label="产品系列" prop="fldSeries" />
                    <el-table-column label="产品规格" prop="fldSpec" />
                    <el-table-column label="零售单价" prop="fldPrice" />
                    <el-table-column label="会员单价" prop="fldVipPrice" />
                    <el-table-column label="购物券" prop="fldVipVoucher" />
                </el-table>
                <el-row type="flex" justify="end">
                    <el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :background="true"
                        :total="list.length"
                        :current-page="currentPage"
                        @current-change="onCurrentChange"
                        :page-size="pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        @size-change="onSizeChange" />
                </el-row>
            </el-card>
        </el-main>
</template>

<script>

import $ from 'jquery';

export default {
  name: 'Test',
  data () {
    return {
      list: [],
      pageData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
      loadProductList() {
        var self = this;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "http://localhost/gl/product/list",
            data: {},
            success: function(data) {
                self.list = data.data;
                self.pageData = data.data;
            }
        });
      },
      onCurrentChange(page) {
          this.currentPage = page;
      },
      onSizeChange(size) {
          this.pageSize = size;
      }
  },
  created() {
    var self = this;
    self.loadProductList();
  }
}
</script>

