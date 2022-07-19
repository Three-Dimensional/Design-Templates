<template>
  <aside class="text-header">
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
      class="text-item"
      draggable="true"
    >
      <LText :style="item" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import LText from '@/components/LText.vue'
import { componentsDefaultProps } from '@/defaultProps'
import { pushComponentCommon } from '@/hooks/useComponentCommon'
import { ComponentData } from '@/stores/interface'

const textDefaultProps = componentsDefaultProps['l-text'].props
// 模拟数据
const textPropsList: ComponentData[] = [
  {
    text: '点击添加文字标题',
    name: 'LText',
    tag: 'h1',
    id: uuidv4(),
    props: {
      fontSize: 24,
      fontWeight: 'bolder',
      fontFamily: 'cursive',
      height: 40,
      width: 200
    }
  },
  {
    text: '点击添加副标题',
    name: 'LText',
    tag: 'h2',
    id: uuidv4(),
    props: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'KaiTi',
      width: 200,
      height: 20
    }
  },
  {
    text: '正文内容',
    name: 'LText',
    tag: 'p',
    id: uuidv4(),
    props: {
      width: 200,
      height: 20
    }
  }
]

const textList: ComponentData[] = reactive(
  textPropsList.map((prop) => {
    return {
      name: prop.name,
      text: prop.text,
      tag: prop.tag,
      id: prop.id,
      props: {
        ...textDefaultProps,
        ...(prop.style as any)
      }
    }
  })
)

const onItemClick = (item: ComponentData) => {
  // 添加组件到画布
  pushComponentCommon(item)
}
</script>

<style scoped>
.text-header {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding: 60px 0 30px;
  border-bottom: 1px solid #e0e0e0;
}
.text-item {
  cursor: pointer;
  margin-bottom: 8px;
}
</style>
