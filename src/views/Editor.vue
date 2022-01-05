<template>
  <div class="editor">
    <aside class="component">
      <div class="sidebar-container">
        <Component-List
          :list="defaultTextTemplates"
          @onClickItem="addItem"
        ></Component-List>
      </div>
    </aside>
    <!-- 主体 -->
    <main class="preview-container">
      <div class="preview-list" id="canvas-area">
        <Editor-Wrapper
          v-for="com in components"
          :key="com.id"
          :id="com.id"
          @on-item-click="onItemClick"
          :active="currentElement ? com.id === currentElement.id : false"
        >
          <component :is="com.name" v-bind="com.props">
            <!-- <button @click="removeComponent(com.id)">删除</button> -->
          </component>
        </Editor-Wrapper>
      </div>
    </main>

    <aside class="settings-panel">
      <Props-Table
        :props="currentElement.props"
        v-if="currentElement"
        @change="handleChange"
      ></Props-Table>
      <p>{{ currentElement && currentElement.props }}</p>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { ComponentData } from "../store/editor";
import { defaultTextTemplates } from "../defaultTemplates";
import LText from "../components/LText.vue";
import EditorWrapper from "../components/EditorWrapper.vue";
import ComponentList from "../components/ComponentsList.vue";
import PropsTable from "../components/PropsTable.vue";

export default defineComponent({
  components: {
    LText,
    ComponentList,
    EditorWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed(() => store.state.editor.components);
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    );
    const addItem = (props: any) => {
      store.commit("addComponent", props);
    };
    const removeComponent = (id: string) => {
      store.commit("removeComponent", id);
    };
    const onItemClick = (id: string) => {
      store.commit("setActive", id);
    };
    const handleChange = (e: { key: string; value: any }) => {
      store.commit("updateComponent", e);
    };
    return {
      components,
      addItem,
      defaultTextTemplates,
      removeComponent,
      currentElement,
      onItemClick,
      handleChange,
    };
  },
});
</script>

<style lang="scss">
.editor {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #e7e8f0;
  height: 100%;

  .component {
    width: 400px;
    height: 100vh;
    background: #fff;
    box-shadow: 10px 0 20px 0 rgb(0 0 0 / 4%);
  }

  .preview-container {
    width: calc(100% - 584px);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .preview-list {
    min-width: 375px;
    min-height: 667px;
    border: 1px solid #efefef;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    margin-top: 50px;
    max-height: 80vh;
  }

  .settings-panel {
    width: 20%;
    height: 100vh;
    background: #fff;
    box-shadow: -10px 0 20px 0 rgb(0 0 0 / 4%);
  }
}
</style>
