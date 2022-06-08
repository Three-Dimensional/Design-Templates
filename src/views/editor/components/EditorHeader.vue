<template>
  <header class="base-header">
    <header class="editor-header">头部组件</header>
  </header>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.base-header {
  height: 70px;
  .editor-header {
    height: 70px;
    background-color: #fff;
    box-shadow: 0 10px 10px 0 rgba(0, 35, 78, 4%);
    box-sizing: border-box;
    width: 100%;
    position: fixed;
  }
}
</style>
