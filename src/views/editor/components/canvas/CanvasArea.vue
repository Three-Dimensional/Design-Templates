<template>
  <aside class="canvas-area">
    <EditorWrapper
      v-for="com in componentList"
      :detail="com"
      :key="com.id"
      :id="com.id"
      @on-item-click="onItemClick"
      :active="currentElement ? com.id === currentElement.id : false"
    >
      <LText v-bind="com.props" />
    </EditorWrapper>
  </aside>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import { ComponentData } from '@/store/editor'
import EditorWrapper from '@/components/EditorWrapper.vue'
import LText from '@/components/LText.vue'

const store = useStore<GlobalDataProps>()
const componentList = computed(() => store.state.editor.components)
const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)

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
</style>
