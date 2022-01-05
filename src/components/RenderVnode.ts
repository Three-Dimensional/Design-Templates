import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  setup(props) {
    return () => (props.vNode)
  }
})