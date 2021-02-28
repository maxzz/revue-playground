<template>
    <div class="flex flex-col">
        <div ref="elEditor" class="flex-1"></div>
        <div><input type="button" value="Get" @click="onGetText"></div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
    import cm from 'codemirror';
    import 'codemirror/mode/javascript/javascript';
    import "codemirror/lib/codemirror.css";
import { defaultCode } from './convert';

    export default defineComponent({
        setup() {
            const elEditor = ref();
            let myEditor: cm.Editor;

            onMounted(() => {
                myEditor = cm(elEditor.value, {
                    value: '', // 'function test()\n{\n}\n',
                    mode: 'javascript'
                });

                myEditor.setValue(defaultCode);

                myEditor.on('change', onChange);
            });

            onUnmounted(() => {
                //console.log('Unmounted');
                clearTimeout(updateTimer);
                myEditor.off('change', onChange);
            });

            let updateTimer: number;
            function onEditorChange() {
                clearTimeout(updateTimer);
                updateTimer = setTimeout(() => {
                    let val = myEditor.getValue();
                    console.log('Change', val);
                }, 200);
            }

            function onChange(e: any) {
                //console.log('Change', e);
                onEditorChange();
            }

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

<style lang="scss">
    .CodeMirror {
        height: auto;
    }
</style>