<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider class="component">
        <div class="sidebar-container">
          <Component-List
            :list="defaultTextTemplates"
            @onClickItem="addItem"
          ></Component-List>
        </div>
      </a-layout-sider>
      <!-- 主体 -->
      <a-layout>
        <a-layout-content class="preview-container">
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
        </a-layout-content>
      </a-layout>

      <a-layout-sider class="settings-panel">
        <pre>{{ currentElement && currentElement.props }}</pre>
      </a-layout-sider>
    </a-layout>
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

export default defineComponent({
  components: {
    LText,
    ComponentList,
    EditorWrapper,
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
.editor-container {
  .preview-container {
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .preview-list {
    padding: 0;
    margin: 0;
    min-width: 375px;
    min-height: 500px;
    border: 1px solid #efefef;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    margin-top: 50px;
    max-height: 80vh;
  }

  .component {
    width: 400px;
    background: #fff;
  }

  .settings-panel {
    width: 400px;
    background: #fff;
  }
}
</style>
