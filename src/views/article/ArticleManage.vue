<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatDate } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const articleList = ref([])
const total = ref(0)
const loading = ref(false)
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// retrieve article list based on params
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// search function
const onSearch = () => {
  // reset table
  params.value.pagenum = 1
  getArticleList()
}
// reset function
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const articleEditRef = ref()
// add function
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// edit function
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// callback function for successful add or edit
const onSuccess = (type) => {
  if (type === 'add') {
    // render the last page
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // update the last page
    params.value.pagenum = lastPage
  }
  getArticleList()
}
// delete function
const onDeleteArticle = (row) => {
  console.log(row)
}
// pagination handle
const handleSizeChange = (val) => {
  // reset to the first page and recalculate page count when 'size-change' occurs
  // using the new 'size' value to render updated table data
  params.value.pagenum = 1
  params.value.pagesize = val
  getArticleList()
}
const handleCurrentChange = (val) => {
  params.value.pagenum = val
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle">添加</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="article category:">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <!-- Mark the article's publication status in the backend: 'published' or 'draft'. -->
      <el-form-item label="publish status:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"> </el-option>
          <el-option label="草稿" value="草稿"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch">search</el-button>
        <el-button @click="onReset">reset</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="article title" prop="title">
        <template #default="{ row }">
          <el-link :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="category" prop="cate_name"></el-table-column>
      <el-table-column label="publication date" prop="pub_date">
        <template #default="{ row }">
          {{ formatDate(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="status" prop="state"></el-table-column>
      <!-- use the scoped slot 'row' to access the current data -->
      <!-- it is equivalent to iterating through 'item' using 'v-for' -->
      <el-table-column label="operation">
        <template #default="{ row }">
          <el-button
            circle
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="background"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- drawer -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  border-radius: 5px;
  .el-button {
    background-color: #8a2763;
    border: none;
    color: #fff;
  }
}
.el-pagination {
  margin-top: 30px;
  justify-content: center;
}
</style>
