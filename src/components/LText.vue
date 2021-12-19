<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, component } from 'vue'
import { pick } from 'lodash-es'
export default defineComponent({
  name: 'l-text',
  props: {
    textt: {
      type: String,
    },
    fontSize: {
      type: String,
    },
    tag: {
      type: String,
    },
  },
  setup(props) {
    return {}
  },
})
</script>

<style lang="scss">
h2,
p {
  .l-text-component {
    margin-bottom: 0;
  }
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  position: relative !important;
}
</style>
