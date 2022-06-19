<template>
  <header class="base-header">
    <aside class="editor-header dfac">
      <img class="logo" src="../../../assets/svg/planet.svg" />
      <h2 class="header-title">海报编辑</h2>
    </aside>
  </header>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.base-header {
  height: 70px;
  .editor-header {
    height: 70px;
    padding: 0 16px;
    background-color: #fff;
    box-shadow: 0 10px 10px 0 rgba(0, 35, 78, 4%);
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    z-index: 2;

    .logo {
      width: 50px;
      height: 50px;
    }

    .header-title {
      margin-left: 16px;
      font-family: cursive;
    }
  }
}
</style>
