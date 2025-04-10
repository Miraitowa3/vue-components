import s from "./styles/Tabs.module.css";
export default defineComponent({
    emits: ["change","update:modelValue"],
    props: {
        list: {
            type: Array as PropType<Array<{ label: string; value: string }>>,
            default: () => [],
        },
        modelValue: {
            type: String,
            default: "",
        },
    },

    setup(props, { emit }) {
        const cur = ref<number>(0);
        const lineRef = ref<HTMLElement>();
        const tabHeader = ref<HTMLElement>();
        const handleClick = (index: number) => {
            cur.value = index;

            emit("change",props.list[cur.value].value);
            emit("update:modelValue",props.list[cur.value].value);

            setLineStyle();
        };

        const tabList = ref<any>([
        ]);
        watch(
            () => props.list,
            () => {
                let f = props.list.findIndex((item) => item.value === props.modelValue);
                if (f !== -1) {
                    cur.value = f;
                    nextTick(() => {
                        const items = Array.from(tabHeader.value!.children) as HTMLElement[];
                        items.forEach((item: HTMLElement, index: number) => {
                            let rect = item.getBoundingClientRect();
                            tabList.value[index] = {
                                ...props.list[index],
                                width: rect.width,
                                left: rect.left,
                            };
                        });

                        setLineStyle();
                    });
                }
            },
            {
                deep: true,
                immediate: true,
            },
        );

        const renderItem = () => {
            return props.list.map((item, index) => (
                <li onClick={() => handleClick(index)} key={index + item.value} class={[s["tabs-header-item"], cur.value === index ? s.active : ""]}>
                    {item.label}
                </li>
            ));
        };

        function setLineStyle() {
            const line = lineRef.value;
            line!.style.width = `${tabList.value[cur.value].width}px`;
            line!.style.transform = `translateX(${tabList.value[cur.value].width * cur.value}px)`;
        }
        return () => (
            <div class="tabs">
                <ul class="tabs-header flex" ref={tabHeader}>
                    {renderItem()}
                </ul>
                <div class={s.line} ref={lineRef}></div>
            </div>
        );
    },
});
