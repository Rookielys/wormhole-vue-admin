const baseRoutes = [
    {
        path: '/',
        redirect: {name: 'login'}
    },
    {
        path: '/login',
        name: 'login',
        // 组件动态加载
        // import返回一个Promise，其中是一个异步请求，用来加载我们的组件
        component: () => import('@/views/login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    {
        path: '*',
        redirect: {name: '404'}

    }
];

export default baseRoutes;