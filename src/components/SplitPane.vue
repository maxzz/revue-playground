<template>
    <div class="flex px-4">
        <div class="flex-1 bg-red-200">
            <slot name="a">
                default a
            </slot>
        </div>
        <div class="devider w-1 flex-grow-0 flex-shrink-0"></div>
        <div class="flex-1 bg-green-200">
            <slot name="b">
                default b
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

    export default defineComponent({
        setup() {
            return {};
        },
    });
</script>
