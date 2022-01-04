<template>
  <div class="props-table">
    <div
      class="prop-item"
      v-for="(prop, key) in finalProps"
      :key="key"
    >
      <div class="item-wrapper">
        <div class="label" v-if="prop.text">{{prop.text}}</div>
        <component class="item"
          :is="prop.component"
          :[prop.valueProp]="prop.value"
          v-bind="prop.extraProps"
          v-on="prop.events"
        >
          <template v-if="prop.options">
            <component
              :is="prop.subComponent"
              v-for="(option, k) of prop.options"
              :key="k"
              :value="option.value"
            >
              <render-vnode :vNode="option.text"></render-vnode>
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, VNode } from 'vue'
import {TextComponentProps} from '../defaultProps'
import {mapPropsToFroms} from '../propsMap'
import {reduce} from 'lodash-es'
import RenderVnode from './RenderVnode'
interface FormToProp {
  component: string;
  value: string;
  subComponent?: string;
  options?: {text: string | VNode; value: string}[];
  text?: string;
  extraProps?: { [key: string]: any };
  valueProp?: string;
  eventName?: string;
  initTransform?: (v: any) => any;
  afterTransform?: (v: any) => any;
  events: { [key: string]: (e: any) => void };
}
export default defineComponent({
  name: 'props-table',
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  components: {
    RenderVnode
  },
  emits: ['change'],
  setup(props, ctx) {
    const finalProps = computed(() => {
      return reduce(props.props, (result, value, key) => {
        const newKey = key as keyof TextComponentProps
        const item = mapPropsToFroms[newKey]
        if(item) {
          const {valueProp = 'value', eventName = 'change', initTransform, afterTransform} = item
          const newItem: FormToProp = {
            ...item,
            value: initTransform ? initTransform(value) : value,
            valueProp,
            eventName,
            events: {
              [eventName]: (e) => {
                ctx.emit('change', {key, value: afterTransform ? afterTransform(e) : e})
              }
            }
          }
          result[newKey] = newItem
        }
        return result
      }, {} as {[key: string]: FormToProp})
    })
    return {
      finalProps
    }
  },
})
</script>

<style lang="scss" scoped>
.item-wrapper {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  box-sizing: border-box;
  .label {
    width: 28%;
  }
  .item {
    width: 70%;
  }
}
</style>
