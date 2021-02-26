<template>
    <div class="split-panel flex px-4">
        <Editor class="flex-1 border border-gray-200" />
        <div class="flex-grow-0 flex-shring-0 w-1"></div>
        <Editor class="flex-1 border border-green-200" />
    </div>

    <div class="mx-4 flex my-4">
        <textarea class="border flex-1" :rows="3"></textarea>
    </div>
    <div class="flex px-4 mb-4">
        <input class="flex-1 px-3 py-2 border rounded text-gray-600 mr-2" value="abc">
        <input class="flex-1 px-3 py-2 border rounded text-gray-600" value="abc">
    </div>

    <div class="flex justify-center">
    <input type="button" value="start" @click="onBtnStart" class="btn important:focus:ring-0">
    </div>
</template>

<script lang="ts">
    import { ref, defineComponent } from "vue";
    import { start } from './convert';
    import { useToast } from "vue-toastification";
    import Editor from './Editor.vue';

    export default defineComponent({
        props: {},
        components: { Editor },
        setup: () => {
            console.log('start');

            const toast = useToast();

            function onBtnStart() {
                toast.info("My toast content");
                start();
            }
            return { onBtnStart };
        },
    });
</script>

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
