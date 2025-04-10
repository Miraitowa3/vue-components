export default function useContentMenu(containerRef: string, hanlderCallback: (event: MouseEvent) => boolean) {
    const showMenu = ref(false);
    const x = ref(0);
    const y = ref(0);
    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        // event.stopPropagation();
        const isContinue = hanlderCallback(event);

        if (!isContinue) return;
        showMenu.value = true;
        x.value = event.clientX;
        y.value = event.clientY;
    };
    const closeMenu = (event: MouseEvent) => {
        showMenu.value = false;
    };
    onMounted(() => {
        const div = document.querySelector(containerRef) as HTMLDivElement;
        if (!div) return;
        div.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("click", closeMenu, true); //在捕获阶段处理（防止元素上阻止事件冒泡）
        window.addEventListener("contextmenu", closeMenu, true); //关闭其它的右键菜单
    });
    onUnmounted(() => {
        const div = document.querySelector(containerRef) as HTMLDivElement;
        if (!div) return;
        div.removeEventListener("contextmenu", handleContextMenu);
        window.removeEventListener("click", closeMenu);
        window.removeEventListener("contextmenu", closeMenu);
    });
    return { showMenu, x, y, closeMenu };
}
