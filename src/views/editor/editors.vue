<template>
  <EditorHeader></EditorHeader>
  <main class="editor">
    <aside class="editor-item">
      <LeftPanel :handleChangeItem="handleChangeItem"></LeftPanel>
      <PanelContent :activeItem="activeItem"></PanelContent>
    </aside>
    <main class="preview-container" style="width: calc(100% - 400px)">
      <EditorTools v-model:setting="toolSetting" @copy="handleCopy" />
      <!-- 画布区域 -->
      <CanvasArea></CanvasArea>
    </main>

    <aside class="settings-panel">
      <PropsTable
        :props="(currentElement.props as any)"
        v-if="currentElement"
        @change="handleChange"
      >
      </PropsTable>
      <!-- 具体数据 -->
      <p>{{ currentElement && currentElement.props }}</p>
    </aside>
  </main>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../../store/index.js'
import { ComponentData } from '../../store/editor.js'
import EditorHeader from './components/EditorHeader.vue'
import EditorTools from './components/EditorTools.vue'
import PanelContent from './components/left/PanelContent.vue'
import LeftPanel from './components/left/LeftPanel.vue'
import CanvasArea from './components/canvas/CanvasArea.vue'
import PropsTable from '@/components/PropsTable.vue'

const store = useStore<GlobalDataProps>()
const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)
const handleChange = (e: { key: string; value: any }) => {
  store.commit('updateComponent', e)
}

const activeItem = ref({
  id: 0,
  title: '',
  type: ''
})
const handleChangeItem = (e: any): void => {
  activeItem.value = e
}
// 工具栏相关
const toolSetting = ref({
  color: 'rgb(130, 85, 130)',
  family: 'SimSun,STSong',
  size: 15,
  bold: false,
  italic: false,
  underline: false,
  align: 'left',
  opacity: 0
})
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
  }

  .settings-panel {
    width: 20%;
    height: 100%;
    background: #fff;
  }
}
</style>
