<template>
    <Teleport to="body">
        <Transition @before-enter="handleBeforeEnter" @enter="enter" @leave="leave" @before-leave="onBeforeLeave">
            <Overlay v-if="show" @click="modalClose" :customStyle="{ background: overlay ? 'rgba(0,0,0,0.5)' : 'transparent' }">
                <div class="overlay-dialog" @click="modalClose">
                    <div :class="['dialog', customClass]" :style="{ width: width, ...customStyle }">
                        <i class="absolute right-3 top-3 cursor-pointer text-[30px] text-[#909399] hover:text-[#1890ff]" v-if="closeIcon" @click="close">
                            <svg-icon name="close"></svg-icon>
                        </i>
                        <slot></slot>
                    </div>
                </div>
            </Overlay>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
const show = defineModel("show");
interface Props {
    customClass?: string;
    width?: string;
    time?: string;
    closeOnClickModal?: boolean;
    closeIcon?: boolean;
    overlay?: boolean;
    customStyle?: any;
}

const props = withDefaults(defineProps<Props>(), {
    dlogClass: "",
    width: "30%",
    time: "0.3s",
    closeOnClickModal: true,
    closeIcon: true,
    overlay: true,
    customStyle: {},
});

function handleBeforeEnter(e: Element) {
    (e.children[0] as HTMLElement).style.animation = `${props.time} ease 0ms dialog-fade-in`;
    (e as HTMLElement).style.animation = `${props.time} ease 0ms modal-fade-in`;
}

function onBeforeLeave(e: Element) {
    (e.children[0] as HTMLElement).style.animation = `${props.time} ease 0ms dialog-fade-out`;
    (e as HTMLElement).style.animation = `${props.time} ease 0ms modal-fade-out`;
}
function enter(e: Element, done: () => void) {
    const dialogElement = e.children[0] as HTMLElement;
    dialogElement.addEventListener(
        "animationend",
        () => {
            done();
            (e.children[0] as HTMLElement).style.animation = "none";
            (e as HTMLElement).style.animation = "none";
        },
        { once: true },
    );
}
function leave(e: Element, done: () => void) {
    const dialogElement = e.children[0] as HTMLElement;
    dialogElement.addEventListener(
        "animationend",
        () => {
            done();
            (e.children[0] as HTMLElement).style.animation = "none";
            (e as HTMLElement).style.animation = "none";
        },
        { once: true },
    );
}
function close() {
    show.value = false;
}
function modalClose(e: MouseEvent) {
    e.stopPropagation();

    if (e.target === e.currentTarget && props.closeOnClickModal) {
        close();
    }
}
</script>
<style>
.dialog {
    position: fixed;
    background: #ffffff;
    border-radius: 12px;
    box-shadow:
        0px 12px 32px 4px rgba(0, 0, 0, 0.04),
        0px 8px 20px rgba(0, 0, 0, 0.08);
    box-sizing: border-box;
    margin: 10vh auto 50px;
    overflow-wrap: break-word;
    padding: 16px;
    position: relative;
}
.overlay-dialog {
    bottom: 0;
    left: 0;

    right: 0;
    top: 0;
    z-index: 2007;
}
@keyframes dialog-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);

        opacity: 0;
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes dialog-fade-out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(0, -20px, 0);
        opacity: 0;
    }
}

@keyframes modal-fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes modal-fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
