let routers = [
  {
    path: '/',
    name: 'login',
    title: '登录',
    component: () => import('../view/login.vue'),
  },
]

export default routers
