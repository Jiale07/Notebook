export default [
    {
        path: '/home/matter',
        name: 'Matters',
        component: () => import('@/views/matters/index.vue'),
        meta: {
            title: '事项'
        },
    }
]
