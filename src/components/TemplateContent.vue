<template>
  <component :is="activeItem"></component>
</template>
<script lang="ts" setup>
import { shallowRef, watch } from 'vue'
import modules from '@/views/editor/module/index'

const props = defineProps<{
  activeModule: string
}>()

const activeItem = shallowRef({})

watch(
  () => props.activeModule,
  (newVal) => {
    const file = modules[newVal]
    activeItem.value = file
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<style lang="scss"></style>
