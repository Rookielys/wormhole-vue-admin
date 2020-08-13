const indexRoutes = [
    {
        path: '/index',
        component: () => import("@/views/index.vue"),
        children: [
            {
                path: '',
                name: "home",
                component: () => import("@/views/home.vue")
            }
        ]
    }
];

export default indexRoutes;