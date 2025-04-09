<template>
    <el-dialog
        v-model="show"
        :width="innerWidth <= 1000 ? '100%' : '1000px'"
        :show-close="false"
        class="add-pic-container"
        :fullscreen="fullscreen"
    >
        <section class="p-body" :style="{ height: fullscreen ? '100%' : '600px' }">
            <div class="flex h-full">
                <aside class="aside">
                    <h2 class="bb text-[18px]">
                        备忘录
                        <span class="notes-sort">
                            <i class="desc sort-caret" @click="isAes = true" :class="{ active: isAes }"></i>
                            <i class="asc sort-caret" :class="{ active: !isAes }" @click="isAes = false"></i>
                        </span>
                    </h2>

                    <ul class="notes-tabs-body" v-if="tabList.length > 0">
                        <li
                            class="notes-tabs-item d-elip"
                            :class="{ active: cur === index }"
                            v-for="(item, index) in tabList"
                            :key="index"
                            @click="cur = index"
                        >
                            <h4 class="d-elip">{{ item.name }}</h4>
                            <time>{{ item.time }}</time>
                            <span class="notes-del" title="删除备忘录">
                                <i style="font-size: 18px" @click="deleteNote(index)">
                                    <svg-icon name="del"></svg-icon>
                                </i>
                            </span>
                            <span class="notes-del fixed" title="固定到桌面">
                                <i style="font-size: 18px" @click="item.fixed = !item.fixed">
                                    <svg-icon name="fixed" v-if="!item.fixed"></svg-icon>
                                    <svg-icon name="no-fixed" v-else></svg-icon>
                                </i>
                            </span>
                        </li>
                    </ul>
                    <div class="empty" v-else>暂无内容</div>
                    <div
                        class="notes-add flex cursor-pointer flex-wrap items-center justify-center"
                        title="新增备忘录"
                    >
                        <i @click="addNote"><svg-icon name="add"></svg-icon></i>
                    </div>
                </aside>
                <main class="main">
                    <DialogHeader @close="show = false" @full-screen="fullScreen" />
                    <div class="note-title">
                        <el-input v-model="tabList[cur].name" placeholder="请输入" />
                    </div>

                    <el-input
                        v-model="tabList[cur].value"
                        placeholder=""
                        class="note-content"
                        type="textarea"
                    />
                    <div class="bottom-tips mt-[5px] flex items-center justify-start text-xs">
                        <span>最后编辑：2025-4-7 18:09:58, 创建：{{ tabList[cur].time }}</span>
                    </div>
                </main>
            </div>
        </section>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { ElDialog, ElInput } from 'element-plus';

const fullscreen = ref(false);
const show = defineModel<boolean>();
const cur = ref(0);
const isAes = ref(true);
const tabList = ref<any>([
    {
        name: 'iTab操作小技巧',
        time: '2025/3/13 11:37',
        fixed: false,
        value: ''
    }
]);

watch(
    () => isAes.value,
    (val) => {
        if (isAes.value) {
            tabList.value.sort((a: any, b: any) => {
                return new Date(a.time).getTime() - new Date(b.time).getTime();
            });
        } else {
            tabList.value.sort((a: any, b: any) => {
                return new Date(b.time).getTime() - new Date(a.time).getTime();
            });
        }
    },
    {
        immediate: true
    }
);
const innerWidth = computed(() => window?.innerWidth);
function fullScreen(isFullScreen: boolean) {
    fullscreen.value = isFullScreen;
}
function addNote() {
    tabList.value.push({
        name: new Date().toLocaleString(),
        time: new Date().toLocaleString(),
        fixed: false
    });
    cur.value = tabList.value.length - 1;
}
function deleteNote(index: number) {
    tabList.value.splice(index, 1);
    cur.value = 0;
}
</script>
<style lang="scss" scoped>
.end {
    margin: 10px 0;

    :deep(.el-divider--horizontal) {
        border-top: 1px solid rgba(var(--alpha-color), 0.1);
        margin: 0;
        position: relative;
        .el-divider__text {
            color: var(--d-sub);
        }
    }
}
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    :deep(.el-button) {
        background: var(--bg-input);
        color: var(--d-main);
        font-size: 14px;
        border-radius: 6px;
        border: none;
        height: 32px;
        padding: 8px 15px;
        white-space: nowrap;
    }
}

