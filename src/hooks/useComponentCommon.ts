import { computed, StyleValue } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { omit, pick } from 'lodash-es'
import { ComponentAllTypes } from '../defaultProps'
import useEditorStore from '@/stores/editor'
import { ComponentData } from '@/stores/interface'

const store = useEditorStore()

export const useComponentCommon = (props: ComponentAllTypes, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks))
  const handleClick = () => {
    if (props.actionType === 'url' && props.url) {
      window.location.href = props.url
    }
  }
  return {
    styleProps,
    handleClick
  }
}

// 添加组件到画布
export const pushComponentCommon = (item: ComponentData): void => {
  const target = JSON.parse(JSON.stringify(item))
  target.id = uuidv4()
  store.addComponent(target)
}

/**
 * 将对象属性转为字符串属性去赋值
 * @param props 源属性
 * @param includeGeometric 是否包含几何属性
 * @returns style字符串
 */
export const propsToStyleString = (
  props: ComponentAllTypes,
  includeGeometric: boolean = false
): StyleValue => {
  const geometric = ['width', 'height', 'transform']
  const notNumberProps = ['lineHeight', 'opacity', 'rotate']
  let obj = {}
  if (includeGeometric) {
    obj = pick(props, geometric)
  } else {
    obj = omit(props, geometric)
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'number' && !notNumberProps.includes(key)) {
      obj[key] += 'px'
    }
  })
  return obj
}
