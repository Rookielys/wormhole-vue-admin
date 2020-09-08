<template>
    <div class="sidebar-container">
        <el-scrollbar style="height: 100%;">
            <el-menu mode="vertical"
                     :unique-opened="true"
                     :collapse="isCollapsed"
                     background-color="#001529"
                     text-color="#C0C4CC"
                     active-text-color="#ffffff"
                     class="el-menu-vertical-demo">
                <side-bar-item v-for="m of menuList"
                               :key="m.id"
                               :menu-obj="m"></side-bar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import SideBarItem from '@/components/SideBar/SideBarItem.vue'

    export default {
        name: "SideBarIndex",
        components: {
            SideBarItem
        },
        props: {
            menuList: {
                type: Array,
                required: true
            },
            isCollapsed: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .sidebar-container {
        height: calc(100% - 60px);

        /deep/ .el-menu--inline {
            .el-menu-item {
                background-color: #000c17 !important;
            }
        }
        .el-menu {
            border: none;
            /deep/ .is-active {
                background-color: #1890ff !important;
            }
            /deep/ .el-menu-item {
                &:hover {
                    color: #ffffff !important;
                }
            }
            /deep/ .el-submenu__title {
                &:hover {
                    color: #ffffff !important;
                }
            }
        }



        // 必须要加这个动画才能正常工作
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 240px;
            //min-height: 400px;
        }

        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }
</style>