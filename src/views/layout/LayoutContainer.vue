<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.jpg'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="300px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#8a2763"
        background-color="#c9acd2"
        :default-active="$route.path"
        text-color="#43194a"
        router
      >
        <el-menu-item index="/login">
          <el-icon><Management /></el-icon>
          <span>login</span>
        </el-menu-item>
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>article channel</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>article manage</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>user center</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>base info</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>change avatar</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>reset password</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
      <div class="el-aside__logo_1"></div>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          star rail:<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
                >base info</el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
                >change avatar</el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
                >reset password</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>love kafka mom ©2023 Created by kafka</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #ddc5e4;
    &__logo {
      height: 150px;
      background: url('@/assets/logo3.png') no-repeat center / cover;
    }
    &__logo_1 {
      height: 500px;
      background: url('@/assets/logo4.jpg') no-repeat center top / cover;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-main {
    background: url('@/assets/logo1.jpg') no-repeat center / cover;
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
