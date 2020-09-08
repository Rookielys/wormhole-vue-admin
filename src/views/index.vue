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
                    <div class="user-info">
                        <el-avatar
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <el-dropdown trigger="click">
                            <span style="cursor: pointer;">
                              admin
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div class="el-dropdown-item__inner">
                                        <svg-icon icon-class="setting"></svg-icon>
                                        <span>修改密码</span>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item :divided="true">
                                    <div class="el-dropdown-item__inner">
                                        <svg-icon icon-class="logout"></svg-icon>
                                        <span>退出登录</span>
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
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
                                children: []
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
            justify-content: space-between;
            background-color: aquamarine;

            .user-info {
                display: flex;
                align-items: center;
                height: 100%;

                .el-dropdown {
                    margin-left: 10px;
                    height: 100%;
                    display: flex;
                    align-items: center;

                    .el-dropdown-selfdefine {
                        &:focus {
                            outline: none;
                        }
                    }

                }
            }
        }

        .el-aside {
            background-color: #001529;
        }
    }
</style>