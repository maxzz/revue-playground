<template>
    <div class="flex flex-col">
        <div ref="elEditor" class="flex-1"></div>
        <div class="flex justify-end items-center bg-gray-200 py-1">
            <span class="mx-2 text-xs flex-1">Ln: {{editorPos.ln}} Col: {{editorPos.col}}</span>
            <input class="px-1 border-1 w-8 mr-1" type="button" value="-" @click="onTestRemoveErrorClick">
            <input class="px-1 border-1 w-8 mr-1" type="button" value="+" @click="onTestAddErrorClick">
            <!-- <input class="px-1 border-1 " type="button" value="Test" @click="onTestClick"> -->
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, onMounted, onUnmounted, PropType, reactive, ref, watch, getCurrentInstance } from 'vue';
    import cm from 'codemirror';
    import 'codemirror/mode/javascript/javascript';
    import "codemirror/lib/codemirror.css";

    export default defineComponent({
        props: {
            editText: {
                type: String,
                default: '',
            },
            onTextChange: {
                type: Function as PropType<(newText: string) => void>
            }
        },
        setup(props, ctx) {
            //console.log('Editor', props, ctx);
            console.log("Editor Instance", getCurrentInstance());

            const elEditor = ref();
            let myEditor: cm.Editor;

            const editorText = ref(props.editText);
            const editorPos = reactive({ln: 0, col: 0});
            //const editorErr = ref(0);

            onMounted(() => {
                //console.log('Mounted', props, ctx);

                myEditor = cm(elEditor.value, {
                    value: editorText.value, // 'function test()\n{\n}\n',
                    mode: 'javascript',
                    lineNumbers: true,
                });

                //myEditor.setValue(defaultCode);

                myEditor.on('change', onEditorChange);
                myEditor.on('cursorActivity', onEditorcursorActivity);
            });

            onUnmounted(() => {
                console.log('Unmounted');

                clearTimeout(timerTextUpdate);
                clearTimeout(timerCursorUpdate);
                myEditor.off('change', onEditorChange);
                myEditor.off('cursorActivity', onEditorcursorActivity);
            });

            watch(() => props.editText, () => {
                editorText.value = props.editText;
                myEditor.setValue(editorText.value);
                console.log('changed');
            });

            // watch(() => editorErr.value, () => {
            //     const val = editorErr.value;
            //     console.log('errorPos', val);
            // });

            function setErrorLine(line: number, isSet: boolean) {
                if (isSet) {
                    myEditor.addLineClass(line - 1, 'text', 'errorMarker');
                } else {
                    myEditor.removeLineClass(line - 1, 'text', 'errorMarker');
                }
            }

            let timerTextUpdate: number;
            function onEditorChange() {
                clearTimeout(timerTextUpdate);
                timerTextUpdate = setTimeout(() => {
                    let val = myEditor.getValue();
                    //console.log('Change', val);
                    props.onTextChange && props.onTextChange(val);
                }, 200);
            }

            let timerCursorUpdate: number;
            function onEditorcursorActivity() {
                clearTimeout(timerCursorUpdate);
                timerCursorUpdate = setTimeout(() => {
                    let cursor = myEditor.getCursor();
                    let pos = myEditor.getDoc().indexFromPos(cursor);

                    editorPos.ln = cursor.line + 1;
                    editorPos.col = cursor.ch + 1;
                    //console.log(`Activity pos: ${pos}, cursor: ${JSON.stringify(cursor, null, 4)}`);
                }, 100); // a shorter interval to fire cursor pos changes before text changes.
            }

            function onTestAddErrorClick() {
                setErrorLine(editorPos.ln, true);
            }

            function onTestRemoveErrorClick() {
                setErrorLine(editorPos.ln, false);
            }

            function onTestClick() {
                // editorErr.value = editorErr.value + 1;
                console.log('click');

                // let val = myEditor.getValue();
                // console.log(val);

                // let doc = myEditor.getDoc();
                // console.log(doc);
            }

            return {
                elEditor,
                editorPos,
                // editorErr,
                onTestRemoveErrorClick,
                onTestAddErrorClick,
                onTestClick,

            };
        }
    });
</script>

<style lang="scss">
    .CodeMirror {
        height: auto;
        flex: 1;
    }
    .CodeMirror pre.errorMarker {
        background-color: #ff000080;
    }
</style>