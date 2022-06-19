import TemplateDetail from '../views/TemplateDetail.vue'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'

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
    component: () => import('@/views/editor/Editor.vue')
  }
]

export default routers
