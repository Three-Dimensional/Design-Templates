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
  margin: 0 24px;
  flex: 1;
  width: 300px;
}
</style>
