<template>
    <div class="layout-container">
        <el-container style="height: 100%;">
            <el-aside width="auto">
                <div class="logo-container"></div>
                <side-bar :menu-list="menus" :is-collapsed="isCollapsed"></side-bar>
            </el-aside>
            <el-container>
                <el-header>
                    <i :class="{'el-icon-s-fold': isCollapsed, 'el-icon-s-unfold': !isCollapsed}"
                       style="font-size: 1.8em; cursor: pointer;"
                       @click="isCollapsed = !isCollapsed"></i>
                </el-header>
                <el-main>d</el-main>
            </el-container>
        </el-container>
        <!--        <keep-alive>-->
        <!--            <router-view/>-->
        <!--        </keep-alive>-->
    </div>
</template>

<script>
    import SideBar from '@/components/SideBar/index.vue'
    export default {
        name: "index",
        components: {
            SideBar
        },
        data() {
            return {
                isCollapsed: false,
                menus: [
                    {
                        id: '1',
                        visibility: true,
                        menuIcon: 'el-icon-location',
                        menuUrl: '/index/1',
                        menuLabel: '菜单一',
                        children: [
                            {
                                id: '11',
                                visibility: true,
                                menuIcon: 'el-icon-location',
                                menuUrl: '/index/11',
                                menuLabel: '选项一',
                                children: [

                                ]
                            }
                        ]
                    },
                    {
                        id: '2',
                        visibility: true,
                        menuIcon: 'el-icon-location',
                        menuUrl: '/index/2',
                        menuLabel: '菜单二',
                        children: []
                    },
                    {
                        id: '3',
                        visibility: true,
                        menuIcon: 'el-icon-location',
                        menuUrl: '/index/3',
                        menuLabel: '菜单三',
                        children: []
                    },
                ]
            };
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped lang="scss">
    .layout-container {
        height: 100%;
        .logo-container {
            height: 60px;
        }
        .el-header {
            display: flex;
            align-items: center;
        }
    }
</style>