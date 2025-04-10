<template>
    <div class="slider flex items-center justify-between">
        <span class="slider-title" v-if="title">{{ title }} </span>
        <el-switch v-model="value" size="small" v-bind="attrs" />
    </div>
</template>

<script lang="ts" setup>
import { SwitchProps } from "element-plus";
const value = defineModel<SwitchProps["activeValue"]>();

const props = defineProps<{
    title?: string;
    attrs?: Partial<SwitchProps>;
}>();
</script>

<style scoped lang="scss">
.slider {
    line-height: 36px;
    font-size: 13px;
    .slider-title {
        min-width: 60px;
    }
    .slider-value {
        text-align: right;
    }
}
</style>
