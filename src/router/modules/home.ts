import matters from "@/router/modules/matters";
import note from '@/router/modules/note'

export default [
    {
        path: '/',
        nane: 'Home',
        component: ()=> import('@/views/home/index.vue'),
        children: [...matters, ...note],
        meta: {
            title: '主页',
            requireAuth: true,
        }
    }
]
