import { PickObjWithRequired } from '@/types/common'
import { ComponentAllTypes } from '../../defaultProps'

export { PageStyle } from '../../defaultProps'
// 用户接口
export interface UserProps {
  isLogin: boolean
  userName?: string
}

// 模版接口
export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

export interface TemplatesProps {
  data: TemplateProps[]
}

// 编辑器接口
export type NewComponentProps = PickObjWithRequired<ComponentAllTypes, 'width' | 'height'>

export type ComponentData = {
  // 业务组件库名称 LText，l-image 等等
  name: string
  // id，uuid v4 生成
  id: string
  tag: string
  props: {
    [key in string]: string
  }
  style: NewComponentProps
}

export type ComponentAllData = ComponentData

export interface EditorProps {
  // 供中间编辑器渲染的数组
  components: ComponentData[]
  // 当前编辑器中选中的元素的uuid
  currentElement: string
}

export interface GlobalDataProps {
  user: UserProps
  templates: TemplatesProps
  editor: EditorProps
}
