import { defineComponent, computed, PropType, VNode } from 'vue'
import { TextComponentProps } from '../defaultProps'
import { mapPropsToFroms } from '../propsMap'
import { reduce } from 'lodash-es'
import { Input, InputNumber, Slider, Radio, Select } from 'ant-design-vue'
import './propsTable.scss'
const mapToComponent = {
  'a-textarea': Input.TextArea,
  'a-input-number': InputNumber,
  'a-slider': Slider,
  'a-radio-group': Radio.Group,
  'a-radio-button': Radio.Button,
  'a-select': Select,
  'a-select-option': Select.Option
} as any
interface FormToProp {
  component: string;
  value: string;
  subComponent?: string;
  options?: { text: string | VNode; value: string }[];
  text?: string;
  extraProps?: { [key: string]: any };
  valueProp?: string;
  eventName?: string;
  initTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  events: { [key: string]: (e: any) => void };
}
function capitalizeFirstLetter(eventName: string) {
  return eventName.charAt(0).toUpperCase() + eventName.slice(1)
}
export default defineComponent({
  name: 'props-table',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const finalProps = computed(() => {
      return reduce(props.props, (result, value, key) => {
        const newKey = key as keyof TextComponentProps
        const item = mapPropsToFroms[newKey]
        if (item) {
          const { valueProp = 'value', eventName = 'change', initTransform, afterTransform } = item
          const newItem: FormToProp = {
            ...item,
            value: initTransform ? initTransform(value) : value,
            valueProp,
            eventName,
            events: {
              ['on' + capitalizeFirstLetter(eventName)]: (e) => {
                ctx.emit('change', { key, value: afterTransform ? afterTransform(e) : e })
              }
            }
          }
          result[newKey] = newItem
        }
        return result
      }, {} as { [key: string]: FormToProp })
    })
    return () => (
      <div class="props-table">
        {
          Object.keys(finalProps.value).map(key => {
            const value = finalProps.value[key]
            const ComponentName = mapToComponent[value.component]
            const subComponentName = value.subComponent ? mapToComponent[value.subComponent] : null
            const props = {
              [value.valueProp as string]: value.value,
              ...value.extraProps,
              ...value.events
            }
            return (
              <div class="prop-item" key={key}>
                {value.text && <div class="label">{value.text}</div>}
                <div class="prop-component">
                  <ComponentName
                    class="item"
                    {...props}
                  >
                    {value.options && value.options.map(option => {
                      return (
                        <subComponentName value={option.value}>
                          {option.text}
                        </subComponentName>
                      )
                    })}
                  </ComponentName>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  },
})

