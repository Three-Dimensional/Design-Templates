import { computed } from 'vue'
import { pick } from 'lodash-es'
import { ComponentAllTypes } from '../defaultProps'

const useComponentCommon = (props: ComponentAllTypes, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks))
  console.log(
    '%c 🍩 styleProps: ',
    'font-size:16px;background-color: #F5CE50;color:#fff;',
    styleProps
  )
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

export default useComponentCommon
