<template>
  <div
    :class="['editor-box', isActive && 'active']"
    :style="propsToStyleString(props.defaultStyle, true)"
    @mousedown="handleMouseDown(props.comId, $event)"
    @mouseup="handleMouseup"
  >
    <div
      v-for="item in isActive ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handlePointMouseDown(item, $event)"
      @mouseup="handleMouseup"
    ></div>

    <div class="rotate" v-show="isActive">
      <Icon icon="weiraogoujianxuanzhuan" @mousedown="handleRotate"></Icon>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ComponentAllTypes } from '@/defaultProps'
import { propsToStyleString } from '@/hooks/useComponentCommon'
import { PickObjWithRequired } from '@/types/common'
import useEditorStore from '@/stores/editor'
import pointCursor from '@/config/editorConfig'
import { computedLocation, computedMatrixString } from '@/utils/computedComponentLocation'
import { recordSnapshot } from '@/hooks/useRecordSnapshot'

const store = useEditorStore()

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
const currentElement = computed(() => store.getCurrentElement)

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
    marginLeft: '-6px',
    marginTop: '-6px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: pointCursor[point]
  }

  return style
}
const handleMouseup = () => {
  recordSnapshot(store.$state)
}
// editBox拖动事件
const handleMouseDown = (comId: string, e: any) => {
  // 点击开始移动
  e.stopPropagation()
  store.setActive(comId)
  if (!currentElement.value) return
  const trf = currentElement.value!
  const trfArr: string[] = trf.style.transform!.trim().replace(/()/g, '').split(',')
  const matrixX = trfArr[trfArr.length - 2]
  const matrixY = trfArr[trfArr.length - 1]
  const startY = e.clientY
  const startX = e.clientX
  const move = (moveEvent: any) => {
    const currX = moveEvent.clientX - startX
    const currY = moveEvent.clientY - startY
    if (currentElement.value) {
      const newX = parseInt(matrixX, 10) + currX
      const newY = parseInt(matrixY, 10) + currY
      const str = computedMatrixString(newX, newY, trf.style.rotate ? -trf.style.rotate : 0)
      trf.style.left = newX
      trf.style.top = newY
      trf.style.transform = `matrix(${str})`
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

// 8个位置的点移动的事件
const handlePointMouseDown = (point: string, e: MouseEvent) => {
  console.log(e)
  e.stopPropagation()
  e.preventDefault()

  /**
   * 找到对称点
   * 条件：根据当前点击点(curPoint)和组件中心点(center)
   * 对称点 x: center.x + (center.x - curPoint.x)
   * 对称点 y: center.y + (center.y - curPoint.y)
   */

  if (!e.target) return

  const trf = currentElement.value!
  const trfArr: string[] = trf.style.transform!.trim().replace(/()/g, '').split(',')
  const matrixX = trfArr[trfArr.length - 2]
  const matrixY = trfArr[trfArr.length - 1]

  // 中心点
  const center = {
    x: parseInt(matrixX, 10) + trf.style.width / 2,
    y: parseInt(matrixY, 10) + trf.style.height / 2
  }

  const editorEl = document.querySelector('#canvas-area')!.getBoundingClientRect()

  const pointRect = (e.target as HTMLDivElement).getBoundingClientRect()
  const pointOffsetWidth = (e.target as HTMLDivElement).offsetWidth
  const pointOffsetHeight = (e.target as HTMLDivElement).offsetHeight

  // 当前点击的坐标
  const curPoint = {
    x: pointRect.left - editorEl.left + pointOffsetWidth / 2,
    y: pointRect.top - editorEl.top + pointOffsetHeight / 2
  }

  // 获取对称点的坐标
  const symmetricPoint = {
    x: center.x - (curPoint.x - center.x),
    y: center.y - (curPoint.y - center.y)
  }

  const oldRect = {
    width: trf.style.width,
    height: trf.style.height
  }

  // console.log(center)
  // console.log(symmetricPoint)

  const move = (moveEvent: any) => {
    const curPosition = {
      x: moveEvent.clientX - editorEl.left,
      y: moveEvent.clientY - editorEl.top
    }

    const position = computedLocation(
      point,
      curPosition,
      symmetricPoint,
      trf.style.rotate,
      curPoint,
      oldRect
    )
    // console.log(position)
    if (currentElement.value) {
      trf.style.width = position.width
      trf.style.height = position.height
      trf.style.left = position.left
      trf.style.top = position.top
      trf.style.transform = `matrix(${position.matrix})`
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

const handleRotate = (e: MouseEvent) => {
  console.log(e)
  e.stopPropagation()
  e.preventDefault()
  if (!e.target) return
  const editorEl = document.querySelector('#canvas-area')!.getBoundingClientRect()

  const pointRect = (e.target as HTMLDivElement).getBoundingClientRect()

  const { top, left, width, rotate } = currentElement.value!.style

  // 当前点击的坐标中心点
  const curPoint = {
    x: pointRect.left - editorEl.left + 20 / 2,
    y: pointRect.top - editorEl.top + 20 / 2
  }

  const topCenter = {
    x: (left || 0) + width / 2,
    y: top || 0
  }

  // 缓存老的角度
  const oldRotate = rotate || 0

  // 记录点击坐标点的角度
  const clickRotate =
    Math.atan2(curPoint.y - topCenter.y, curPoint.x - topCenter.x) / (Math.PI / 180)

  console.log(clickRotate)

  const move = (moveEvent: any) => {
    // 移动后的点
    const curPosition = {
      x: moveEvent.clientX - editorEl.left,
      y: moveEvent.clientY - editorEl.top
    }

    const newRotate =
      Math.atan2(curPosition.y - topCenter.y, curPosition.x - topCenter.x) / (Math.PI / 180)

    if (currentElement.value) {
      const setRotate = oldRotate + ((newRotate - clickRotate) % 360)
      console.log(`${newRotate} - ${clickRotate} = ${setRotate}`)
      const str = computedMatrixString(
        currentElement.value.style.left,
        currentElement.value.style.top,
        -setRotate
      )
      console.log(str)
      currentElement.value.style.rotate = setRotate
      currentElement.value.style.transform = `matrix(${str})`
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
  outline: 2px solid #3294ff;
  user-select: none;
  &:hover {
    cursor: move;
  }
}

.shape-point {
  position: absolute;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  width: 10px;
  height: 10px;
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
  bottom: -35px;
  left: 50%;
  margin-left: -5.5px;
  cursor: grab;
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
