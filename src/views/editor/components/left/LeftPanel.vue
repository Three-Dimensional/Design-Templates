<template>
  <menu class="leftPanel-menu">
    <li
      class="leftPanel-menu__li"
      :class="item.id == active.id ? 'active' : ''"
      v-for="item in itemList"
      :key="item.title"
      @click="handleClick(item)"
    >
      <span class="leftPanel-menu__img">
        <Icon :icon="item.iconName" />
      </span>
      <span class="leftPanel-menu__button">{{ item.title }}</span>
    </li>
  </menu>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'

interface propsType {
  handleChangeItem: Function
}
const props = defineProps<propsType>()

const active = ref({
  id: 1,
  type: 'case'
})
interface itemType {
  id: number
  type: string
  title: string
  iconName: string
}
const itemList = reactive<itemType[]>([
  { id: 1, title: '模板', type: 'case', iconName: 'zhinengjiqirenmoban' },
  { id: 2, title: '文字', type: 'text', iconName: 'bianjiwenzi' },
  { id: 3, title: '图片', type: 'image', iconName: 'tupian' },
  { id: 4, title: '素材', type: 'material', iconName: 'jihebiaoshi23' },
  { id: 5, title: '背景', type: 'background', iconName: 'beijing' },
  { id: 6, title: '工具', type: 'tool', iconName: 'gongjuxiang' },
  { id: 7, title: '上传', type: 'upload', iconName: 'shangchuan' }
])
// 切换左侧菜单
const handleClick = (item: itemType) => {
  active.value.id = item.id
  props.handleChangeItem(item)
}
onMounted(() => {
  props.handleChangeItem(itemList[active.value.id - 1])
})
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
  padding: 12px 24px 24px 24px;
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
  font-size: 24px;
  margin: 0 auto 6px;
}
</style>
