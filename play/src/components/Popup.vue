<template>
    <Teleport to="body">
        <Transition name="popue-fade" @before-enter="handleBeforeEnter">
            <Overlay v-if="show" @click="modalClose">
                <div :class="['popup', 'look', customClass]">
                    <slot></slot>
                </div>
            </Overlay>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
type Direction = "bottom" | "top" | "left" | "right";
const show = defineModel("show");

interface Props {
    customClass?: string;
    width?: string;
    time?: string;
    direction?: Direction;
    closeOnClickModal?: boolean;
    modalClass?: string;
}
const directionMap = {
    top: {
        initAttr: {
            top: "0",
            left: "0",
            width: "100%",
            height: "40%",
        },

        from: "translateY(-100%)",
        to: "translateY(0)",
    },
    bottom: {
        initAttr: {
            bottom: "0",
            left: "0",
            width: "100%",
            height: "40%",
        },
        from: "translateY(100%)",

        to: "translateY(0)",
    },
    left: {
        initAttr: {
            left: "0",
            top: "0",
            width: "40%",
            height: "100%",
        },
        from: " translateX(-100%)",

        to: "translateX(0)",
    },
    right: {
        initAttr: {
            right: "0",
            top: "0",
            width: "40%",
            height: "100%",
        },
        from: "translateX(100%)",
        to: "translateX(0)",
    },
};
const props = withDefaults(defineProps<Props>(), {
    customClass: "",
    width: "30%",
    time: "0.3s",
    direction: "right",
    closeOnClickModal: true,
    modalClass: "",
});
let d = directionMap[props.direction];
function close() {
    show.value = false;
}
function modalClose(e: MouseEvent) {
    e.stopPropagation();

    if (e.target === e.currentTarget && props.closeOnClickModal) {
        close();
    }
}
function handleBeforeEnter(e: Element) {
    for (const key in d.initAttr) {
        (e.children[0] as HTMLElement).style[key as any] = d.initAttr[key as keyof typeof d.initAttr];
    }
}
</script>
<style scoped>
.popup {
    position: absolute;

    background: #ffffff;

    /* box-shadow:
        0px 12px 32px 4px rgba(0, 0, 0, 0.04),
        0px 8px 20px rgba(0, 0, 0, 0.08); */
    box-sizing: border-box;
    overflow-wrap: break-word;
    padding: 16px;
}
.popue-fade-enter-active,
.popue-fade-leave-active,
.popue-fade-enter-active .look,
.popue-fade-leave-active .look {
    transition: all 0.3s ease;
}
.popue-fade-enter-from,
.popue-fade-leave-to {
    opacity: 0;
}

.popue-fade-enter-to,
.popue-fade-leave-from {
    opacity: 1;
}

.popue-fade-enter-from .look,
.popue-fade-leave-to .look {
    transform: v-bind("d.from");
}

.popue-fade-enter-to .look,
.popue-fade-leave-from .look {
    transform: v-bind("d.to");
}
</style>
