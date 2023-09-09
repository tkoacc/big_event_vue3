<script setup>
import { userRegisterService, userLoginService } from '@/api/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(false)
const form = ref()
// declare reactive state to store user form data
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// validation rules for the form
// non-empty validation
// length validation
// regular expression validation
// custom validation
const rules = {
  username: [
    {
      required: true,
      message: 'please input username',
      trigger: ['blur', 'change']
    },
    {
      min: 1,
      max: 10,
      message: 'username length should be between 1 and 10',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: 'please input password',
      trigger: ['blur', 'change']
    },
    {
      pattern: /^\S{6,15}$/,
      message: 'password length should be between 6 and 15'
    }
  ],
  repassword: [
    {
      required: true,
      message: 'please input password again'
    },
    {
      pattern: /^\S{6,15}$/,
      message: 'password length should be between 6 and 15'
    },
    {
      validator: (rule, value, callback) => {
        // check if the 'value' matches the currently filled password in the form
        if (value !== formModel.value.password) {
          callback(new Error('the passwords entered do not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  //conduct validation before proceeding with registration
  // upon success, send a request to the server
  // if fail, show error
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('Successfully registered!')
  isRegister.value = false
}
const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('Successfully logged in!')
  router.push('/')
}
// Reset content when switching forms
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- registration form -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>register</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="please input username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="please input password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="please input password again"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            register
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← login
          </el-link>
        </el-form-item>
      </el-form>
      <!-- login form -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>login</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="please input username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="please input password"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>remember me</el-checkbox>
            <el-link type="primary" :underline="false">forget password</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >login</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            register →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  color: #8a2763;
  height: 100vh;
  background-color: rgba(217, 159, 223, 0.3);
  .bg {
    background: url('@/assets/login_bg1.jpg') no-repeat center -70px / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
      background-color: #8a2763;
      border: none;
      color: #f0e2f5;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .el-link {
      color: #8a2763;
    }
  }
}
</style>
