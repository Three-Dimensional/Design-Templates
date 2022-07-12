<template>
  <div class="work-detail-container">
    <a-row type="flex" justify="center" v-if="templateItem">
      <a-col :span="8" class="cover-img">
        <img :src="templateItem.coverImg" alt="" />
      </a-col>
      <a-col :span="8">
        <h2>{{ templateItem.title }}</h2>
        <p>{{ templateItem.title }}</p>
        <div class="author">
          <a-avatar>V</a-avatar>
          该模版由 <b>{{ templateItem.author }}</b> 创作
        </div>
        <div class="bar-code-area">
          <span>扫一扫，手机预览</span>
          <div ref="container"></div>
        </div>
        <div class="use-button">
          <router-link to="/editor">
            <a-button type="primary" size="large"> 使用模版 </a-button>
          </router-link>
          <a-button size="large"> 下载图片海报 </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useTemplatetore from '@/stores/templates'

const route = useRoute()
const store = useTemplatetore()
const currentId = route.params.id as string
const templateItem = computed(() => store.getTemplateById(parseInt(currentId, 10)))
</script>

<style scoped>
.work-detail-container {
  margin-top: 50px;
}
.cover-img {
  margin-right: 30px;
}
.cover-img img {
  width: 100%;
}
.use-button {
  margin: 30px 0;
}
.ant-avatar {
  margin-right: 10px;
}
.bar-code-area {
  margin: 20px 0;
}
</style>
