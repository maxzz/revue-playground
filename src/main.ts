import { createApp } from "vue";
import App from "./App.vue";
import 'windi.css';

import Toast, { POSITION } from "vue-toastification";
//import "vue-toastification/dist/index.css";
//import "./toaster.scss";

const vue = createApp(App);
vue.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 5000,
    // transition: "Vue-Toastification__fade",
    transition: {
        enter: "tm-fade-enter-active",
        //leave: "tm-fade-leave-active",
        //leave: "Vue-Toastification__bounce-leave-active",
        move: "tm-fade-move"
    }    
    // transition: "Vue-Toastification__slideBlurred",
    // transition: {
    //     enter: "Vue-Toastification__slideBlurred-enter-active",
    //     leave: "Vue-Toastification__slideBlurred-leave-active",
    //     //leave: "Vue-Toastification__bounce-leave-active",
    //     move: "fade-move"
    // }    
});
vue.mount("#app");
