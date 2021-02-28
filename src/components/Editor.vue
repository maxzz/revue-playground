<template>
    <div class="flex flex-col">
        <div ref="elEditor" class="flex-1"></div>
        <div class="flex justify-end">
            <input type="button" value="Get" @click="onGetText">
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onUnmounted, PropType, ref, watch } from 'vue';
    import cm from 'codemirror';
    import 'codemirror/mode/javascript/javascript';
    import "codemirror/lib/codemirror.css";
    import { defaultCode } from './convert';

    export default defineComponent({
        props: {
            editorText: {
                type: String,
                default: '',
            },
            onTextChange: {
                type: Function as PropType<(newText: string) => void>
            }
        },
        setup(props) {
            const elEditor = ref();
            let myEditor: cm.Editor;

            const editorText = ref(props.editorText);

            onMounted(() => {
                console.log('Mounted');

                myEditor = cm(elEditor.value, {
                    value: editorText.value, // 'function test()\n{\n}\n',
                    mode: 'javascript'
                });

                //myEditor.setValue(defaultCode);

                myEditor.on('change', onEditorChange);
            });

            onUnmounted(() => {
                console.log('Unmounted');

                clearTimeout(updateTimer);
                myEditor.off('change', onEditorChange);
            });

            watch(() => props.editorText, () => {
                editorText.value = props.editorText;
                myEditor.setValue(editorText.value);
                console.log('changed');
            });

            let updateTimer: number;
            function onEditorChange() {
                clearTimeout(updateTimer);
                updateTimer = setTimeout(() => {
                    let val = myEditor.getValue();
                    console.log('Change', val);
                    props.onTextChange && props.onTextChange(val);
                }, 200);
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