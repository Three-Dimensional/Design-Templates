<template>
  <textMenu v-if="activeItem?.type === 'text'"></textMenu>
  <template v-else>
    <div class="panel">
      <div class="nav-menu">
        <div
          class="nav-menu__btn"
          :class="item.id == active ? 'active' : ''"
          v-for="(item, index) in itemList"
          :key="index"
          @click="handleClick(item.id, index)"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
      <TemplateContent :activeModule="`${activeItem.type}-${activeType}`"></TemplateContent>
    </div>
  </template>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import textMenu from './textMenu.vue'
import TemplateContent from '@/components/TemplateContent.vue'

interface itemType {
  id: number
  title: string
  type?: string
  iconUrl?: string
}

defineProps<{
  activeItem: itemType
}>()

const active = ref(1)
const activeType = ref('recommend')

const itemList = reactive<itemType[]>([
  { id: 1, title: '推荐', type: 'recommend' },
  { id: 2, title: '我的', type: 'my' }
])
const handleClick = (id: number, index: number) => {
  active.value = id
  activeType.value = (itemList[index] as any).type
}
</script>
<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.nav-menu {
  display: flex;
  height: 36px;
  justify-content: space-around;
  margin: 0 auto;
  position: relative;
  width: 256px;
}

.nav-menu:after {
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
</style>
