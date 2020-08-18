<template>
    <div class="layout-container">
        <el-container style="height: 100%;">
            <el-aside width="240px">
                <div class="logo-container"></div>
            </el-aside>
            <el-container>
                <el-header>
                    <i :class="{'el-icon-s-fold': !isCollapsed, 'el-icon-s-unfold': isCollapsed}" style="font-size: 1.8em; cursor: pointer;"></i>
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
    export default {
        name: "index",
        data() {
            return {
                isCollapsed: false
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