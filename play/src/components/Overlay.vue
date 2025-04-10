<template>
    <div :class="['overlay', customClass]" :style="customStyle">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    customClass?: string;
    customStyle?: any;
}
const props = withDefaults(defineProps<Props>(), {
    customClass: "",
    customStyle: {},
});
</script>
<style scoped>
.overlay {
    background-color: var(--el-overlay-color-lighter);
    bottom: 0;
    height: 100vh;
    left: 0;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2007;
    overflow: hidden;
}
</style>
