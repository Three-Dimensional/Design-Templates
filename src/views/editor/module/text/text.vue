<template>
  <aside class="text-header">
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
      class="text-item"
      draggable="true"
    >
      <LText :style="item.props" :text="item.props.text"> </LText>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import LText from '@/components/LText.vue'
import { componentsDefaultProps } from '@/defaultProps'
import useEditorStore from '@/stores/editor'

const store = useEditorStore()

interface CreateComponentType {
  name: string
  text?: string
  type?: string
  id?: string
  props: { [key: string]: string }
}

const textDefaultProps = componentsDefaultProps['l-text'].props
const textPropsList = [
  {
    text: '点击添加文字标题',
    fontSize: '24',
    fontWeight: 'bolder',
    fontFamily: 'cursive',
    tag: 'h1',
    height: '40',
    width: '100'
  },
  {
    text: '点击添加副标题',
    fontSize: '16',
    fontWeight: 'bold',
    fontFamily: 'KaiTi',
    tag: 'h2'
  },
  {
    text: '正文内容',
    fontSize: '14',
    tag: 'p'
  }
]

const textList: CreateComponentType[] = textPropsList.map((prop) => {
  return {
    name: 'LText',
    text: '测试',
    props: {
      ...textDefaultProps,
      ...(prop as any)
    }
  }
})
const onItemClick = (item: CreateComponentType) => {
  const target = JSON.parse(JSON.stringify(item))
  target.id = new Date().getTime().toString()
  store.components.push(target)
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
