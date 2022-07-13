<template>
  <div class="size-child" v-if="visible">
    <ul class="list">
      <li v-for="item in fontSize" :key="item" @click.stop="chooseFontSize(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fontSize } from '@/config/toolBarConfig'

defineProps<{
  visible: boolean
  size: number
}>()

const emit = defineEmits(['update:visible', 'update:size'])

const chooseFontSize = (size: number) => {
  emit('update:size', size)
  emit('update:visible', false)
}
</script>
<style scoped lang="scss">
.size-child {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 9px 28px 8px rgb(42 49 67 / 6%), 0 3px 6px -4px rgb(42 49 67 / 11%),
    0 6px 16px 0 rgb(42 49 67 / 8%);
  box-sizing: border-box;
  left: 3.5px;
  overflow: hidden;
  position: absolute;
  top: 44px;
  z-index: 1;
  .list {
    height: 400px;
    overflow-y: scroll;
    padding: 4px 0;
    width: 64px;
    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(27, 35, 55, 0.3);
      border-radius: 3px;
      height: 158px;
    }
  }
  li {
    color: #1b2337;
    cursor: pointer;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    &:hover {
      background-color: #f3f4f9;
    }
    &:not(:last-child) {
      margin-bottom: 1px;
    }
  }
}
</style>
