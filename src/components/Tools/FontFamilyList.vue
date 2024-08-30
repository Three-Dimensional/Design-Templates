<template>
  <div class="family-child">
    <ul class="list">
      <li
        v-for="item in fontFamilyArr"
        :key="item.text"
        :style="{ fontFamily: item.value }"
        @click="chooseFamily(item.value)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { fontFamilyArr } from '@/config/toolBarConfig'

defineProps({
  chooseFamily: {
    type: Function,
    required: true
  }
})
</script>

<style scoped lang="scss">
.family-child {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 9px 28px 8px rgb(42 49 67 / 6%), 0 3px 6px -4px rgb(42 49 67 / 11%),
    0 6px 16px 0 rgb(42 49 67 / 8%);
  box-sizing: border-box;
  z-index: 1;
  top: 50px;
  left: 52px;
  overflow: hidden;
  position: absolute;
  .list {
    height: 200px;
    overflow-y: scroll;
    padding: 4px 0;
    width: 140px;
    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(27, 35, 55, 0.3);
      border-radius: 3px;
      height: 100px;
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
}
</style>
