<template>
  <EditorHeader></EditorHeader>
  <main class="editor">
    <aside class="editor-item">
      <LeftPanel :handleChangeItem="handleChangeItem"></LeftPanel>
      <PanelContent :activeItem="activeItem"></PanelContent>
    </aside>
    <main class="preview-container">
      <!-- 工具栏 -->
      <EditorTools v-if="currentElement" :toolSetting="toolSetting" @copy="handleCopy" />
      <!-- 画布区域 -->
      <div class="preview-canvas" ref="previewRef">
        <CanvasArea ref="canvasRef" :style="{ transform: previewStyle.transform }"></CanvasArea>
      </div>
      <PageScaleSet :scale="scaleRate" @change-scale="changeScaleRate"></PageScaleSet>
    </main>

    <aside class="settings-panel">
      <!-- 具体数据 -->
      {{ currentElement && currentElement.style }}
    </aside>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch, ref, reactive } from 'vue'
import { ComponentData } from '@/stores/interface'
import useEditorStore from '@/stores/editor'
import EditorHeader from './components/EditorHeader.vue'
import EditorTools from './components/nav/EditorTools.vue'
import PanelContent from './components/left/PanelContent.vue'
import LeftPanel from './components/left/LeftPanel.vue'
import CanvasArea from './components/canvas/CanvasArea.vue'
import PageScaleSet from './components/bottom/PageScaleSet.vue'
import pageScale from './components/bottom/pageScale'
import { recordSnapshot } from '@/hooks/useRecordSnapshot'

const store = useEditorStore()
const currentElement = computed<ComponentData | undefined>(() => {
  return store.getCurrentElement
})
// 底部组件
const { previewStyle, previewRef, canvasRef, scaleRate, changeScaleRate } = pageScale()

// 工具栏默认数据
let toolSetting = reactive({
  color: 'rgb(130, 85, 130)',
  family: 'Microsoft YouYuan',
  size: 155555,
  bold: false,
  italic: false,
  underline: false,
  align: 'left',
  opacity: 0
})

watch(
  () => currentElement,
  (newVal) => {
    if (newVal.value) {
      toolSetting = newVal.value.style
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 初始化面板数据
onMounted(() => {
  recordSnapshot(store.$state)
})

const activeItem = ref({
  id: 1,
  title: '模板',
  type: 'case'
})
const handleChangeItem = (e: any): void => {
  activeItem.value = e
}

// 工具栏复制事件
const handleCopy = () => {
  console.info('handleCopy')
}
</script>

<style lang="scss">
.editor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #e7e8f0;
  height: calc(100vh - 70px);
  overflow: hidden;

  .editor-item {
    width: 400px;
    height: 100%;
    background: #fff;
    display: flex;
  }

  .preview-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: calc(100vw - 650px);
    min-width: 800px;
    height: calc(100vh - 70px);
  }

  .preview-canvas {
    width: 100%;
    height: 100%;
  }

  .settings-panel {
    width: 250px;
    height: 100%;
    background: #fff;
  }
}
</style>
