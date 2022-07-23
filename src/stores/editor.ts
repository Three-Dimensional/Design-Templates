import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ComponentData, NewComponentProps, PageStyle } from './interface'

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'LText',
    tag: 'h1',
    props: {
      text: 'hello'
    },
    style: {
      fontSize: 40,
      width: 125,
      height: 36,
      color: 'red',
      lineHeight: 1,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      left: 0,
      top: 0,
      transform: 'matrix(1, 0, 0, 1, 0, 0)',
      rotate: 0
    }
  },
  {
    id: uuidv4(),
    name: 'LText',
    tag: 'h1',
    props: {
      text: 'hello2222'
    },
    style: {
      fontSize: 40,
      width: 250,
      height: 150,
      color: 'red',
      lineHeight: 1,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      left: 50,
      top: 50,
      transform: 'matrix(1, 0, 0, 1, 50, 50)',
      rotate: 0
    }
  }
]

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
    components: testComponents,
    currentElement: ''
  }),

  getters: {
    getCurrentElement(state) {
      return state.components.find((component) => component.id === state.currentElement)
    }
  },

  actions: {
    updatePageStyle(style: Partial<PageStyle>) {
      this.style = {
        ...this.style,
        ...style
      }
    },
    addComponent(style: NewComponentProps) {
      const addComponent: ComponentData = {
        name: 'LText',
        id: uuidv4(),
        props: {
          text: 'hello'
        },
        tag: 'h1',
        style
      }
      this.components.push(addComponent)
    },
    removeComponent(id: string) {
      this.components = this.components.filter((item) => item.id !== id)
    },
    setActive(id: string) {
      this.currentElement = id
    },
    // 动态改变属性值
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
