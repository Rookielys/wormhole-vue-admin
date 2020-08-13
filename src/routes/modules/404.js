const notFoundRoutes = [
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

export default notFoundRoutes;