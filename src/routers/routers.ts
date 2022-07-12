// const modules = ('../../views/*/*.vue');

const routers = [
  {
    path: '/',
    name: 'index',
    component: () => import.meta.glob('@/views/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import.meta.glob('@/views/home/home.vue')
      },
      {
        path: 'template/:id',
        name: 'template',
        component: () => import.meta.glob('@/views/template/template.vue')
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import.meta.glob('@/views/editor/editors.vue')
  }
]

export default routers
