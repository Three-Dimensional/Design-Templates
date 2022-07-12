import index from '@/views/index.vue'
import home from '@/views/home/home.vue'
import template from '@/views/template/template.vue'
import editor from '@/views/editor/editors.vue'

const routers = [
  {
    path: '/',
    name: 'index',
    component: () => index,
    children: [
      {
        path: '',
        name: 'home',
        component: () => home
      },
      {
        path: 'template/:id',
        name: 'template',
        component: () => template
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => editor
  }
]

export default routers
