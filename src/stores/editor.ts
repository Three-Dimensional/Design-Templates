import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ComponentData, PageStyle } from './interface'

// 初始化数据
export const defaultComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'LText',
    tag: 'h1',
    props: {
      text: '文案数据2222222'
    },
    style: {
      width: 225,
      height: 36,
      fontSize: 24,
      color: 'red',
      lineHeight: 1,
      textAlign: 'center',
      fontFamily: 'STFangsong',
      opacity: 1,
      left: 0,
      top: 20,
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
      rotate: 0,
      bold: false,
      italic: false,
      underline: false
      // transform: 'matrix(1, 0, 0, 1, 0, 0)'
    }
  },
  {
    id: uuidv4(),
    name: 'LText',
    tag: 'h1',
    props: {
      text: '文案数据11111'
    },
    style: {
      width: 250,
      height: 36,
      fontSize: 24,
      color: 'red',
      lineHeight: 1,
      textAlign: 'center',
      fontFamily: 'Microsoft YaHei',
      opacity: 1,
      left: 0,
      top: 200,
      transform: 'matrix(1, 0, 0, 1, 50, 50)',
      rotate: 0
    }
  }
]
// 页面数据属性
const useEditorStore = defineStore('editor', {
  state: () => ({
    id: uuidv4(),
    title: '海报标题',
    description: '描述描述',
    author: '我是作者',
    style: {
      width: '750px',
      height: '1334px',
      backgroundColor: '#ffffff',
      backgroundImage: '',
      backgroundSize: '',
      backgroundRepeat: '',
      backgroundPosition: ''
    },
    components: defaultComponents,
    currentElement: ''
  }),

  getters: {
    // 获取当前选中的元素
    getCurrentElement(state) {
      return state.components.find((component) => component.id === state.currentElement)
    }
  },

  actions: {
    // 添加元素
    updatePageStyle(style: Partial<PageStyle>) {
      this.style = {
        ...this.style,
        ...style
      }
    },
    // 增加画布元素
    addComponent(compomtedItem: ComponentData) {
      this.components.push(compomtedItem)
    },
    // 删除画布元素
    removeComponent(id: string) {
      this.components = this.components.filter((item) => item.id !== id)
    },
    // 当前选中的元素
    setActive(id: string) {
      this.currentElement = id
    },
    // 赋值操作
    handleChange(state: any) {
      this.$state = state
    },
    // 动态改变元素的属性值
    updateComponent({ key, value }: { key: string; value: any }) {
      const updatedComponent = this.components.find(
        (component) => component.id === this.currentElement
      )
      if (updatedComponent) {
        updatedComponent.props[key as keyof ComponentData] = value
      }
    }
  }
})

export default useEditorStore
