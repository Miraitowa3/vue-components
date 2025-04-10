<template>
    <div>
        <Nodes v-model="show" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Nodes from '@zi-shui/components/nodes';
const show = ref(true);
</script>
<style scoped lang="scss"></style>
