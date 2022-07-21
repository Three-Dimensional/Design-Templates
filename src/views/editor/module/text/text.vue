<template>
  <aside class="text-header">
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
      class="text-item"
      draggable="true"
    >
      <LText :style="item" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import LText from '@/components/LText.vue'
import { pushComponentCommon } from '@/hooks/useComponentCommon'
import { ComponentData } from '@/stores/interface'
import { textList } from './text'

const onItemClick = (item: ComponentData) => {
  // 添加组件到画布
  pushComponentCommon(item)
}
</script>

<style scoped>
.text-header {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding: 60px 0 30px;
  border-bottom: 1px solid #e0e0e0;
}
.text-item {
  cursor: pointer;
  margin-bottom: 8px;
}
</style>
