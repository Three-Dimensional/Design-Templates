<template>
  <div
    :class="['editor-box', props.active && 'active']"
    :style="`${propsToStyleString(props.defaultStyle, true)}`"
  >
    <div
      v-for="item in props.active ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
    ></div>

    <div class="rotate" v-show="props.active">
      <Icon icon="weiraogoujianxuanzhuan"></Icon>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ComponentAllTypes, propsToStyleString } from '@/defaultProps'
import { PickObjWithRequired } from '@/types/common'

const props = withDefaults(
  defineProps<{
    active: boolean
    defaultStyle: PickObjWithRequired<ComponentAllTypes, 'width' | 'height'>
  }>(),
  {
    active: false
  }
)

const pointList: string[] = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']

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
    // cursor: this.cursors[point]
  }

  return style
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
  border: 2px solid #70c0ff;
  user-select: none;
  &:hover {
    cursor: move;
    outline: none;
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
  height: 23px;
  left: -5px;
  padding: 5px;
  position: absolute;
  top: -5px;
  width: 23px;
}
</style>
