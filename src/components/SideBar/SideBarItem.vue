<template>
    <div v-if="menuObj.visibility">
        <template v-if="menuObj.children && menuObj.children.length > 0">
            <el-submenu :index="menuObj.id + '-sub'">
                <template slot="title">
                    <i :class="menuObj.menuIcon"></i>
                    <span>{{menuObj.menuLabel}}</span>
                </template>
                <side-bar-item v-for="item of menuObj.children"
                               :key="item.id"
                               :menu-obj="item"></side-bar-item>
            </el-submenu>
        </template>
        <template v-else>
            <router-link :to="menuObj.menuUrl" tag="div">
                <el-menu-item :index="menuObj.menuUrl">
                    <i :class="menuObj.menuIcon"></i>
                    <span>{{menuObj.menuLabel}}</span>
                </el-menu-item>
            </router-link>
        </template>
    </div>
</template>

<script>
    export default {
        name: "SideBarItem",
        props: {
            menuObj: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>