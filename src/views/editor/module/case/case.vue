<template>
  <div class="nav-menu">
    <div
      class="nav-menu__btn"
      :class="item.id == active ? 'active' : ''"
      v-for="(item, index) in itemList"
      :key="index"
      @click="handleClick(item.id)"
    >
      <span>{{ item.title }}</span>
    </div>
  </div>
  <aside class="template">
    <img class="template-img" v-for="(url, index) in urls" :src="url" :key="index" />
  </aside>
</template>

<script lang="ts" setup>
import { shallowRef, reactive, ref } from 'vue'
import imageUrls from '@/mock/mock'

const urls = shallowRef(imageUrls)
const active = ref(1)

interface itemType {
  id: number
  title: string
  type?: string
  iconUrl?: string
}

const itemList = reactive<itemType[]>([
  { id: 1, title: '推荐', type: 'recommend' },
  { id: 2, title: '我的', type: 'my' }
])
const handleClick = (id: number) => {
  active.value = id
}
</script>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  justify-content: space-around;
  margin: 16px auto 8px;
  position: relative;
  width: 256px;

  &:after {
    background: #eee;
    bottom: 0;
    box-shadow: 0 9px 14px rgba(0, 0, 0, 0.02);
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  .nav-menu__btn {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    float: left;
    height: 100%;
    justify-content: center;
    position: relative;
    width: 85px;
  }

  .nav-menu__btn span {
    color: #505a71;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    width: 100%;
  }
  .active:after {
    background: #0773fc;
    bottom: -1px;
    box-shadow: 0 4px 6px 0 rgba(7, 115, 252, 0.26);
    content: '';
    height: 3px;
    left: 28px;
    position: absolute;
    width: 30px;
    z-index: 1;
  }

  .active span {
    color: #000;
    font-weight: 600;
  }
}
.template {
  display: flex;
  margin-top: 8px;
  flex-wrap: wrap;
  overflow: scroll;
  width: 100%;

  .template-img {
    width: 50%;
    flex: 1;
    margin: 4px;
    box-sizing: content-box;
    break-inside: avoid;
  }

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  & {
    -ms-overflow-style: none;
  }

  & {
    overflow: -moz-scrollbars-none;
  }
}
</style>
