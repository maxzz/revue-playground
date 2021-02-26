<template>
    <div class="flex flex-col">
        <div ref="elEditor">
        </div>
        <div><input type="button" value="Get" @click="onGetText"></div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';
    import cm from 'codemirror';
    import 'codemirror/mode/javascript/javascript';
    import "codemirror/lib/codemirror.css";

    export default defineComponent({
        setup() {
            const elEditor = ref();
            let myEditor: cm.Editor;

            onMounted(() => {
                myEditor = cm(elEditor.value, {
                    value: 'function test()\n{\n}\n',
                    mode: 'javascript'
                });
            });

            function onGetText() {
                let val = myEditor.getValue();
                console.log(val);

                let doc = myEditor.getDoc();
                console.log(doc);
            }

            return {
                elEditor,
                onGetText

            };
        }
    });
</script>
