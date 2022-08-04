<template>
  <div class="pageScale-menu">
    <div class="pageScale-menu_adjust pageScale-menu_item">调整尺寸</div>
    <div class="pageScale-menu_sub pageScale-menu_item" @click="addOrSubtract('subtract')">-</div>
    <div class="pageScale-menu_value pageScale-menu_item">{{ Math.round(scale * 100) }}%</div>
    <div class="pageScale-menu_add pageScale-menu_item" @click="addOrSubtract('add')">+</div>
    <div class="pageScale-menu_lineSwitch pageScale-menu_item" @click="scaleMenu.showSwitch = true">
      <div class="lineSwitch-wrapper" v-show="scaleMenu.showSwitch">
        <div class="triangle"></div>
        <div class="lineSwitch-item" @click.stop="lineSwitch('row')">横向参考线</div>
        <div class="lineSwitch-item" @click.stop="lineSwitch('col')">竖向参考线</div>
        <div class="lineSwitch-item" @click.stop="lineSwitch('clear')">清除参考线</div>
      </div>
      参考线
    </div>
    <div></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

defineProps<{
  scale: number
}>()

const emit = defineEmits(['changeScale'])

const scaleMenu = reactive({
  showSwitch: false,
  lineType: ''
})
const lineSwitch = (type: string) => {
  scaleMenu.showSwitch = false
  scaleMenu.lineType = type
}

const addOrSubtract = (type: 'add' | 'subtract') => {
  emit('changeScale', type)
}
</script>

<style lang="scss" scoped>
.pageScale-menu {
  bottom: 0;
  width: 338px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  bottom: 16px;
  box-sizing: border-box;
  height: 38px;
  left: 50%;
  padding: 0 20px;
  position: absolute;
  transform: translate(-50%);
  z-index: 10;
  font-size: 14px;
  color: white;
  display: flex;
  user-select: none;
  .pageScale-menu_adjust {
    width: 68px;
  }
  .pageScale-menu_sub {
    width: 32px;
    margin-left: 10px;
  }
  .pageScale-menu_value {
    width: 64px;
  }
  .pageScale-menu_add {
    width: 32px;
    margin-right: 10px;
  }
  .pageScale-menu_lineSwitch {
    width: 82px;
    position: relative;
    .lineSwitch-wrapper {
      background-color: rgba(0, 0, 0, 0.8);
      width: 100px;
      border-radius: 6px;
      bottom: 44px;
      left: 50%;
      padding: 12px 0;
      position: absolute;
      transform: translateX(-50%);
    }
    .triangle {
      border: 5px solid transparent;
      border-top-color: rgba(0, 0, 0, 0.8);
      bottom: -10px;
      height: 0;
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 0;
    }
    .lineSwitch-item {
      box-sizing: border-box;
      height: 27px;
      line-height: 27px;
      opacity: 0.8;
      //   padding: 0 20px;
      position: relative;
      text-align: center;
      width: 100%;
      &:hover {
        background-color: #000;
      }
    }
  }
  .pageScale-menu_item {
    line-height: 38px;
    height: 38px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #000;
    }
  }
  .btn-hover {
    background-color: #000;
  }
}
</style>
