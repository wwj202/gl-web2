<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>产品列表</span>
                    <el-button type="success" size="mini" style="float: right;" @click="editMode = 'add'">新增产品</el-button>
                    <el-dialog title="新增产品" :visible="dialogFormVisible" @close="editMode = 'none'"
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <el-form :model="form" label-width="110px">
                            <el-form-item label="产品名称">
                                <el-input v-model="form.fldName" placeholder="请输入产品名称" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="产品系列">
                                <el-select filterable v-model="form.fldSeries" placeholder="请选择产品系列">
                                    <el-option v-for="i in seriesList" :key="i.id" :label="i.fldName" :value="i.id" />
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
                                <el-button @click="editMode = 'none'">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
                <el-row type="flex" style="margin-bottom: 10px">
                    <span style="margin-right: 20px">查询条件：</span>
                    <el-input style="width: 200px" clearable placeholder="请输入商品名称" v-model="productNameSearch" size="mini" />
                    <el-select clearable filterable v-model="seriesSearch" :placeholder="'请选择系列'" size="mini" style="margin-left: 15px">
                        <el-option v-for="i in seriesList" :key="i.id" :label="i.fldName" :value="i.id"></el-option>
                    </el-select>
                </el-row>
                <el-row type="flex" justify="end">
                    <!--el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :background="true"
                        :total="filterList.length"
                        :current-page="currentPage"
                        @current-change="onCurrentChange"
                        :page-size="pageSize"
                        :page-sizes="[10, 20, 50, 100]"
                        @size-change="onSizeChange" /-->
                </el-row>
                <el-table stripe border :data="pageData" v-loading="list.length < 1">
                    <el-table-column label="编号" prop="id" width="80px" />
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
                            <el-button type="primary" size="mini" @click="updateClick(scope.row)">修改</el-button>
                            <el-button type="danger" size="mini" @click="deleteClick(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row type="flex" justify="end" style="margin-top: 10px">
                    <el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :background="true"
                        :total="filterList.length"
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
import {baseUrl} from '../../js/constants';

export default {
    name: 'Test',
    data () {
        return {
            seriesList: [],
            list: [],
            currentPage: 1,
            pageSize: 10,
            form: {},
            productNameSearch: "",
            seriesSearch: "",
            editMode: "none"
        }
    },
    methods: {
        loadProductList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "product/list",
                data: {},
                success: function(data) {
                    self.list = data.data;
                    //self.pageData = data.data;
                }
            });
        },
        loadSeriesList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "product/series/list",
                data: {},
                success: function(data) {
                    self.seriesList = data.data;
                }
            });
        },
        onCurrentChange(page) {
            this.currentPage = page;
        },
        onSizeChange(size) {
            this.pageSize = size;
        },
        updateClick(data) {
            this.form = $.extend({}, data);
            this.editMode = 'update';
        },
        onSubmit() {
            var self = this;
            var url = baseUrl + "product/add";
            if (self.editMode == "update") {
                url = baseUrl + "product/update";
            }
            $.ajax({
                type: "POST",
                dataType: "json",
                url: url,
                data: self.form,
                success: function(data) {
                    if (data.result == "suc") {
                        self.editMode = 'none';
                        self.loadProductList();
                    }
                    else {
                        self.$alert(data.msg, '提交失败', {confirmButtonText: '确定'});
                    }
                }
            });
        },
        deleteClick(data) {
            var self = this;
            this.$confirm('您确定要删除商品【' + data.fldName + '】吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: baseUrl + "product/delete",
                    data: self.form,
                    success: function(data) {
                        if (data.result == "suc") {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.loadProductList();
                        }
                        else {
                            self.$alert(data.msg, '提交失败', {confirmButtonText: '确定'});
                        }
                    }
                });
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
            let list = this.list, {productNameSearch, seriesSearch} = this;
            //console.log(productNameSearch, seriesSearch);
            if (productNameSearch) {
                list = list.filter(i => ~i.fldName.indexOf(productNameSearch));
            }
            if (seriesSearch) {
                list = list.filter(i => i.fldSeries == seriesSearch);
            }
            return list;
        },
        dialogFormVisible() {
            return this.editMode == 'add' || this.editMode == 'update';
        }
    },
    created() {
        this.loadProductList();
        this.loadSeriesList();
    }
}
</script>

