<template>
  <div
    :class="['editor-box', isActive && 'active']"
    :style="`${propsToStyleString(props.defaultStyle, true)}`"
    @mousedown="handleMouseDown(props.comId, $event)"
  >
    <div
      v-for="item in isActive ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
    ></div>

    <div class="rotate" v-show="isActive">
      <Icon icon="weiraogoujianxuanzhuan"></Icon>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ComponentAllTypes, propsToStyleString } from '@/defaultProps'
import { PickObjWithRequired } from '@/types/common'
import { GlobalDataProps } from '@/store'
import { ComponentAllData } from '@/store/editor'

const store = useStore<GlobalDataProps>()

const props = withDefaults(
  defineProps<{
    comId: string
    defaultStyle: PickObjWithRequired<ComponentAllTypes, 'width' | 'height'>
  }>(),
  {
    comId: ''
  }
)

// 当前选中的组件
const currentElement = computed<ComponentAllData | null>(() => store.getters.getCurrentElement)

// 当前组件是否选中
const isActive = computed(() => {
  return currentElement.value?.id === props.comId
})

const pointList: string[] = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']

// 获取8个拖动点的位置样式
const getPointStyle = (point: string) => {
  const { width, height } = props.defaultStyle
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  const style = {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`
    // cursor: cursors[point]
  }

  return style
}

const handleMouseDown = (comId: string, e: any) => {
  // 点击开始移动
  e.stopPropagation()
  store.commit('setActive', comId)
  if (!currentElement.value) return
  const trf = currentElement.value!
  const trfArr: string[] = trf.props.transform!.trim().replace(/()/g, '').split(',')
  const matrixX = trfArr[trfArr.length - 2]
  const matrixY = trfArr[trfArr.length - 1]
  const startY = e.clientY
  const startX = e.clientX
  const move = (moveEvent: any) => {
    const currX = moveEvent.clientX - startX
    const currY = moveEvent.clientY - startY
    if (currentElement.value) {
      currentElement.value.props.transform = `matrix(1, 0, 0, 1, ${
        parseInt(matrixX, 10) + currX
      }, ${parseInt(matrixY, 10) + currY})`
    }
  }
  const up = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  // 注册和取消移动事件
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>
<style scoped lang="scss">
.editor-box {
  position: absolute;
  left: 0;
  top: 0;
  &:hover {
    cursor: move;
    outline: 1px solid #70c0ff;
  }
}

.editor-box.active {
  outline: 2px solid #70c0ff;
  user-select: none;
  &:hover {
    cursor: move;
  }
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.rotate {
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  position: absolute;
  text-align: center;
  top: 50px;
  left: 50%;
  margin-left: -5.5px;
}
.rotate .icon {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgb(24 49 81 / 10%);
  box-sizing: border-box;
  height: 20px;
  left: -5px;
  padding: 3px;
  position: absolute;
  top: -5px;
  width: 20px;
}
</style>
