<template>
    <div class="slider flex items-center">
        <span class="slider-title" v-if="title">{{ title }} </span>

        <div class="flex-1"><el-slider v-model="value" show-input size="small" v-bind="attrs" /></div>

        <span class="slider-value">{{ unit }} </span>
    </div>
</template>

<script lang="ts" setup>
import { SliderProps } from "element-plus";
const value = defineModel<number>();

const props = defineProps<{
    unit?: string;
    title?: string;
    attrs?: Partial<SliderProps>;
}>();
</script>

<style scoped lang="scss">
.slider {
    line-height: 36px;
    font-size: 13px;
    .slider-title {
        min-width: 60px;
        white-space: no-wrap;
    }
    .slider-value {
        text-align: right;
    }
}
:deep(.el-input-number--small) {
    width: 40px;
}

:deep(.el-slider__runway) {
    height: 4px;
    .el-slider__bar {
        height: 4px;
    }
    &.show-input {
        margin-right: 0px;
    }
    .el-slider__button-wrapper {
        box-shadow: none;
        top: -16px;
        .el-slider__button {
            width: 16px;
            height: 16px;
        }
    }
}
:deep(.el-input-number) {
    .el-input-number__decrease,
    .el-input-number__increase {
        font-size: 12px;
        background: transparent;
        height: 11px;
        border: none;
        width: 15px;
        opacity: 0;
        &:hover {
            .el-input__wrapper {
                box-shadow: 0 0 0 1px #c0c4cc inset !important;
            }
        }
    }
    .el-input-number__decrease {
        right: 1px;
        bottom: 1px;
        top: auto;
        left: auto;
        border-right: none;
        border-radius: 0 0 4px;
        line-height: 13px;
    }
    .el-input-number__increase {
        right: 1px;
    }
    .el-input {
        &.is-disabled {
            .el-input__wrapper {
                box-shadow: 0 0 0 1px #c0c4cc inset;
            }
        }
        width: 40px;
        font-size: 12px;
        .el-input__wrapper {
            padding: 0;
            box-shadow: none;
            &.is-focus {
                box-shadow: 0 0 0 1px #c0c4cc inset;
            }
        }
        .el-input__inner {
            text-align: right;
            padding-right: 2px;
            transition: 0.2s;
            background-color: transparent;
        }
    }
    &:hover {
        .el-input-number__decrease,
        .el-input-number__increase {
            opacity: 1;
            .el-input__wrapper {
                box-shadow: 0 0 0 1px #c0c4cc inset;
            }
        }
        .el-input__wrapper {
            box-shadow: 0 0 0 1px #c0c4cc inset;
        }
        .el-input__inner {
            padding-right: 15px !important;
        }
    }
}
</style>
