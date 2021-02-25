import { createApp } from "vue";
import App from "./App.vue";
import 'windi.css';

import Toast, { POSITION } from "vue-toastification";

const vue = createApp(App);
vue.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 5000,
    transition: {
        enter: "tm-fade-enter-active",
        //leave: "tm-fade-leave-active",
        //leave: "Vue-Toastification__bounce-leave-active",
        move: "tm-fade-move"
    }    
});
vue.mount("#app");
