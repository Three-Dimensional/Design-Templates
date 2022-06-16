<template>
  <editor-header></editor-header>
  <div class="editor">
    <aside class="editor-item">
      <LeftPanel :handleChangeItemID="handleChangeItemID"></LeftPanel>
      <PanelContent :itemID="itemID"></PanelContent>
      <!-- <div class="sidebar-container">
        <Component-List :list="defaultTextTemplates" @onClickItem="addItem"></Component-List>
      </div> -->
    </aside>
    <!-- 主体 -->
    <main class="preview-container">
      <div class="preview-list" id="canvas-area">
        <Editor-Wrapper v-for="com in components" :key="com.id" :id="com.id" @on-item-click="onItemClick"
          :active="currentElement ? com.id === currentElement.id : false">
          <component :is="com.name" v-bind="com.props"> </component>
        </Editor-Wrapper>
      </div>
    </main>

    <aside class="settings-panel">
      <Props-Table :props="currentElement.props" v-if="currentElement" @change="handleChange"></Props-Table>
      <p>{{ currentElement && currentElement.props }}</p>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentData } from '@/store/editor'
import { defaultTextTemplates } from '@/defaultTemplates'

import EditorHeader from './components/EditorHeader.vue'
import LeftPanel from './components/LeftPanel.vue'
import PanelContent from './components/PanelContent.vue'
import LText from '@/components/LText.vue'
import EditorWrapper from '@/components/EditorWrapper.vue'
import ComponentList from '@/components/ComponentsList.vue'
import PropsTable from '@/components/PropsTable.vue'

export default defineComponent({
  components: {
    LText,
    ComponentList,
    EditorWrapper,
    EditorHeader,
    PropsTable,
    LeftPanel,
    PanelContent
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    console.log('%c 🌮 components: ', 'font-size:20px;background-color: #FCA650;color:#fff;', components);
    const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)
    const addItem = (props: any) => {
      store.commit('addComponent', props)
    }
    const removeComponent = (id: string) => {
      store.commit('removeComponent', id)
    }
    const onItemClick = (id: string) => {
      store.commit('setActive', id)
    }
    const handleChange = (e: { key: string; value: any }) => {
      store.commit('updateComponent', e)
    }

    let itemID = ref(1)
    const handleChangeItemID = (e: number):void => {
      itemID.value = e
    }
    return {
      components,
      addItem,
      defaultTextTemplates,
      removeComponent,
      currentElement,
      onItemClick,
      handleChange,
      handleChangeItemID,
      itemID,
    }
  },
})
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
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .preview-list {
    min-width: 375px;
    min-height: 660px;
    border: 1px solid #efefef;
    background: #fff;
    max-height: 80vh;
    margin-top: 60px;
  }

  .settings-panel {
    width: 20%;
    height: 100%;
    background: #fff;
  }
}
</style>
