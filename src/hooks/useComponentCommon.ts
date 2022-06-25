import { computed } from 'vue'
import { pick } from 'lodash-es'
import { TextComponentProps } from '../defaultProps'

const useComponentCommon = (props: Readonly<Partial<TextComponentProps>>, picks: string[]) => {
  const styleProps = computed(() => pick(props, picks))
  console.log(
    '%c 🍩 styleProps: ',
    'font-size:20px;background-color: #F5CE50;color:#fff;',
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
