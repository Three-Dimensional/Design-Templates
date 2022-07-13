<template>
  <div :style="styleStr" class="l-text__component">
    {{ text }}
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { textDefaultProps, TextComponentProps, propsToStyleString } from '../defaultProps'

interface ThisComponentProps {
  text: string
  style: TextComponentProps
}

const props = withDefaults(defineProps<ThisComponentProps>(), {
  text: '',
  style: () => {
    return { ...textDefaultProps }
  }
})

const styleStr = computed(() => {
  return propsToStyleString(props.style, false)
})
</script>

<style lang="scss">
h2,
p {
  .l-text__component {
    margin-bottom: 0;
  }
}
button.l-text__component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text__component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
