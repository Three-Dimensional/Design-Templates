<template>
  <menu class="leftPanel-menu">
    <li
      class="leftPanel-menu__li"
      :class="item.id == active ? 'active' : ''"
      v-for="item in itemList"
      :key="item.title"
      @click="handleClick(item)"
    >
      <img class="leftPanel-menu__img" :src="item.iconUrl" alt="" />
      <span class="leftPanel-menu__button">{{ item.title }}</span>
    </li>
  </menu>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import templateUrl from '../../../assets/svg/menu.svg'

interface propsType {
  handleChangeItem: Function
}
const props = defineProps<propsType>()

const active = ref(1)
interface itemType {
  id: number
  type: string
  title: string
  iconUrl: string
}
const itemList = reactive<itemType[]>([
  { id: 1, title: '模板', type: 'template', iconUrl: templateUrl },
  { id: 2, title: '图片', type: 'image', iconUrl: templateUrl },
  { id: 3, title: '素材', type: 'material', iconUrl: templateUrl },
  { id: 4, title: '文字', type: 'text', iconUrl: templateUrl },
  { id: 5, title: '背景', type: 'background', iconUrl: templateUrl },
  { id: 6, title: '工具', type: 'tool', iconUrl: templateUrl },
  { id: 7, title: '上传', type: 'upload', iconUrl: templateUrl }
])
// 切换左侧菜单
const handleClick = (item: itemType) => {
  active.value = item.id
  props.handleChangeItem(item)
}
</script>
<style lang="scss" scoped>
.leftPanel-menu {
  background-color: #f1f2f8;
  box-sizing: border-box;
  height: 100vh;
  width: 72px;
}
.leftPanel-menu__li {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  height: 80px;
  box-sizing: border-box;
}

.active {
  background: #fff;
}
.leftPanel-menu__button {
  color: #000;
  cursor: pointer;
  text-align: center;
  width: 72px;
}

.leftPanel-menu__img {
  width: 24px;
  height: 24px;
  margin: 0 auto 6px;
}
</style>
