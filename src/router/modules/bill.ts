export default [
    {
        path: '/home/bill',
        name: 'Bill',
        component: () => import('@/views/bill/billRecord.vue'),
        meta: {
            title: '账本记录'
        }
    }
]
