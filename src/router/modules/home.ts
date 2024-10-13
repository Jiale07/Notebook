import matters from "@/router/modules/matters";
import note from '@/router/modules/note'
import bill from "@/router/modules/bill";

export default [
    {
        path: '/',
        nane: 'Home',
        component: ()=> import('@/views/home/index.vue'),
        children: [...matters, ...note, ...bill],
        meta: {
            title: '主页',
            requireAuth: true,
        }
    }
]
