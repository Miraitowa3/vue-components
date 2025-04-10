import { ElButton, ElDivider, ElEmpty } from "element-plus";
import { ResponseData } from "@/typing";
//TODE   需要引入element-plus的样式文件，否则h函数渲染element-plus组件，样式会丢失
 import 'element-plus/theme-chalk/el-divider.css'
 import 'element-plus/theme-chalk/el-empty.css'
 import 'element-plus/theme-chalk/el-button.css'

type listReturnType = Omit<ResponseData<any>, "data"> & {
    result: { id: number; title: string; img: string }[];
    total: number;
};
let data = [] as any;
for (let i = 1; i <= 145; i++) {
    data.push({
        id: i,
        title: "titles",
        thumb: "https://raw.gitcode.com/miraitowa_001/image/raw/master/dist/" + i + ".webp",
        src: "https://raw.gitcode.com/miraitowa_001/image/raw/master/yuan/" + i + ".webp",
    });
}
export const getTestData = (params: { pageSize: number; currentPage: number }): Promise<listReturnType> => {
    const { pageSize, currentPage } = params;

    console.log("🚀 --------------------------------------------🚀");
    console.log("🚀 ~ getTestData ~ currentPage:", currentPage);
    console.log("🚀 --------------------------------------------🚀");

    const total = Math.ceil(data.length / pageSize);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (currentPage > total) {
                resolve({
                    code: 200,
                    message: "请求成功",
                    result: [],
                    total: total,
                });
                return;
            } else {
                resolve({
                    code: 200,
                    message: "请求成功",
                    result: data.slice((currentPage - 1) * pageSize, currentPage * pageSize),
                    total: total,
                });
            }
        }, 1000);
    });
};

interface UseInfiniteScroll {
    pageSize?: number;
    transData?: (tableData: any[]) => any[];
}

export function useInfiniteScroll(fetch: (pageNum: number, pageSize: number) => Promise<any>, options: UseInfiniteScroll): any {
    const sentinelRef = ref<HTMLElement | null>();
    const rootRef = ref<HTMLElement | null>();
    const isLoading = ref<boolean>(false);
    const isFinished = ref<boolean>(false);
    const error = ref<string>();
    const list = ref<any>([]);
    let observer: IntersectionObserver | null = null;
    const page = ref({
        pageNum: 1,
        pageSize: options.pageSize || 20,
        total: 0,
    });
    // 初始化 IntersectionObserver
    const initObserver = () => {

        if (!sentinelRef.value) return;
        observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadMore();
                    }
                });
            },
            {
                root: rootRef.value || null,
                threshold: 0,
                rootMargin: "0px",
            },
        );

        observer.observe(sentinelRef.value as Element);
    };
    function MoreCom() {
        if (isFinished.value) {

            if (list.value.length === 0) {
                return h(
                    ElEmpty,
                    {
                        imageSize: 200,
                    },
                    () => "暂无数据",
                );
            } else {
                return h(
                    "div",
                    {
                        class: "end",
                    },

                    h(ElDivider, {}, () => "已经到底了"),
                );
            }
        } else {

           return   h(
                "div",
                {
                    class: "loading",
                    ref: sentinelRef, // 使用 ref 对象而不是字符串
                },

                h(
                    ElButton,
                    {
                        type: "primary",
                        loading: true,
                    },
                    () => "加载更多",
                ),
            );
        }
    }

    async function loadMore() {
        if (isFinished.value) return; //TODO 已经到底了 ,就不再请求了，否则会一直请求最后一页数据
        isLoading.value = true;
        try {
            const pageNum = page.value.pageNum;
            const pageSize = page.value.pageSize;
            const res = await fetch(pageNum, pageSize);
            if (res.code === 200) {
                page.value.total = res.total;
                list.value = list.value.concat(options.transData ? options.transData(res.result) : res.result);

                if (pageNum >= res.total) {
                    isFinished.value = true;
                } else {
                    page.value.pageNum = page.value.pageNum + 1;
                }
            } else {
                isFinished.value = true;
                error.value = "请求失败";
            }
        } catch (err: any) {
            isFinished.value = true;
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }
    // 组件挂载时初始化
    onMounted(() => {
      setTimeout(() => {
            initObserver();
        }, 0);
    });
    // 组件卸载时清理
    onUnmounted(() => {
        if (observer) {
            // 取消 IntersectionObserver
            observer.disconnect();
        }
    });
    watch(()=>sentinelRef.value,()=>{
        sentinelRef.value && initObserver();
    })
    return {
        sentinelRef,
        loadMore,
        MoreCom,
        rootRef,
        isLoading,
        isFinished,
        list,
    };
}
