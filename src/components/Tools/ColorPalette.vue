<template>
  <div class="palette">
    <span class="color-block" :style="{ backgroundColor: backgroundColor }"></span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  backgroundColor: {
    type: String,
    required: true
  }
})
</script>
<style scoped lang="scss">
.palette {
  height: 40px;
  width: 40px;
  padding: 8px;
  border-radius: 4px;

  &:hover {
    background: #f3f4f9;
    .tips-text {
      visibility: initial;
    }
  }
  &.selected {
    background: #f3f4f9;
  }
}
.color-block {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  height: 24px;
  width: 24px;
}
</style>
