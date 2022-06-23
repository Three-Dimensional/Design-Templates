const routers = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/home.vue')
      },
      {
        path: 'template/:id',
        name: 'template',
        component: () => import('@/views/template/template.vue')
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/editors.vue')
  }
]

export default routers
