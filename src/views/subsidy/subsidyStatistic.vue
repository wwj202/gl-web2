<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>报单补助统计</span>
                </div>
                <!-- <el-row style="margin-bottom: 10px">
                    <span style="margin-right: 20px">查询条件：</span>
                    <el-input style="width: 200px" clearable placeholder="请输入会员姓名" v-model="customerSearch" size="mini" />
                </el-row> -->
                <el-table stripe border :data="pageData" v-loading="loadingData">
                    <el-table-column label="序号" prop="id" width="80px" />
                    <el-table-column label="报单月份" prop="fldDate" />
                    <el-table-column label="报单总数" prop="fldCount" />
                    <!-- <el-table-column label="补助单价" prop="fldPrice" /> -->
                    <el-table-column label="补助总金额" prop="fldTotalPrice" />
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
import {baseUrl} from '../../js/constants';

export default {
    name: 'Test',
    data () {
        return {
            list: [],
            currentPage: 1,
            pageSize: 10,
            loadingData: true
        }
    },
    methods: {
        loadSubsidyList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "subsidy/stat",
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
        }
    },
    computed: {
        pageData() {
            let {currentPage, pageSize, list} = this;
            return this.list.slice(
                (currentPage - 1) * pageSize, currentPage * pageSize
            );
        }
    },
    created() {
        this.loadSubsidyList();
    }
}
</script>

