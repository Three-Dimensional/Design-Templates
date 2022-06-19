<template>
  <EditorHeader></EditorHeader>
  <div class="editor">
    <aside class="editor-item">
      <LeftPanel :handleChangeItemID="handleChangeItemID"></LeftPanel>
      <PanelContent :itemID="itemID"></PanelContent>
      <!-- <div class="sidebar-container">
        <Component-List :list="defaultTextTemplates" @onClickItem="addItem"></Component-List>
      </div> -->
    </aside>
    <!-- 主体 -->
    <main class="preview-container" style="width: calc(100% - 400px)">
      <EditorTools/>
      <div class="preview-list" id="canvas-area">
        <EditorWrapper v-for="com in components" :key="com.id" :id="com.id" @on-item-click="onItemClick"
          :active="currentElement ? com.id === currentElement.id : false">
          <component :is="com.name" v-bind="com.props"> </component>
        </EditorWrapper>
      </div>
    </main>

    <aside class="settings-panel">
      <PropsTable :props="(currentElement.props as any)" v-if="currentElement" @change="handleChange">
      </PropsTable>
      <p>{{ currentElement && currentElement.props }}</p>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentData } from '@/store/editor'
import { defaultTextTemplates } from '@/defaultTemplates'

import EditorHeader from './components/EditorHeader.vue'
import LeftPanel from './components/LeftPanel.vue'
import EditorTools from './components/EditorTools.vue'
import PanelContent from './components/PanelContent.vue'
import EditorWrapper from '@/components/EditorWrapper.vue'
import PropsTable from '@/components/PropsTable.vue'

const store = useStore<GlobalDataProps>()
const components = computed(() => store.state.editor.components)
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
  console.log(currentElement);
}

let itemID = ref(1)
const handleChangeItemID = (e: number): void => {
  itemID.value = e
}

</script>

<script lang="ts">
import { defineComponent } from 'vue'
import LText from '@/components/LText.vue'
import ComponentList from '@/components/ComponentsList.vue'

export default defineComponent({
  components: {
    LText,
    ComponentList
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
