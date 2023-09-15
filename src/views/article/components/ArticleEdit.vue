<script setup>
import { artPublishService } from '@/api/article'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { ref } from 'vue'
// control the drawer
const visibleDrawer = ref(false)
// default form
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
// drawer content data
const formModel = ref({
  ...defaultForm
})
// upload image
const imageUrl = ref('')
const onSelectFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // save the image
  formModel.value.cover_img = uploadFile.raw
}
// submit
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  // store the publish status in 'formModel'
  formModel.value.state = state
  const fd = new FormData()
  for (const key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  // send request
  if (formModel.value.id) {
    // edit
    console.log('edit')
  } else {
    // add
    await artPublishService(fd)
    ElMessage.success('publish success')
    visibleDrawer.value = false
    // notify the parent component of successful addition
    emit('success', 'add')
  }
}
const editorRef = ref()
const open = (row) => {
  // display the drawer
  visibleDrawer.value = true
  if (row.id) {
    // Send a request based on 'row.id' to retrieve data for editing functionality
    // Use the retrieved data to populate the form for editing
    console.log(row)
  } else {
    // reset formModel.value to default value
    formModel.value = { ...defaultForm }
    // reset the image URL to empty
    imageUrl.value = ''
    // Clear the content of the quill-editor
    editorRef.value.setHTML('')
  }
}
defineExpose({ open })
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- disable automatic uploads in element plus -->
        <!-- no need to configure the 'action' params -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
