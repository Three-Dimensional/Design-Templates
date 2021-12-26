<template>
  <component
    :is="tag"
    :style="styleProps"
    class="l-text-component"
    @click="handleClick"
  >
    {{ text }}
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import {
  textStylePropNames,
  transformToComponentProps,
  textDefaultProps,
} from "../defaultProps";
import { pick } from "lodash-es";
import useComponentCommon from "../hooks/useComponentCommon";
const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  name: "l-text",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      textStylePropNames
    );
    return {
      styleProps,
      handleClick,
    };
  },
});
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
