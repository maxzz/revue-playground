<template>
    <div class="flex flex-1 px-4 mb-4">
        <SplitPane :onResize="onSplitterResize">
            <template v-slot:a>
                <Editor class="flex-1 border border-gray-200" :editText="defaultCode" :onTextChange="onTextChange" />
            </template>
            <template v-slot:b>
                <Editor class="flex-1 border border-green-200" :edit-text="secondEditText" />
            </template>
        </SplitPane>
    </div>

    <div class="flex justify-center mb-4">
        <input type="button" value="Start Test" @click="onBtnStart" class="btn important:focus:ring-0">
    </div>
</template>

<script lang="ts">
    import { ref, defineComponent } from "vue";
    import { useToast } from "vue-toastification";
    import SplitPane from './SplitPane.vue';
    import Editor from './Editor.vue';
    import { publish } from'./util-events';
    import { start, defaultCode } from './convert';

    export default defineComponent({
        props: {},
        components: { Editor, SplitPane },
        setup: () => {
            //console.log('start');
            const toast = useToast();

            function onBtnStart() {
                start(); //toast.info("My toast content");
            }

            const secondEditText = ref('');
            function onTextChange(newText: string) {
                secondEditText.value = newText;
            }

            function onSplitterResize() {
                publish('PANEL_RESIZE');
            }

            return { 
                onBtnStart,
                onSplitterResize,
                onTextChange,
                defaultCode,
                secondEditText,
            };
        },
    });
</script>

<style lang="scss">
    // Override the variables or import a file that overrides them
    //$vt-color-success: white;
    //$vt-text-color-success: #000;

    //Import the regular Vue Toastification stylesheets (or create your own)
    @import "vue-toastification/src/scss/_variables";
    @import "vue-toastification/src/scss/_toastContainer";
    @import "vue-toastification/src/scss/_toast";
    @import "vue-toastification/src/scss/_closeButton";
    @import "vue-toastification/src/scss/_progressBar";
    @import "vue-toastification/src/scss/_icon";
    @import "vue-toastification/src/scss/animations/_bounce";

    .#{$vt-namespace}__progress-bar {
      background-color: rgba(48, 48, 48, 0.2);
    }

    @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    }
    @keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
    }
    .tm-fade-enter-active {
        animation-name: fadeIn;
        animation-duration: 750ms;
        animation-fill-mode: both;
    }
    .tm-fade-leave-active {
        animation-name: fadeOut;
        animation-duration: 750ms;
        animation-fill-mode: both;
    }
    .tm-fade-move {
        transition-timing-function: ease-in-out;
        transition-property: all;
        transition-duration: 400ms;
    }    
</style>

<style lang="scss">
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
