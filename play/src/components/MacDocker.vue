<template>
    <div class="mac-docker">
        <div class="menu">
            <template v-for="(item, index) in list" :key="item.name">
                <div class="item" :draggable="true" :style="{ 'background-color': item.color }"></div>
                <!-- <div class="gap" v-if="index < list.length - 1"></div> -->
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const list = ref([
    {
        name: "Tab1",
        color: "#1abc9c",
    },
    {
        name: "Tab2",
        color: "#f1c40f",
    },
    {
        name: "Tab3",
        color: "#2ecc71",
    },
    {
        name: "Tab4",
        color: "#e67e22",
    },
    {
        name: "Tab5",
        color: "#e74c3c",
    },
    {
        name: "Tab6",
        color: "#3498db",
    },

    {
        name: "Tab7",
        color: "#8e44ad",
    },
    {
        name: "Tab8",
        color: "#f39c12",
    },
    {
        name: "Tab9",
        color: "#1abc9c",
    },
    {
        name: "Tab10",
        color: "#f1c40f",
    },
    {
        name: "Tab11",
        color: "#2ecc71",
    },
    {
        name: "Tab12",
        color: "#e67e22",
    },
    {
        name: "Tab13",
        color: "#e74c3c",
    },
    {
        name: "Tab14",
        color: "#3498db",
    },

    {
        name: "Tab15",
        color: "#8e44ad",
    },
    {
        name: "Tab16",
        color: "#f39c12",
    },
]);
onMounted(() => {
    const docker = document.querySelector(".mac-docker") as HTMLDivElement;
    const items = document.querySelector(".menu")!.children;
    const range = 400;
    const maxScale = 1.6;

    docker.addEventListener("mousemove", (e) => {
        console.log(e.clientX);

        const curve = createCurve(range, e.clientX, 1, maxScale);
        layout(curve);
    });
    function layout(curve: Function) {
        for (const item of items) {
            const rect = item.getBoundingClientRect();
            const x = rect.x + rect.width / 2;
            const scale = curve(x);
            (item as HTMLDivElement).style.setProperty("--i", scale);
        }
    }
    docker.addEventListener("mouseleave", (e) => {
        layout(() => 1);
    });

    class Filp {
        el: string;
        elements: HTMLElement[];
        lastLocation: DOMRect[];
        startLocation: DOMRect[];

        constructor({ el }: { el: string }) {
            this.el = el;
            this.elements = Array.from(this.getElement(el)[0].children) as HTMLElement[];

            this.startLocation = this.getLoacton(this.elements);
            this.lastLocation = [];
        }
        getElement(el: string) {
            return Array.from(document.querySelectorAll(el));
        }
        start() {
            this.elements = Array.from(this.getElement(this.el)[0].children) as HTMLElement[];
            this.startLocation = this.getLoacton(this.elements);
        }
        last() {
            this.lastLocation = this.getLoacton(this.elements);
        }
        play() {
            this.last();
            this.invert();
        }
        invert() {
            const diff = this.startLocation.map((first, index) => {
                const last = this.lastLocation[index];
                return {
                    left: first.left - last.left,
                    top: first.top - last.top,
                };
            });
            this.elements.forEach((element, index) => {
                const { left, top } = diff[index];
                element.animate(
                    [
                        {
                            transform: `translate(${left}px, ${top}px)`,
                        },
                        {
                            transform: "none",
                        },
                    ],
                    {
                        duration: 600,
                        easing: `cubic-bezier(0.33, 1, 0.68, 1)`,
                    },
                );
            });
        }
        getLoacton(elements: HTMLElement[]) {
            return elements.map((el) => el.getBoundingClientRect());
        }
    }
    let souceNode: any;
    var container = document.querySelector(".menu") as HTMLDivElement;
    let Fliap = new Filp({ el: ".menu" });
    container.ondragstart = (e) => {
        setTimeout(() => {
            (e.target as HTMLElement).classList.add("moving");
        }, 0);

        souceNode = e.target;
        (e.dataTransfer as DataTransfer).effectAllowed = "move";
    };
    container.ondragover = (e) => {
        e.preventDefault();
    };
    container.ondrag = (e) => {
        const curve = createCurve(range, e.clientX, 1, maxScale);
        layout(curve);
    };
    container.ondragenter = (e) => {
        e.preventDefault();
        if (e.target === container || e.target === souceNode) {
            return;
        }
        const children = Array.from(container.children);
        const souceNodeIndex = children.indexOf(souceNode);
        const targetNodeIndex = children.indexOf(e.target as HTMLElement);
        Fliap.start();
        if (souceNodeIndex < targetNodeIndex) {
            container?.insertBefore(souceNode, (e.target as HTMLElement).nextElementSibling);
            console.log("向下拖动");
        } else {
            container?.insertBefore(souceNode, e.target as HTMLElement);

            console.log("向上拖动");
        }
        Fliap.play();
    };
    container.ondragend = (e) => {
        (e.target as HTMLElement).classList.remove("moving");
    };
});

function baseCurve(x: number) {
    if (x < 0) return 0;
    if (x > 1) return 0;
    return Math.sin(x * Math.PI);
}
function createCurve(totalXDis: number, topX: number, minY: number, maxY: number) {
    return function curves(x: number) {
        const beginX = topX - totalXDis / 2;
        const endX = topX + totalXDis / 2;
        if (x < beginX) return minY;
        if (x > endX) return minY;
        const yDis = maxY - minY;

        return baseCurve((x - beginX) / totalXDis) * yDis + minY;
    };
}
</script>
<style scoped>
.mac-docker {
    height: 70px;
    font-size: 14px;
    box-sizing: border-box;
    padding: 11px 0;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    border: 1px solid #ccc;
}
.item {
    height: calc(var(--i, 1) * 48px);
    width: calc(var(--i, 1) * 48px);
    border: 1px solid #ccc;
    margin-bottom: calc(var(--i, 1) * 30px - 30px);
    margin-right: calc(var(--i, 1) * 10px);
}
.moving {
    background: transparent;
    border: 1px dashed red;
    color: transparent !important;
    opacity: 0;
}
.gap {
    width: calc(var(--i, 1) * 10px);
    height: 48px;
}
.menu {
    display: flex;
    width: 100%;
    /* align-items: center; */
    align-items: flex-end;
    height: 100%;
}
</style>
