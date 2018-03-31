<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>进货批次列表</span>
                    <el-button type="success" size="mini" style="float: right;" @click="editMode = 'add'">新增批次</el-button>
                    <el-dialog title="新增批次" :visible="dialogFormVisible" @close="editMode = 'none'"
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <el-form :model="form" :rules="rules" ref="theForm" label-width="110px">
                            <el-form-item label="进货日期" prop="fldDate">
                                <el-date-picker v-model="form.fldDate" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions1" />
                            </el-form-item>
                            <el-form-item label="经手人" prop="fldHandler">
                                <el-input v-model="form.fldHandler" placeholder="请输入经手人" auto-complete="off" style="width: 500px" />
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.fldRemark" placeholder="请输入备注" auto-complete="off" style="width: 500px" />
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
                    <el-input style="width: 200px" clearable placeholder="请输入经手人" v-model="handlerSearch" size="mini" />
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
                    <el-table-column label="进货日期" prop="fldDate" />
                    <el-table-column label="经手人" prop="fldHandler" />
                    <el-table-column label="备注" prop="fldRemark" />
                    <el-table-column label="实际进货款" align="center">
                        <el-table-column label="单价" prop="fldPrice" width="80px" />
                        <el-table-column label="购物券" prop="fldVoucher" width="80px" />
                    </el-table-column>
                    <el-table-column label="会员价" align="center">
                        <el-table-column label="单价" prop="fldVipPrice" width="80px" />
                        <el-table-column label="购物券" prop="fldVipVoucher" width="80px" />
                    </el-table-column>
                    <el-table-column label="货款差额" align="center">
                        <el-table-column label="单价" prop="fldDiffPrice" width="80px" />
                        <el-table-column label="购物券" prop="fldDiffVoucher" width="80px" />
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150px">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="updateClick(scope.row)">修改</el-button>
                            <el-button type="success" size="mini" @click="viewClick(scope.row)">明细</el-button>
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
import {baseUrl, datePickerOptions} from '../../js/constants';

export default {
    name: 'Test',
    data () {
        return {
            pickerOptions1: datePickerOptions,
            list: [],
            currentPage: 1,
            pageSize: 10,
            form: {fldRemark: ""},
            handlerSearch: "",
            editMode: "none",
            loadingData: true,
            rules: {
                fldDate: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                fldHandler: [
                    { required: true, message: '请输入经手人', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        loadPurchaseOrderList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "purchase/order/list",
                data: {},
                success: function(data) {
                    self.list = data.data;
                    self.loadingData = false;
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
        viewClick(data) {
            this.$router.push({name: 'purchaseOrder', params: {id: data.id, date: data.fldDate}});
        },
        onSubmit() {
            var self = this;
            self.$refs["theForm"].validate((valid) => {
                if (valid) {
                    var url = baseUrl + "purchase/order/add";
                    if (self.editMode == "update") {
                        url = baseUrl + "purchase/order/update";
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
                                self.loadPurchaseOrderList();
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
            let list = this.list, {handlerSearch} = this;
            if (handlerSearch) {
                list = list.filter(i => ~i.fldHandler.indexOf(handlerSearch));
            }
            return list;
        },
        dialogFormVisible() {
            return this.editMode == 'add' || this.editMode == 'update';
        }
    },
    created() {
        this.loadPurchaseOrderList();
    }
}
</script>

