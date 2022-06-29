<template>
  <aside class="canvas-area">
    <!-- <div
      v-for="com in componentList"
      :key="com.id"
      :detail="com"
      :id="com.id"
      class="editor-wrapper"
      :class="{ active: currentElement ? com.id === currentElement.id : false }"
      @click.stop="onItemClick(com.id)"
      @mousedown="handleMouseDown"
    >
      <LText v-bind="com.props" />
    </div> -->
    <EditBox
      v-for="com in componentList"
      :key="com.id"
      :defaultStyle="com.props"
      :active="currentElement?.id === com.id ? true : false"
      @click.stop="onItemClick(com.id)"
    >
      <LText :style="com.props" :text="com.text" />
    </EditBox>
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentAllData } from '@/store/editor'
import LText from '@/components/LText.vue'
import EditBox from '@/components/Editor/EditBox.vue'

const store = useStore<GlobalDataProps>()
const componentList = computed(() => store.state.editor.components)
const currentElement = computed<ComponentAllData | null>(() => store.getters.getCurrentElement)

const onItemClick = (id: string) => {
  store.commit('setActive', id)
}
</script>
<style lang="scss" scoped>
.canvas-area {
  width: 375px;
  min-height: 660px;
  border: 1px solid #efefef;
  background: #fff;
  max-height: 80vh;
  margin-top: 60px;
  position: relative;
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
