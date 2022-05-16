import { Module } from 'vuex'
import { GlobalDataProps } from './index'
export interface TemplateProps {
  id: number
  title: string
  coverImg: string
  author: string
  copiedCount: number
}

const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: '前端测试数据海报',
    author: 'viking',
    copiedCount: 1,
  },
]
export interface TemplatesProps {
  data: TemplateProps[]
}
const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData,
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find((t) => t.id === id)
    },
  },
}

export default templates
