<template>
    <div class="flex px-4 mb-4">
        <input class="flex-1 px-3 py-2 border rounded text-gray-600 mr-2" value="abc">
        <input class="flex-1 px-3 py-2 border rounded text-gray-600" value="abc">
    </div>

    <input type="button" value="start" @click="onBtnStart" class="btn important:focus:ring-0">
</template>

<script lang="ts">
    import { ref, defineComponent } from "vue";
    import { start } from './convert';

    export default defineComponent({
        props: {},
        setup: () => {
            function onBtnStart() {
                start();
            }
            return { onBtnStart };
        },
    });
</script>

<style scoped>
    a {
        color: #42b983;
    }

    label {
        margin: 0 0.5em;
        font-weight: bold;
    }

    code {
        background-color: #eee;
        padding: 2px 4px;
        border-radius: 4px;
        color: #304455;
    }
</style>
