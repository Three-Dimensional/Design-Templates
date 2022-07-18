import { computed } from 'vue'
import { pick } from 'lodash-es'
import { ComponentAllTypes } from '../defaultProps'
import useEditorStore from '@/stores/editor'

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
const store = useEditorStore()
export const pushComponentCommon = (item: any): void => {
  const target = JSON.parse(JSON.stringify(item))
  target.id = new Date().getTime().toString()
  store.components.push(target)
}

// export default {
//   useComponentCommon,
//   pushComponentCommon
// }
