<template>
  <aside class="text-wrap">
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
      class="component-item"
    >
      <LText :style="item.props" :text="item.props.text"> </LText>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import LText from '@/components/LText.vue'
import { componentsDefaultProps } from '@/defaultProps'

interface CreateComponentType {
  name: string
  text?: string
  type?: string
  props: { [key: string]: string }
}

const textDefaultProps = componentsDefaultProps['l-text'].props
const textPropsList = [
  {
    text: '大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: '"cursive"',
    tag: 'h1'
  }
  // {
  //   text: '楷体副标题',
  //   fontSize: '20px',
  //   fontWeight: 'bold',
  //   fontFamily: '"KaiTi,STKaiti"',
  //   tag: 'h2'
  // },
  // {
  //   text: '正文内容',
  //   tag: 'p'
  // }
]

const textList: CreateComponentType[] = textPropsList.map((prop) => {
  return {
    name: 'l-text',
    props: {
      ...textDefaultProps,
      ...(prop as any)
    }
  }
})
const onItemClick = (item: CreateComponentType) => {
  console.log(item)
}
</script>

<style scoped>
.component-item {
  height: 24px;
}

.text-wrap {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  /* padding-top: 30px; */
}
</style>
