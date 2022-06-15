<template>
  <menu class="leftPanel-menu">
    <li
      class="leftPanel-menu__li"
      :class="item.id == active ? 'active' : ''"
      v-for="item in itemList"
      :key="item.title"
      @click="handleClick(item.id)"
    >
      <img class="leftPanel-menu__img" :src="item.iconUrl" alt="" />
      <span class="leftPanel-menu__button">{{ item.title }}</span>
    </li>
  </menu>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import templateUrl from 'assets/svg/menu.svg'

const props = defineProps({
  handleChangeItemID: {
    default: Function,
  },
})
let active = ref(1)
interface itemType {
  id: number
  title: string
  iconUrl: string
}
const itemList = reactive<itemType[]>([
  { id: 1, title: '模板', iconUrl: templateUrl },
  { id: 2, title: '图片', iconUrl: templateUrl },
  { id: 3, title: '素材', iconUrl: templateUrl },
  { id: 4, title: '文字', iconUrl: templateUrl },
  { id: 5, title: '背景', iconUrl: templateUrl },
  { id: 6, title: '工具', iconUrl: templateUrl },
  { id: 7, title: '上传', iconUrl: templateUrl },
])
// 切换左侧菜单
const handleClick = (id: number) => {
  active.value = id
  props.handleChangeItemID(active)
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
