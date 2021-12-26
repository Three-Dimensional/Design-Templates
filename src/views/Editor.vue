<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider class="component">
        <div class="sidebar-container">组件列表</div>
      </a-layout-sider>
      <!-- 主体 -->
      <a-layout>
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <component
              :is="com.name"
              v-bind="com.props"
              v-for="com in components"
              :key="com.id"
            ></component>
          </div>
        </a-layout-content>
      </a-layout>

      <a-layout-sider class="settings-panel"> 组件属性 </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import LText from "../components/LText.vue";

export default defineComponent({
  components: {
    LText,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed(() => store.state.editor.components);
    return {
      components,
    };
  },
});
</script>

<style lang="scss">
.editor-container {
  .preview-container {
    padding: 24px;
    margin: 0;
    min-height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .preview-list {
    padding: 0;
    margin: 0;
    min-width: 375px;
    min-height: 200px;
    border: 1px solid #efefef;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    margin-top: 50px;
    max-height: 80vh;
  }

  .component {
    width: 300px;
    background: yellow;
  }

  .settings-panel {
    width: 300px;
    background: purple;
  }
}
</style>
