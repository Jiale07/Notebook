export default [
    {
        path: '/home/note',
        name: 'Note',
        component: () => import('@/views/note/index.vue'),
        meta: {
            title: '笔记'
        }
    }
]
