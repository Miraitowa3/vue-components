<!-- src/components/SvgIcon.vue -->
<template>
    <svg aria-hidden="true" class="svg-icon">
        <use :href="symbolId" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    // 图标名称
    name: {
        type: String,
        required: true,
    },
});

// 计算图标的symbolId
const symbolId = computed(() => `#icon-${props.name}`);
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
}
</style>