.p-body {
    height: 600px;

    .aside {
        position: relative;

        width: 14%;
        background: var(--bg-input);
        height: 100%;
        padding-top: 20px;
        width: 160px;
        h2 {
            line-height: var(--title-height);
            font-size: 18px;
            padding-left: 20px;
        }
        .empty {
            font-size: 14px;
            margin-top: 50px;
            text-align: center;
        }
        .notes-add {
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 32px;
            height: 32px;
            background: var(--el-color-primary);
            color: #fff;
            border-radius: 50%;
            transition: 0.2s;
            box-shadow: 0 0 5px 2px #0000001f;
        }

        .notes-tabs-body {
            &::-webkit-scrollbar {
                transition: 0.2s;
                width: 6px;
                height: 10px;
            }

            &::-webkit-scrollbar-thumb {
                background: var(--bg-hover);
                border-radius: 4px;
            }
            overflow: auto;
            height: calc(100% - var(--title-height) - 20px);
            .notes-tabs-item {
                &.notes-tabs-item:hover {
                    color: var(--el-color-primary);
                }
                &:hover .notes-del {
                    transform: scale(1);
                }
                &.active {
                    background: var(--bg-card);
                    border-left-color: var(--el-color-primary);
                    box-shadow: #0000004d 0 4px 24px -12px;
                }
                h4 {
                    font-size: 14px;
                    font-weight: 700;
                }
                time {
                    font-size: 12px;
                    display: inline-block;
                    color: var(--d-sub);
                }
                .notes-del {
                    position: absolute;
                    right: 10px;
                    top: 5px;
                    transform: scale(0);
                    transition: 0.2s ease-out;
                    &.fixed {
                        top: 29px;
                    }
                    i {
                        color: var(--el-color-primary);
                    }
                }
                position: relative;
                transition: 0.2s;
                padding: 16px;
                font-size: 14px;
                border-left: 6px solid transparent;
                border-top: 1px solid rgba(var(--alpha-color), 0.04);
                cursor: pointer;
            }
        }
        .notes-sort {
            transition: 0.2s;
            top: 18px;
            right: 20px;
            float: right;
            padding-right: 10px;
            position: relative;
            .sort-caret {
                position: absolute;
                top: 0;
                width: 0;
                height: 0;
                border: solid 5px transparent;

                &.asc {
                    top: 12px;
                    border-top-color: var(--d-sub);
                    &.active {
                        border-top-color: var(--el-color-primary);
                    }
                }
                &.desc {
                    border-bottom-color: var(--d-sub);
                    &.active {
                        border-bottom-color: var(--el-color-primary);
                    }
                }
            }
        }

        // max-width: 220px;
    }
    .main {
        flex: 1;
        padding: 10px;
        background-color: var(--bg-card);
        display: flex;
        flex-direction: column;
        .note-title {
            width: 100%;
        }
        .note-content {
            height: calc(100% - 52px);
        }
        .bottom-tips {
            color: var(--d-sub);
        }
        .tabs {
            width: 80%;
            line-height: 16px;
            cursor: pointer;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 5px;
            font-size: 13px;
            span.active {
                color: var(--el-color-primary);
            }

            .mr10 {
                margin-right: 10px;
            }
        }
    }
}
</style>
<style lang="scss">
main {
    .note-title {
        .el-input {
            .el-input__wrapper {
                box-shadow: none;
                .el-input__inner {
                    color: var(--d-main);
                    font-weight: 700;
                    font-size: 16px;
                }
            }
        }
    }
    .note-content {
        &.el-textarea {
            &.is-focus {
                box-shadow: none;
            }

            .el-textarea__inner {
                --height: 27px;
                display: block;
                height: 100%;
                line-height: calc(var(--height) + 1px);
                background: linear-gradient(
                    180deg,
                    transparent,
                    transparent var(--height),
                    var(--dividing-line) var(--height),
                    var(--dividing-line) var(--height)
                );
                background-size: 100% calc(var(--height) + 1px);
                box-shadow: inset 0 1px 0 0 var(--dividing-line);
            }
        }
    }
}
.add-pic-container {
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        height: 100%;
        color: var(--d-main);
    }
    &.el-dialog {
        padding: 0;
        overflow: hidden;
        border-radius: 10px;
    }
}
</style>
