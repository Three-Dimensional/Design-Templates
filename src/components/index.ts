import { App } from 'vue'
import Icon from './Icon/index.vue'

// eslint-disable-next-line import/prefer-default-export
export const registerComponent = (app: App) => {
  app.component(Icon.name, Icon)
}
