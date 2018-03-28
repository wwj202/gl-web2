<template>
    <el-tabs type="border-card">
        <el-tab-pane label="报单列表"><list /></el-tab-pane>
        <el-tab-pane label="报单统计"><stat /></el-tab-pane>
    </el-tabs>
</template>

<script>
import List from './subsidyList.vue'
import Stat from './subsidyStatistic.vue'
export default {
    components: {
        List,
        Stat
    }
}
</script>