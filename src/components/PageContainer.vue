<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 定制按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 定制内容 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.5);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
