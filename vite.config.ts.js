import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';

var vite_config = defineConfig({
    base: '/revue-playground/',
    plugins: [vue(), WindiCSS()]
});

export default vite_config;
