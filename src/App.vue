<template>
    <Header />
    <Editors />
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Editors from "./components/Editors.vue";
    import Header from "./components/Header.vue";

    export default defineComponent({
        name: "App",
        components: {
            Header,
            Editors,
        },
    });
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
