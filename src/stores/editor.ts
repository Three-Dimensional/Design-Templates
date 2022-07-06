import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ComponentData, NewComponentProps } from './interface'

export const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: 'LText',
    text: 'hello',
    props: {
      fontSize: 20,
      width: 125,
      height: 36,
      color: 'red',
      lineHeight: 1,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      transform: 'matrix(1, 0, 0, 1, 100, 20)',
      rotate: 0
    }
  },
  {
    id: uuidv4(),
    name: 'LText',
    text: 'hello2',
    props: {
      fontSize: 10,
      width: 125,
      height: 36,
      fontWeight: 'bold',
      lineHeight: 2,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      transform: 'matrix(1, 0, 0, 1, 150, 50)',
      rotate: 0
    }
  },
  {
    id: uuidv4(),
    name: 'LText',
    text: 'hello3',
    props: {
      fontSize: 15,
      width: 125,
      height: 36,
      actionType: 'url',
      url: 'https://www.baidu.com',
      lineHeight: 3,
      textAlign: 'left',
      fontFamily: '',
      opacity: 1,
      transform: 'matrix(1, 0, 0, 1, 200, 100)',
      rotate: 0
    }
  }
]

const useEditorStore = defineStore('editor', {
  state: () => ({
    components: testComponents,
    currentElement: ''
  }),

  getters: {
    getCurrentElement(state) {
      return state.components.find((component) => component.id === state.currentElement)
    }
  },

  actions: {
    addComponent(props: NewComponentProps) {
      const addComponent: ComponentData = {
        name: 'LText',
        id: uuidv4(),
        text: 'test',
        props
      }
      this.components.push(addComponent)
    },
    removeComponent(id: string) {
      this.components = this.components.filter((item) => item.id !== id)
    },
    setActive(id: string) {
      this.currentElement = id
    },
    updateComponent({ key, value }: { key: string; value: any }) {
      const updatedComponent = this.components.find(
        (component) => component.id === this.currentElement
      )
      if (updatedComponent) {
        updatedComponent.props[key as keyof ComponentData] = value
      }
    }
  }
})

export default useEditorStore
