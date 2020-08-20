<template>
    <svg class="svg-icon" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    export default {
        name: "SvgIcon",
        props: {
            iconClass: {
                type: String,
                required: true
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            }
        }
    }
</script>

<style scoped lang="scss">
    .svg-icon {
        width: 24px;
        height: 18px;
        //vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>