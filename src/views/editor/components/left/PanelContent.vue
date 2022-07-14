<template>
  <!-- <textMenu v-if="activeItem?.type === 'text'"></textMenu> -->
  <aside class="panel">
    <TemplateContent :activeModule="`${activeItem.type}-${activeItem.type}`" />
  </aside>
</template>
<script lang="ts" setup>
import TemplateContent from '@/components/TemplateContent.vue'
// import textMenu from './textMenu.vue'

interface itemType {
  id: number
  title: string
  type?: string
  iconUrl?: string
}

defineProps<{
  activeItem: itemType
}>()
</script>
<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
}
</style>
