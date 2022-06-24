<template>
  <div class="editor-box">
    <div
      v-for="item in props.active ? pointList : []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
    ></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
interface StyleObj {
  width: number
  height: number
}
const props = withDefaults(
  defineProps<{
    active: boolean
    defaultStyle: StyleObj
  }>(),
  {
    active: false,
    defaultStyle: () => {
      return { width: 0, height: 0 }
    }
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
}
</style>
