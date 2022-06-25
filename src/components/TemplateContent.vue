<template>
  <component :is="activeItem"></component>
</template>
<script lang="ts" setup>
import { ref, watch, defineAsyncComponent } from 'vue'
import modules from '@/views/editor/module/index'

const props = defineProps<{
  activeModule: string
}>()

const activeItem = ref({})
watch(
  () => props.activeModule,
  (newVal) => {
    console.log(newVal, 'newVal')
    const file = defineAsyncComponent(() => import(`../views/editor/module${modules[newVal]}`))
    activeItem.value = file
  },
  {
    deep: true
  }
)
</script>
<style lang="scss"></style>
