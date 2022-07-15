<template>
  <aside class="panel">
    <TemplateContent :activeModule="`${activeItem.type}-${activeItem.type}`" />
  </aside>
</template>
<script lang="ts" setup>
import TemplateContent from '@/components/TemplateContent.vue'

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
  padding: 0 10px;
  flex: 1;
}
</style>
