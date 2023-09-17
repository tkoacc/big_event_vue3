<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
// 基于store的数据，初始化imgUrl的值
import { useUserStore } from '@/stores'
import { userUpdateAvatarService } from '@/api/user'
const userStore = useUserStore()
const imageUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onSelectFile = (uploadFile) => {
  // 基于FileReader读取图片做预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  await userUpdateAvatarService(imageUrl.value)
  await userStore.getUser()
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="change avatar">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      :icon="Plus"
      size="large"
      >choose a new avatar</el-button
    >
    <el-button @click="onUpdateAvatar" :icon="Upload" size="large"
      >upload a new avatar</el-button
    >
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      margin-bottom: 20px;
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
