<template>
    <Teleport to="body">
        <Transition @before-enter="handleBeforeEnter" @enter="enter" @leave="leave" @before-leave="onBeforeLeave">
            <Overlay v-if="show">
                <div class="popup" @click="close">
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
    dlogClass?: string;
    width?: string;
    time?: string;
    direction?: Direction;
}
const directionMap = {
    top: {
        top: "0",
        left: "0",
        width: "100%",
        height: "40%",
        start: "translateY(-100%)",
        end: "translateY(0)",
    },
    bottom: {
        bottom: "0",
        left: "0",
        width: "100%",
        height: "40%",
        start: "translateY(100%)",

        end: "translateY(0)",
    },
    left: {
        left: "0",
        top: "0",
        width: "40%",
        height: "100%",
        start: " translateX(-100%)",

        end: "translateX(0)",
    },
    right: {
        right: "0",
        top: "0",
        width: "40%",
        height: "100%",
        start: "translateX(100%)",

        end: "translateX(0)",
    },
};
const props = withDefaults(defineProps<Props>(), {
    dlogClass: "",
    width: "30%",
    time: "0.3s",
    direction: "right",
});

function handleBeforeEnter(e: Element) {
    let d = directionMap[props.direction];
    for (const key in d) {
        if (!(key === "start" || key === "end")) {
            (e.children[0] as HTMLElement).style[key as any] = d[key as keyof typeof d];
        }
    }
    (e as HTMLElement).style.opacity = "0";
    (e.children[0] as HTMLElement).style.transform = d.start;
}
function close() {
    show.value = false;
}
function onBeforeLeave(e: Element) {}
function enter(e: Element, done: () => void) {
    let d = directionMap[props.direction];

    requestAnimationFrame(() => {
        (e.children[0] as HTMLElement).style.transform = d.end;
        (e as HTMLElement).style.opacity = "1";

        (e.children[0] as HTMLElement).style.transition = "all 0.3s ease";
        (e as HTMLElement).style.transition = "all 0.3s ease";
    });
    e.children[0].addEventListener("transitionend", done);
}
function leave(e: Element, done: () => void) {
    let d = directionMap[props.direction];
    requestAnimationFrame(() => {
        (e.children[0] as HTMLElement).style.transform = d.start;
        (e as HTMLElement).style.opacity = "0";
    });
    e.children[0].addEventListener("transitionend", done);
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
</style>
