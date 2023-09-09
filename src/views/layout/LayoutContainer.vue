<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  HomeFilled
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.jpg'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
onMounted(() => {
  userStore.getUser()
})
const handleCommand = async (command) => {
  if (command === 'logout') {
    // 退出通知
    await ElMessageBox.confirm('Are you sure to logout?', 'logout', {
      type: 'warning',
      confirmButtonText: 'confirm',
      cancelButtonText: 'cancel'
    })
    // 清除本地数据 清空token&&userInfo
    userStore.removeToken()
    userStore.setUser({})
    // logout
    router.push('/login')
  } else {
    // redirect
    router.push(`/user/${command}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="350px">
      <el-menu
        active-text-color="#8a2763"
        text-color="#43194a"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/login">
          <el-icon><HomeFilled /></el-icon>
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
    </el-aside>
    <el-container>
      <el-header>
        <div>
          star rail:<strong>{{
            userStore.user.nickname || userStore.user.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- 折叠的下拉部分 -->
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
    background-color: rgba(255, 255, 255, 0.5);
    background-image: url('@/assets/logo4.jpg');
    background-size: cover; // 根据需要调整
    background-repeat: no-repeat;

    // 针对 Webkit 浏览器 (如 Chrome 和 Safari)
    &::-webkit-scrollbar {
      width: 0;
    }
    &__logo_1 {
      height: 650px;
      background: url('@/assets/logo4.jpg') no-repeat center top / cover;
    }
    .el-menu {
      height: 100%;
      border-right: none;
      background-color: rgba(255, 255, 255, 0.5); // 半透明的白色

      .el-menu-item:hover {
        background-color: rgba(222, 180, 226, 0.6);
      }
      ::v-deep .el-sub-menu__title:hover {
        background-color: rgba(222, 180, 226, 0.6);
      }
      ::v-deep .el-menu--inline {
        background-color: rgba(255, 255, 255, 0.2); // 半透明的白色
      }
    }
  }
  .el-header {
    background-color: rgba(222, 180, 226, 0.2);
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
    background-color: rgba(222, 180, 226, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
