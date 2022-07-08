import { VNode } from 'vue'
import { TextComponentProps } from './defaultProps'

export interface PropToFrom {
  component: string
  subComponent?: string
  options?: { text: string | VNode; value: string }[]
  text?: string
  extraProps?: { [key: string]: any }
  valueProp?: string
  eventName?: string
  initTransform?: (v: any) => any
  afterTransform?: (v: any) => any
}
const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' }
]
const fontFamilyOptions = fontFamilyArr.map((fontFamily) => {
  return {
    value: fontFamily.value,
    text: (<span style={{ fontFamily: fontFamily.value }}>{fontFamily.text}</span>) as VNode
  }
})
export type PropsToFroms = {
  [P in keyof TextComponentProps]?: PropToFrom
}

export const mapPropsToFroms: PropsToFroms = {
  // text: {
  //   component: 'a-textarea',
  //   text: '文本',
  //   extraProps: {
  //     rows: 3
  //   },
  //   afterTransform: (e: any) => e.target.value
  // },
  fontSize: {
    component: 'a-input-number',
    text: '字号',
    initTransform: (v) => parseInt(v, 10),
    afterTransform: (e: number) => `${e}px`
  },
  lineHeight: {
    component: 'a-slider',
    text: '行高',
    initTransform: (v) => parseFloat(v),
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1
    },
    afterTransform: (e: number) => e.toString()
  },
  textAlign: {
    component: 'a-radio-group',
    text: '对齐',
    subComponent: 'a-radio-button',
    options: [
      { text: '左', value: 'left' },
      { text: '中', value: 'center' },
      { text: '右', value: 'right' }
    ],
    afterTransform: (e: any) => e.target.value
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [{ value: '', text: '无' }, ...fontFamilyOptions]
  },
  opacity: {
    component: 'a-slider',
    text: '透明度',
    initTransform: (v: string) => Math.floor(parseFloat(v) * 100),
    extraProps: {
      min: 1,
      max: 100,
      step: 1,
      reverse: true
    },
    afterTransform: (v: number) => (v / 100).toString()
  }
}
