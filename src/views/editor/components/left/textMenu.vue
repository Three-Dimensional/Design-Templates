<template>
  <div class="text-wrap">
    <div
      v-for="(item, index) in textList"
      :key="index"
      @click="onItemClick(item)"
      class="component-item"
    >
      <div class="component-wrapper">
        <l-text v-bind="item.props" class="inside-component" />

        <span v-if="item.text" class="tip-text">{{ item.text }}</span>
      </div>
    </div>
  </div>
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
    tag: 'h2'
  },
  {
    text: '楷体副标题',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: '"KaiTi","STKaiti"',
    tag: 'h2'
  },
  {
    text: '正文内容',
    tag: 'p'
  },
  {
    text: '宋体正文内容',
    tag: 'p',
    fontFamily: '"SimSun","STSong"'
  },
  {
    text: 'Arial style',
    tag: 'p',
    fontFamily: '"Arial", sans-serif'
  },
  {
    text: 'Comic Sans',
    tag: 'p',
    fontFamily: '"Comic Sans MS"'
  },
  {
    text: 'Courier New',
    tag: 'p',
    fontFamily: '"Courier New", monospace'
  },
  {
    text: 'Times New Roman',
    tag: 'p',
    fontFamily: '"Times New Roman", serif'
  },
  {
    text: '链接内容',
    color: '#1890ff',
    textDecoration: 'underline',
    tag: 'p'
  },
  {
    text: '按钮内容',
    color: '#ffffff',
    backgroundColor: '#1890ff',
    borderWidth: '1px',
    borderColor: '#1890ff',
    borderStyle: 'solid',
    borderRadius: '2px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '100px',
    tag: 'button',
    textAlign: 'center'
  }
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
.text-wrap {
  margin: 0 auto;
  padding-top: 30px;
}
</style>
