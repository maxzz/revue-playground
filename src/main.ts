import { createApp } from "vue";
import App from "./App.vue";
import 'windi.css';
import VueToasted from 'vue-toasted';

const vue = createApp(App);
vue.component('toast', VueToasted);
vue.mount("#app");

