<template>
    <div ref="elEditor">
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import cm from 'codemirror';
    import "codemirror/lib/codemirror.css";

    export default defineComponent({
        setup() {
            const elEditor = ref();

            onMounted(() => {
                console.log({elEditor});
                const myEditor = cm(elEditor.value, {
                    value: 'function test()\n{\n}\n',
                    mode: 'javascript'
                });
            });

            return {
                elEditor
            };
        }
    });
</script>
