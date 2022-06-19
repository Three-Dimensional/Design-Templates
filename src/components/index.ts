import { App } from 'vue'
import Icon from './Icon/index.vue'

export const registerComponent = (app: App) => {
    app.component(Icon.name, Icon)
}