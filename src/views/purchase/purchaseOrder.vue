<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>进货明细列表 - 【进货日期：{{$route.params.date}}】</span>
                    <el-button type="info" size="mini" style="float: right; margin-left: 10px" @click="$router.back()">返回</el-button>
                    <el-button type="success" size="mini" style="float: right;" @click="editMode = 'add'">新增进货明细</el-button>
                    <el-dialog title="新增进货明细" :visible="dialogFormVisible" @close="editMode = 'none'"
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <el-form :model="form" :rules="rules" ref="theForm" label-width="110px">
                            <el-form-item label="产品名称" prop="fldProduct">
                                <el-select filterable v-model="form.fldProduct" placeholder="请选择产品" @change="onChangeProduct">
                                    <el-option v-for="i in productList" :key="i.id" :label="i.fldName" :value="i.id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="产品规格">
                                <el-input readonly v-model="form.fldProductSpec" placeholder="请输入产品规格" auto-complete="off" style="width: 450px" />
                            </el-form-item>
                            <el-form-item label="会员单价">
                                <el-input-number disabled v-model="form.fldVipPrice" placeholder="会员单价" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="会员购物券">
                                <el-input-number disabled v-model="form.fldVipVoucher" placeholder="会员购物券" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="实际进货单价">
                                <el-input-number v-model="form.fldPrice" placeholder="请输入进货单价" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="实际进货购物券">
                                <el-input-number v-model="form.fldVoucher" placeholder="请输入进货购物券" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="进货数量" prop="fldCount">
                                <el-input-number v-model="form.fldCount" placeholder="请输入进货数量" auto-complete="off" />
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
                    <el-input style="width: 200px; margin-left: 15px" clearable placeholder="请输入会员单价" v-model="priceSearch" size="mini" />
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
                <el-table show-summary stripe border :data="pageData" v-loading="loadingData">
                    <el-table-column label="编号" prop="id" width="80px" />
                    <el-table-column label="产品名称" prop="fldProductName" />
                    <el-table-column label="产品规格" prop="fldProductSpec" />
                    <el-table-column label="进货数量" prop="fldCount" width="80px" />
                    <el-table-column label="进货价" align="center">
                        <el-table-column label="进货单价" prop="fldPrice" width="80px" />
                        <el-table-column label="购物券" prop="fldVoucher" width="80px" />
                    </el-table-column>
                    <el-table-column label="进货款" align="center">
                        <el-table-column label="现金" prop="fldTotalPrice" width="80px" />
                        <el-table-column label="购物券" prop="fldTotalVoucher" width="80px" />
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
            productList: [],
            list: [],
            currentPage: 1,
            pageSize: 10,
            choosedProduct: undefined,
            form: {},
            productNameSearch: "",
            priceSearch: "",
            editMode: "none",
            loadingData: true,
            rules: {
                fldProduct: [
                    { required: true, message: '请选择产品', trigger: 'change' }
                ],
                fldCount: [
                    { required: true, message: '请输入产品数量', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        loadDetailList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "purchase/detail/list?orderId=" + self.$route.params.id,
                data: {},
                success: function(data) {
                    self.list = data.data;
                    self.calculateTotalPrice();
                    self.loadingData = false;
                }
            });
        },
        calculateTotalPrice() {
            var theList = this.list;
            for (var i = 0; i < theList.length; i++) {
                theList[i].fldTotalPrice = theList[i].fldCount * theList[i].fldPrice;
                theList[i].fldTotalVoucher = theList[i].fldCount * theList[i].fldVoucher;
            }
        },
        loadProductList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "product/list",
                data: {},
                success: function(data) {
                    self.productList = data.data;
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
        onChangeProduct() {
            var theForm = this.form;
            var val = theForm.fldProduct;
            let product = this.productList.filter(i => i.id === val);
            if (product.length > 0) {
                theForm.fldProduct = product[0].id;
                theForm.fldProductSpec = product[0].fldSpec;
                theForm.fldVipPrice = theForm.fldPrice = product[0].fldVipPrice;
                theForm.fldVipVoucher = theForm.fldVoucher = product[0].fldVipVoucher;
            }
        },
        onSubmit() {
            var self = this;
            self.$refs["theForm"].validate((valid) => {
                if (valid) {
                    var url = baseUrl + "purchase/detail/add";
                    if (self.editMode == "update") {
                        url = baseUrl + "purchase/detail/update";
                    }
                    else {
                        self.form.fldOrder = self.$route.params.id;
                    }
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: url,
                        data: self.form,
                        success: function(data) {
                            if (data.result == "suc") {
                                self.editMode = 'none';
                                self.loadingData = true;
                                self.loadDetailList();
                            }
                            else {
                                self.$alert(data.msg, '提交失败', {confirmButtonText: '确定'});
                            }
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        deleteClick(data) {
            var self = this;
            this.$confirm('您确定要删除商品【' + data.fldProductName + '】进货明细吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: baseUrl + "purchase/detail/delete",
                    data: data,
                    success: function(data) {
                        if (data.result == "suc") {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.loadingData = true;
                            self.loadDetailList();
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
            let list = this.list, {productNameSearch, priceSearch} = this;
            console.log(productNameSearch, priceSearch);
            if (productNameSearch) {
                list = list.filter(i => ~i.fldProductName.indexOf(productNameSearch));
            }
            if (priceSearch) {
                list = list.filter(i => i.fldPrice == priceSearch);
            }
            return list;
        },
        dialogFormVisible() {
            return this.editMode == 'add' || this.editMode == 'update';
        },
        fldProductSpec() {
            return "aaaa";
        }
    },
    created() {
        this.loadDetailList();
        this.loadProductList();
    }
}
</script>

