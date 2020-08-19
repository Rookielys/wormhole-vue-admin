<template>
    <div>
        <el-menu mode="vertical"
                 :unique-opened="true"
                 :collapse="isCollapse"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
            <side-bar-item v-for="m of menuList"
                           :key="m.id"
                           :menu-obj="m"></side-bar-item>
        </el-menu>
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
            isCollapse: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-menu {
        border: none;
    }
</style>