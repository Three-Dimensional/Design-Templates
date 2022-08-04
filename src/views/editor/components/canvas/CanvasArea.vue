<template>
  <aside class="canvas-area" id="canvas-area" :style="propsToStyleString(canvasStyle, false)">
    <EditBox v-for="com in componentList" :key="com.id" :comId="com.id" :defaultStyle="com.style">
      <LText :style="com" />
      <!-- <component :is="com.name" :style="com.props" :comProps="com.props"></component> -->
    </EditBox>
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import useEditorStore from '@/stores/editor'
import LText from '@/components/LText.vue'
import EditBox from '@/components/Editor/EditBox.vue'
import { propsToStyleString } from '@/hooks/useComponentCommon'

const editeorStore = useEditorStore()
const componentList = computed(() => editeorStore.components)
const canvasStyle = computed(() => editeorStore.style)
</script>
<style lang="scss" scoped>
.canvas-area {
  width: 335px;
  height: 600px;
  border: 1px solid #efefef;
  background: #fff;
  position: relative;
  margin: 0 auto;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.editor-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;

  &:hover {
    border: 1px dashed #ccc;
  }
}
</style>
