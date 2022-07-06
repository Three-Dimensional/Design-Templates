<template>
  <a-button type="primary" v-if="!isLogin" class="user-profile-component" @click="login">
    登录
  </a-button>
  <div v-else>
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ userName }}</router-link>
      <template #overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user'

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const store = useUserStore()
    const router = useRouter()

    const isLogin = computed(() => store.isLogin)
    const userName = computed(() => store.userName)
    const login = () => {
      store.login()
      message.success('登录成功！', 2)
    }
    const logout = () => {
      store.logout()
      message.success('退出登录成功，2秒后跳转到首页', 2)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }

    return {
      isLogin,
      userName,
      login,
      logout
    }
  }
})
</script>

<style>
.user-profile-dropdown {
  border-radius: 2px !important;
}
.user-operation > * {
  margin-left: 30px !important;
}
</style>
