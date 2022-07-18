<template>
  <aside class="text-header">
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
      class="text-item"
      draggable="true"
    >
      <LText :style="item.props" :text="item.text" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import LText from '@/components/LText.vue'
import { componentsDefaultProps, ComponentAllTypes } from '@/defaultProps'
import { pushComponentCommon } from '@/hooks/useComponentCommon'

interface CreateComponentType {
  text: string
  props: ComponentAllTypes
  name: string
  tag: string
  id?: string
}
const textDefaultProps = componentsDefaultProps['l-text'].props
// 模拟数据
const textPropsList: CreateComponentType[] = [
  {
    text: '点击添加文字标题',
    name: 'LText',
    tag: 'h1',
    props: {
      fontSize: 24,
      fontWeight: 'bolder',
      fontFamily: 'cursive',
      height: 40,
      lineHeight: 2
    }
  },
  {
    text: '点击添加副标题',
    name: 'LText',
    tag: 'h2',
    props: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'KaiTi',
      lineHeight: 2
    }
  },
  {
    text: '正文内容',
    name: 'LText',
    tag: 'p',
    props: {
      lineHeight: 2
    }
  }
]

const textList: CreateComponentType[] = reactive(
  textPropsList.map((prop) => {
    return {
      name: prop.name,
      text: prop.text,
      tag: prop.tag,
      props: {
        ...textDefaultProps,
        ...(prop.props as any)
      }
    }
  })
)

const onItemClick = (item: CreateComponentType) => {
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
}
</style>
