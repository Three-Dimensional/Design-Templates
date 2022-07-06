import { defineStore } from 'pinia'
import { TemplateProps } from './interface'

const testData: TemplateProps[] = [
  {
    id: 1,
    coverImg: 'https://static.imooc-lego.com/upload-files/screenshot-889755.png',
    title: '前端测试数据海报',
    author: 'viking',
    copiedCount: 1
  }
]

const useTemplatetore = defineStore('template', {
  state: () => ({
    templateList: testData
  }),

  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.templateList.find((t) => t.id === id)
    }
  }
})

export default useTemplatetore
