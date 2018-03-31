<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>报单列表</span>
                </div>
                <el-row style="margin-bottom: 10px">
                    <span style="margin-right: 20px">查询条件：</span>
                    <el-input style="width: 200px" clearable placeholder="请输入会员姓名" v-model="customerSearch" size="mini" />
                    <el-button type="success" size="mini" style="float: right;" @click="editMode = 'add'">新增报单</el-button>
                    <el-dialog title="新增报单" :visible="dialogFormVisible" @close="editMode = 'none'"
                        :close-on-click-modal="false" :close-on-press-escape="false">
                        <el-form :model="form" :rules="rules" ref="theForm" label-width="110px">
                            <el-form-item label="报单日期" prop="fldDate">
                                <el-date-picker v-model="form.fldDate" align="right" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions1" />
                            </el-form-item>
                            <el-form-item label="会员姓名" prop="fldCustomer">
                                <el-input v-model="form.fldCustomer" placeholder="请输入会员姓名" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="报单数量" prop="fldCount">
                                <el-input-number v-model="form.fldCount" placeholder="请输入报单数量" auto-complete="off" />
                            </el-form-item>
                            <el-form-item label="补助单价" prop="fldPrice">
                                <el-input-number v-model="form.fldPrice" placeholder="请输入补助单价" auto-complete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">确定</el-button>
                                <el-button @click="editMode = 'none'">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
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
                <el-table stripe border :data="pageData" v-loading="loadingData">
                    <el-table-column label="编号" prop="id" width="80px" />
                    <el-table-column label="报单日期" prop="fldDate" />
                    <el-table-column label="会员姓名" prop="fldCustomer" />
                    <el-table-column label="报单数量" prop="fldCount" />
                    <el-table-column label="补助单价" prop="fldPrice" />
                    <el-table-column label="补助金额" prop="fldTotalPrice" />
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
import {baseUrl, datePickerOptions} from '../../js/constants';

export default {
    name: 'Test',
    data () {
        return {
            pickerOptions1: datePickerOptions,
            list: [],
            currentPage: 1,
            pageSize: 10,
            form: {fldPrice: 59},
            customerSearch: "",
            editMode: "none",
            loadingData: true,
            rules: {
                fldDate: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                fldCustomer: [
                    { required: true, message: '请输入会员姓名', trigger: 'blur' }
                ],
                fldCount: [
                    { required: true, message: '请输入报单数量', trigger: 'blur' }
                ],
                fldPrice: [
                    { required: true, message: '请输入补助单价', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        loadSubsidyList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "subsidy/list",
                data: {},
                success: function(data) {
                    self.list = data.data;
                    self.calculateTotalPrice();
                    //self.pageData = data.data;
                    self.loadingData = false;
                }
            });
        },
        calculateTotalPrice() {
            var theList = this.list;
            for (var i = 0; i < theList.length; i++) {
                theList[i].fldTotalPrice = theList[i].fldCount * theList[i].fldPrice;
            }
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
            self.$refs["theForm"].validate((valid) => {
                if (valid) {
                    var url = baseUrl + "subsidy/add";
                    if (self.editMode == "update") {
                        url = baseUrl + "subsidy/update";
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
                                self.loadSubsidyList();
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
            this.$confirm('您确定要删除会员【' + data.fldCustomer + '】的报单吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: baseUrl + "subsidy/delete",
                    data: {subsidyId: data.id},
                    success: function(data) {
                        if (data.result == "suc") {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.loadingData = true;
                            self.loadSubsidyList();
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
            let list = this.list, {customerSearch} = this;
            if (customerSearch) {
                list = list.filter(i => ~i.fldCustomer.indexOf(customerSearch));
            }
            return list;
        },
        dialogFormVisible() {
            return this.editMode == 'add' || this.editMode == 'update';
        }
    },
    created() {
        this.loadSubsidyList();
    }
}
</script>

