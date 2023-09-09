<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService } from '../../api/article'
import ChannelEdit from './components/ChannelEdit.vue'
const channelList = ref([])
const loading = ref(false)
const dialog = ref()
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()
const onDeleteChannel = (row, $index) => {
  console.log(row, $index)
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加</el-button>
    </template>
    <el-table v-loading="loading" :data="channelList">
      <el-table-column
        type="index"
        label="number"
        width="100"
      ></el-table-column>
      <el-table-column prop="cate_name" label="name"></el-table-column>
      <el-table-column prop="cate_alias" label="cate"></el-table-column>
      <el-table-column label="operation" width="100">
        <template #default="{ row, $index }">
          <el-button
            :icon="Edit"
            circle
            type="danger"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            type="danger"
            @click="onDeleteChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="no data"></el-empty>
      </template>
    </el-table>
    <channel-edit ref="dialog"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  border-radius: 5px;
  .el-button {
    background-color: #8a2763;
    border: none;
  }
}
</style>
