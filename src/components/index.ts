import { App } from 'vue'
import Icon from './Icon/index.vue'

const registerComponent = (app: App) => {
  app.component(Icon.name, Icon)
}

export default registerComponent
