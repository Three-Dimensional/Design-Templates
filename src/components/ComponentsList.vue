<template>
  <div class="create-component-list">
    <div v-for="(item, index) in list" class="component-item" :key="index" @click="clickItem(item)">
      <LText v-bind="item"> </LText>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import LText from './LText.vue'

export default defineComponent({
  name: 'ComponentsList',
  components: {
    LText
  },
  props: {
    list: {
      type: Array as PropType<any>,
      required: true
    }
  },
  emits: ['on-click-item'],
  setup(props, ctx) {
    const clickItem = (item: any) => {
      ctx.emit('on-click-item', item)
    }
    return {
      clickItem
    }
  }
})
</script>

<style lang="scss">
.component-item {
  width: 100px;
  margin: 0 auto;
}
</style>
