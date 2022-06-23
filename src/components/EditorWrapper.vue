<template>
  <div
    draggable="true"
    class="editor-wrapper"
    @click.capture.stop="onItemClick(id)"
    :class="{ active: active }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  id: string
  active: boolean
}>()

const emits = defineEmits<{
  (e: 'on-item-click', id: string): void
}>()

const onItemClick = (id: string) => {
  emits('on-item-click', id)
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
