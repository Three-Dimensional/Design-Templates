import { Module } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { GlobalDataProps } from './index'

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
}

export default editor