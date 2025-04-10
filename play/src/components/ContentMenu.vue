<template>
    <Teleport to="body">
        <Transition @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter" @enter="handleEnter">
            <div
                id="content-menu"
                class="content-menu fixed"
                v-if="showMenu"
                :style="{
                    left: `${x}px`,
                    top: `${y}px`,
                }"
            >
                <slot></slot>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import useContentMenu from "@/hooks/useContentMenu";

const props = defineProps({
    containerRef: {
        type: String,
        required: true,
    },
    hanlderCallback: {
        type: Function as PropType<(e: MouseEvent) => boolean>,
        required: true,
    },
});
const { showMenu, x, y, closeMenu } = useContentMenu(props.containerRef, props.hanlderCallback);

function handleBeforeEnter(e: Element) {
    // e.classList.add("animation");
}
function handleAfterEnter(e: Element) {
    // e.classList.remove("animation");
}
function handleEnter(e: Element) {
    e.classList.add("animation");
    let h = (e as HTMLElement).offsetHeight;
    let w = (e as HTMLElement).offsetWidth;
    let wH = window.innerHeight;
    let wW = window.innerWidth;
    if (x.value + w > wW) {
        x.value = wW - w;
    }
    if (y.value + h > wH) {
        y.value = wH - h;
    }
}
defineExpose({
    closeMenu,
});
</script>
<style scoped>
.content-menu {
    z-index: 999;
    overflow: hidden;
    padding: 5px 4px;
    box-shadow: #00000080 0 10px 30px;
    background-color: #0b0b0bcc;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(11, 11, 11, 0.2);
    width: 140px;
    border-radius: 8px;
}

@keyframes scale {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    60% {
        transform: scale(1.03);
        opacity: 1;
    }
    100% {
        transform: scale(1);
    }
}
.animation {
    animation: 200ms ease 0ms 1 normal both running scale;
    transform-origin: 0% 0%;
}
</style>
