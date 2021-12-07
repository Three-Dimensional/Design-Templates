import TemplateDetail from '../views/TemplateDetail.vue'
import Home from '../views/Home.vue'
import Editor from '../views/Editor.vue'
import Index from '../views/Index.vue'

let routers = [
  // {
  //   path: '/',
  //   name: 'login',
  //   title: '登录',
  //   component: () => import('../view/login.vue'),
  // },
  // {
  //   path: '/home',
  //   name: 'home',
  //   title: '首页',
  //   component: () => import('../view/home/Home.vue'),
  // },
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'template/:id',
        name: 'template',
        component: TemplateDetail,
      },
    ],
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
  },
]

export default routers
