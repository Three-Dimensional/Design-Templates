<template>
  <div class="homepage-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">模版设计</router-link>
        </div>
        <UserProfile></UserProfile>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer> © 测试数据11111111111111111111111111111111111111111111111111</a-layout-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserProfile from '../components/login/UserProfile.vue'

export default defineComponent({
  name: 'Index',
  components: {
    UserProfile
  }
})
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  color: #fff;
}
</style>
