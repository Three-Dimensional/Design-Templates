<template>
  <div
    class="editor-wrapper"
    @mousedown="handleMouseDown"
    @click.capture.stop="onItemClick(id)"
    :class="{ active: active }"
  >
    {{ props.detail }}
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  id: string
  active: boolean
  detail: any
}>()
const emits = defineEmits(['on-item-click'])

const onItemClick = (id: string) => {
  emits('on-item-click', id)
}
const handleMouseDown = (e: any) => {
  // 点击开始移动
  e.stopPropagation()

  const move = (moveEvent: any) => {
    console.log(
      '%c 🍍 moveEvent: ',
      'font-size:20px;background-color: #7F2B82;color:#fff;',
      moveEvent
    )

    console.log(
      '%c 🥘 props.detail: ',
      'font-size:20px;background-color: #33A5FF;color:#fff;',
      props.detail.transform
    )
    //  const currX = moveEvent.clientX
    //  const currY = moveEvent.clientY
    //  pos.top = currY - startY + startTop
    //  pos.left = currX - startX + startLeft
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
