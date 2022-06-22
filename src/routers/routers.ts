import TemplateDetail from '../views/template/TemplateDetail.vue'
import Home from '../views/home/home.vue'
import Index from '../views/index.vue'

const routers = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: 'template/:id',
        name: 'template',
        component: TemplateDetail
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/editor.vue')
  }
]

export default routers
