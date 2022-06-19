<template>
  <div class="nav-menu">
    <div class="nav-menu__btn" :class="item.id == active ? 'active' : ''" v-for="(item, index) in itemList" :key="index"
      @click="handleClick(item.id)"><span>{{ item.title }}</span></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const props = defineProps<{
  itemID: Number,
}>()

let active = ref(1)
interface itemType {
  id: number
  title: string
}
const itemList = reactive<itemType[]>([
  { id: 1, title: '推荐模板' },
  { id: 2, title: '我的模板' },
  { id: 3, title: '团队模板' },
])
const handleClick = (id: number) => {
  active.value = id
}

</script>
<style lang="scss" scoped>
.nav-menu {
  display: flex;
  height: 36px;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;
  width: 256px
}

.nav-menu:after {
  background: #eee;
  bottom: 0;
  box-shadow: 0 9px 14px rgba(0, 0, 0, .02);
  content: "";
  height: 1px;
  left: 0;
  position: absolute;
  width: 100%
}

.nav-menu__btn {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  float: left;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 85px
}

.nav-menu__btn span {
  color: #505a71;
  display: inline-block;
  font-size: 14px;
  text-align: center;
  width: 100%
}

.active:after {
  background: #0773fc;
  bottom: -1px;
  box-shadow: 0 4px 6px 0 rgba(7, 115, 252, .26);
  content: "";
  height: 3px;
  left: 28px;
  position: absolute;
  width: 30px;
  z-index: 1
}

.active span {
  color: #000;
  font-weight: 600
}
</style>
