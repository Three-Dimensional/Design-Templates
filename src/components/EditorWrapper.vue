<template>
  <div
    class="editor-wrapper"
    @click.capture.stop="onItemClick(id)"
    :class="{ active: active }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on-item-click"],
  setup(props, ctx) {
    const onItemClick = (id: string) => {
      ctx.emit("on-item-click", id);
    };
    return {
      onItemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  &:hover {
    border: 1px dashed #ccc;
  }
}
.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>
