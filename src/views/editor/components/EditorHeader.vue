<template>
  <header class="base-header">
    <aside class="editor-header dfac">
      <img class="logo" src="../../../assets/svg/planet.svg" />
      <h2 class="header-title">海报编辑</h2>
      <Icon
        class="header-icon"
        :icon="'houtui'"
        v-if="snapshot.snapshotIndex > 0"
        @click="backOperation"
      />
      <Icon class="header-icon" v-else :icon="'houtui-01-copy'" />
      <Icon
        class="header-icon"
        v-if="snapshot.snapshotIndex < snapshot.snapshotData.length - 1"
        :icon="'qianjin'"
        @click="forwardOperation"
      />
      <Icon class="header-icon" v-else :icon="'qianjin-01'" />
    </aside>
  </header>
</template>
<script lang="ts" setup>
import { back, forward, snapshot } from '@/hooks/useRecordSnapshot'

const backOperation = () => {
  back()
}
const forwardOperation = () => {
  forward()
}
</script>
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
      margin: 0 24px;
      font-family: cursive;
    }
    .header-icon {
      width: 32px;
      height: 70px;
      margin-right: 16px;
      cursor: pointer;
    }
  }
}
</style>
