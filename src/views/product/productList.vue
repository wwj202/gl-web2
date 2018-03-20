<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>产品列表</span>
                    <el-button type="success" size="mini" style="float: right;" @click="dialogFormVisible = true">新增产品</el-button>
                    <el-dialog title="新增产品" :visible.sync="dialogFormVisible"
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <el-form :model="form" label-width="110px">
                            <el-form-item label="产品名称">
                                <el-input v-model="form.fldName" placeholder="请输入产品名称" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="产品系列">
                                <el-select filterable v-model="form.fldSeries" placeholder="请选择产品系列">
                                    <el-option v-for="i in seriesList" :key="i.fldValue" :label="i.fldName" :value="i.fldValue" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="产品规格">
                                <el-input v-model="form.fldSpec" placeholder="请输入产品规格" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="零售单价">
                                <el-input-number v-model="form.fldPrice" placeholder="请输入零售单价" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="会员单价">
                                <el-input-number v-model="form.fldVipPrice" placeholder="请输入会员单价" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="购物券">
                                <el-input-number v-model="form.fldVipVoucher" placeholder="请输入购物券" auto-complete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">确定</el-button>
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
                <el-row type="flex" justify="end">
                    <!--el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :background="true"
                        :total="list.length"
                        :current-page="currentPage"
                        @current-change="onCurrentChange"
                        :page-size="pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        @size-change="onSizeChange" /-->
                </el-row>
                <el-table stripe border :data="pageData" v-loading="list.length < 1">
                    <el-table-column label="id" prop="id" width="80px" />
                    <el-table-column label="产品名称" prop="fldName" />
                    <el-table-column label="产品系列" prop="fldSeriesName" />
                    <el-table-column label="产品规格" prop="fldSpec" />
                    <el-table-column label="零售单价" prop="fldPrice" width="80px" />
                    <el-table-column label="会员价" align="center">
                        <el-table-column label="会员单价" prop="fldVipPrice" width="80px" />
                        <el-table-column label="购物券" prop="fldVipVoucher" width="80px" />
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150px">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini">修改</el-button>
                            <el-button type="danger" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row type="flex" justify="end" style="margin-top: 10px">
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
            seriesList: [{fldName: "aaa", fldValue: "1"}, {fldName: "bbbb", fldValue: "2"}],
            list: [],
            //pageData: [],
            currentPage: 1,
            pageSize: 10,
            dialogFormVisible: false,
            form: {}
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
                    //self.pageData = data.data;
                }
            });
        },
        onCurrentChange(page) {
            this.currentPage = page;
        },
        onSizeChange(size) {
            this.pageSize = size;
        },
        onSubmit() {
            var self = this;
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "http://localhost/gl/product/add",
                data: self.form,
                success: function(data) {
                    if (data.result == "suc") {
                        self.dialogFormVisible = false;
                        self.loadProductList();
                    }
                    else {
                        alert(data.msg);
                    }
                }
            });
        }
    },
    computed: {
        pageData() {
            let {currentPage, pageSize, list} = this;
            return this.filterList.slice(
                (currentPage - 1) * pageSize, currentPage * pageSize
            );
        },
        filterList() {
            let list = this.list;
            return list;
        }
    },
    created() {
        var self = this;
        self.loadProductList();
    }
}
</script>

