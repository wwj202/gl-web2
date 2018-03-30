<template>
        <el-main>
            <el-card>
                <div slot="header">
                    <span>产品销售排名</span>
                </div>
                <el-table stripe border :data="pageData" v-loading="loadingData">
                    <el-table-column label="排名" type="index" width="80px" />
                    <el-table-column label="产品ID" prop="fldProduct" width="80px" />
                    <el-table-column label="产品名称" prop="fldName" />
                    <el-table-column label="产品系列" prop="fldSeriesName" />
                    <el-table-column label="产品规格" prop="fldSpec" />
                    <el-table-column label="销售数量" prop="fldSellCount" />
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
        loadProductRankingList() {
            var self = this;
            $.ajax({
                type: "GET",
                dataType: "json",
                url: baseUrl + "stat/sellRanking",
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
        this.loadProductRankingList();
    }
}
</script>

