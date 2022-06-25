<template>
  <aside class="canvas-area">
    <div
      v-for="com in componentList"
      :key="com.id"
      :detail="com"
      :id="com.id"
      class="editor-wrapper"
      :class="{ active: currentElement ? com.id === currentElement.id : false }"
      @click.stop="onItemClick(com.id)"
      @mousedown="handleMouseDown"
    >
      <LText v-bind="com.props" />
    </div>
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentData } from '@/store/editor'
import LText from '@/components/LText.vue'

const store = useStore<GlobalDataProps>()
const componentList = computed(() => store.state.editor.components)
const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)

const onItemClick = (id: string) => {
  store.commit('setActive', id)
}
const handleMouseDown = (e: any) => {
  // 点击开始移动
  e.stopPropagation()
  const startY = e.clientY
  const startX = e.clientX
  const move = (moveEvent: any) => {
    const currX = moveEvent.clientX - startX
    const currY = moveEvent.clientY - startY
    if (currentElement.value) {
      currentElement.value.props.transform = `matrix(1, 0, 0, 1, ${currX}, ${currY})`
    }
  }
  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  // 注册和取消移动事件
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>
<style lang="scss" scoped>
.canvas-area {
  width: 375px;
  min-height: 660px;
  border: 1px solid #efefef;
  background: #fff;
  max-height: 80vh;
  margin-top: 60px;
  position: relative;
}
.editor-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  &:hover {
    border: 1px dashed #ccc;
  }
}
.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>
