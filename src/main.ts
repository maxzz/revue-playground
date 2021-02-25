import { createApp } from "vue";
import App from "./App.vue";
import 'windi.css';

import Toast, { POSITION } from "vue-toastification";
//import "vue-toastification/dist/index.css";
//import "./toaster.scss";

const vue = createApp(App);
vue.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 2000,
    // transition: {
    //     enter: "Vue-Toastification__fade-enter-active",
    //     leave: "Vue-Toastification__fade-leave-active",
    //     move: "Vue-Toastification__fade-move"
    // }
    transition: {
        enter: "tm-fade-enter-active",
        //leave: "tm-fade-leave-active",
        //leave: "Vue-Toastification__bounce-leave-active",
        move: "tm-fade-move"
    }    
});
vue.mount("#app");
