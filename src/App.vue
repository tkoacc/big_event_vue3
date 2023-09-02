<script setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<template>
  <div>
    <div>{{ userStore.token }}</div>
    <el-button @click="userStore.setToken('Bearer asdffghh')" type="success"
      >login</el-button
    >
    <el-button @click="userStore.removeToken()" type="danger">logout</el-button>
  </div>
</template>

<style scoped></style>
