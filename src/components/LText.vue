<template>
  <component :is="style.tag" :style="styleStr" class="l-text__component">
    {{ style.text }}
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { propsToStyleString } from '@/hooks/useComponentCommon'
import { ComponentData } from '@/stores/interface'

const props = defineProps<{
  style: ComponentData
}>()
const styleStr = computed(() => {
  return propsToStyleString(props.style.props, false)
})
</script>

<style lang="scss">
button.l-text__component {
  padding: 5px 10px;
  cursor: pointer;
}

.l-text__component {
  box-sizing: border-box;
  white-space: pre-wrap;
}
</style>
