<template>
  <component :is="activeItem"></component>
</template>
<script lang="ts" setup>
import { shallowRef, watch, defineAsyncComponent } from 'vue'
import modules from '@/views/editor/module/index'

const props = defineProps<{
  activeModule: string
}>()

const activeItem = shallowRef({})
watch(
  () => props.activeModule,
  (newVal) => {
    const file = defineAsyncComponent(
      () => import(/* @vite-ignore */ `../views/editor/module${modules[newVal]}`)
    )

    activeItem.value = file
  },
  {
    deep: true
  }
)
</script>
<style lang="scss"></style>
