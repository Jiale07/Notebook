export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/login/index.vue"),
        meta: {
            title: '登录页面',
        }
    },
    {
        path: '/error',
        name: 'Error',
        component: () => import('@/views/error/index.vue'),
        meta: {
            title: '错误页面',
        }
    }
]
