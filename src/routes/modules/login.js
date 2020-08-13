const loginRoutes = [
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
    }
];

export default loginRoutes;