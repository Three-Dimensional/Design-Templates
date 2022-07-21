import { reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { componentsDefaultProps } from '@/defaultProps'
import { ComponentData } from '@/stores/interface'

const textDefaultProps = componentsDefaultProps['l-text'].props

// 模拟数据
export const textPropsList: ComponentData[] = [
  {
    name: 'LText',
    tag: 'h1',
    id: uuidv4(),
    props: {
      text: '点击添加文字标题'
    },
    style: {
      fontSize: 24,
      fontWeight: 'bolder',
      fontFamily: 'cursive',
      width: 200,
      height: 40
    }
  },
  {
    name: 'LText',
    tag: 'h2',
    id: uuidv4(),
    props: {
      text: '点击添加副标题'
    },
    style: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'KaiTi',
      width: 200,
      height: 20
    }
  },
  {
    name: 'LText',
    tag: 'p',
    id: uuidv4(),
    props: {
      text: '正文内容'
    },
    style: {
      width: 200,
      height: 20
    }
  }
]
export const textList: ComponentData[] = reactive(
  textPropsList.map((prop) => {
    return {
      name: prop.name,
      tag: prop.tag,
      id: prop.id,
      props: prop.props,
      style: {
        ...textDefaultProps,
        ...(prop.style as any)
      }
    }
  })
)
