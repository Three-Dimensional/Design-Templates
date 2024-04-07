<template>
  <!-- hover 悬浮提示组件 -->
  <aside class="hover-tips tools-item">
    <slot></slot>
    <span class="tips-text">{{ props.title }}</span>
  </aside>
</template>

<script lang="ts" setup>
// 组件选项
const props = defineProps<{
  title: String
}>()

// eslint-disable-next-line vue/no-export-in-script-setup
</script>

<style lang="scss">
.tools-item {
  display: flex;
  border-radius: 4px;
  padding: 8px;
  margin: 0 5px;
  align-items: center;
  position: relative;
}

.hover-tips {
  position: relative;
  &:hover {
    background: #f3f4f9;
    .tips-text {
      visibility: initial;
    }
  }
  &.selected {
    background: #f3f4f9;
  }

  .tips-text {
    background-color: #000;
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
    color: #fff;
    font-size: 12px;
    left: 50%;
    line-height: 12px;
    padding: 4px 8px;
    position: absolute;
    top: 49px;
    transform: translateX(-50%);
    visibility: hidden;
    white-space: pre;
    z-index: 1;
    &::after {
      border: 4px solid transparent;
      border-bottom-color: #000;
      bottom: 100%;
      content: '';
      left: 50%;
      margin-left: -4px;
      position: absolute;
    }
  }
}
</style>
