import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'
import { ComponentAllTypes } from '../defaultProps'
import { PickObjWithRequired } from '@/types/common'

export type NewComponentProps = PickObjWithRequired<ComponentAllTypes, 'width' | 'height'>

export type ComponentData = {
  // 业务组件库名称 LText，l-image 等等
  name: string
  // 业务组件库名称 LText的内容
  text?: string
  props: NewComponentProps
  // id，uuid v4 生成
  id: string
}

export type ComponentAllData = ComponentData

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[]
  // 当前编辑器中选中的元素的uuid
  currentElement: string
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'LText',
    text: 'hello',
    props: {
      fontSize: 20,
      width: 125,
      height: 36,
      color: 'red',
      lineHeight: 1,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      transform: 'matrix(1, 0, 0, 1, 100, 20)',
      rotate: 0
    }
  },
  {
    id: uuidv4(),
    name: 'LText',
    text: 'hello2',
    props: {
      fontSize: 10,
      width: 125,
      height: 36,
      fontWeight: 'bold',
      lineHeight: 2,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      transform: 'matrix(1, 0, 0, 1, 150, 50)',
      rotate: 0
    }
  },
  {
    id: uuidv4(),
    name: 'LText',
    text: 'hello3',
    props: {
      fontSize: 15,
      width: 125,
      height: 36,
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: 3,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      transform: 'matrix(1, 0, 0, 1, 200, 100)',
      rotate: 0
    }
  }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  getters: {
    getCurrentElement(state) {
      return state.components.find((component) => component.id === state.currentElement)
    }
  },
  mutations: {
    addComponent(state: EditorProps, props: NewComponentProps) {
      const addComponent: ComponentData = {
        name: 'LText',
        id: uuidv4(),
        text: 'test',
        props
      }
      state.components.push(addComponent)
    },
    removeComponent(state: EditorProps, id: string) {
      state.components = state.components.filter((item) => item.id !== id)
    },
    setActive(state: EditorProps, id: string) {
      state.currentElement = id
    },
    updateComponent(state: EditorProps, { key, value }) {
      const updatedComponent = state.components.find(
        (component) => component.id === state.currentElement
      )
      if (updatedComponent) {
        updatedComponent.props[key as keyof ComponentData] = value
      }
    }
  }
}

export default editor
