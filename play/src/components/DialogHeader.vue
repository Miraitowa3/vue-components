<template>
    <div class="dialog-header">
        <div class="dialog-tool" :class="[isMac() ? 'is-mac' : 'is-win']">
            <span title="放大/缩小" @click.stop="fullScreen" v-if="isMac()"
                ><i class="d-icon" style="font-size: 8px"> <svg-icon name="jian" v-if="isFullScreen"></svg-icon><svg-icon name="fangda" v-else></svg-icon> </i
            ></span>
            <span title="放大/缩小" @click.stop="fullScreen" v-else
                ><i class="d-icon" style="font-size: 14px"> <svg-icon name="wins" v-if="isFullScreen"></svg-icon><svg-icon name="wind" v-else></svg-icon> </i
            ></span>

            <span title="关闭" @click.stop="close"
                ><i class="d-icon" style="font-size: 8px; transform: scale(0.96)"> <svg-icon name="closew"></svg-icon> </i
            ></span>
        </div>
        <div class="dialog-title"></div>
    </div>
</template>

<script lang="ts" setup>
import { isMac } from "@/utils";

const isFullScreen = ref(false);
const emits = defineEmits(["close", "fullScreen"]);
function close() {
    emits("close");
}
function fullScreen() {
    isFullScreen.value = !isFullScreen.value;
    emits("fullScreen", isFullScreen.value);
}
</script>
<style scoped lang="scss">
.dialog-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 5px;
    text-align: center;
    color: var(--d-main);
    z-index: 12;
    .dialog-title {
        text-align: center;
        color: var(--d-main);
    }
    .dialog-tool {
        color: var(--d-main);
        overflow: hidden;
        position: absolute;
        text-align: center;
        font-size: 14px;
        z-index: 99;
        top: 8px;
        right: 6px;

        &.is-win {
            span:last-child:hover {
                background-color: #e81123;
                color: #fff;
            }
            span:hover {
                background-color: #999;
                color: #333;
            }
            span {
                float: left;
                line-height: 20px;
                width: 20px;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                height: 20px;
                color: #fff;
                margin-right: 6px;
                background-color: #00000042;
            }
        }

        &.is-mac {
            &:hover .d-icon {
                display: block;
            }
            & span:nth-child(2) {
                background-color: #ff5f56;
            }
            span {
                transition: 0.2s;
                cursor: pointer;
                line-height: 12px;
                font-size: 12px;
                color: #333;
                display: block;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                margin-right: 12px;
                float: left;
                display: flex;
                align-items: center;
                justify-content: center;

                i {
                    display: none;
                }

                background-color: #1aab29;
            }
        }
    }
}
</style>
