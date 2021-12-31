import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'
import { TextComponentProps } from '../defaultProps'

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[]
  // 当前编辑器中选中的元素的uuid
  currentElement: string
}

export interface ComponentData {
  // 业务组件库名称 l-text，l-image 等等
  name: string
  props: { [key: string]: any }
  // id，uuid v4 生成
  id: string
}

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello',
      fontSize: '20px',
      color: 'red',
      lineHeight: '1',
      textAlign: 'left',
      fontFamily: '',
      opacity: '1',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello2',
      fontSize: '10px',
      fontWeight: 'bold',
      lineHeight: '2',
      textAlign: 'left',
      fontFamily: '',
      opacity: '1',
    },
  },
  {
    id: uuidv4(),
    name: 'l-text',
    props: {
      text: 'hello3',
      fontSize: '15px',
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: '3',
      textAlign: 'left',
      fontFamily: '',
      opacity: '1',
    },
  },
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: ''
  },
  getters: {
    getCurrentElement(state) {
      return state.components.find(component => component.id === state.currentElement)
    }
  },
  mutations: {
    addComponent(state, props: Partial<TextComponentProps>) {
      const addComponent: ComponentData = {
        name: 'l-text',
        id: uuidv4(),
        props
      }
      state.components.push(addComponent)
    },
    removeComponent(state, id: string) {
      state.components = state.components.filter(item => item.id !== id)
    },
    setActive(state, id: string) {
      state.currentElement = id
    },
    // updateComponent(state, { key, value }) {
    //   const updatedComponent = state.components.find(component => component.id === state.currentElement)
    //   if (updatedComponent) {
    //     updatedComponent.props[key as keyof TextComponentProps] = value
    //   }
    // }
  }
}

export default editor