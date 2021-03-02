<template>
    <div ref="container" class="splitpane">
        <div class="splitpane-content" :style="styleA">
            <slot name="a">a</slot>
        </div>
        <div class="splitpane-divider" @mousedown="onMouseDown"></div>
        <div class="splitpane-content">
            <slot name="b">b</slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType, reactive, ref, getCurrentInstance } from "vue";

    export default defineComponent({
        props: {
            onResize: {
                type: Function as PropType<() => void>
            },
        },
        setup(props) {
            const position = ref(0);
            const container = ref<HTMLElement>();
            const vertical = false;

            console.log("SPLITPANE Instance", getCurrentInstance());

            const onMouseDown = function(event: MouseEvent) {
                event.preventDefault(); // This is needed to prevent text selection in Safari

                const elContainer = container.value as HTMLElement;
                const offset = vertical ? elContainer.offsetTop : elContainer.offsetLeft;
                const size = vertical ? elContainer.offsetHeight : elContainer.offsetWidth;
                document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';

                function moveHandler(event: MouseEvent) {
                    event.preventDefault();
                    let newPosition = (((vertical ? event.pageY : event.pageX) - offset) / size) * 100;
                    setPosition(Math.min(Math.max(0, newPosition), 99)); // Using 99% as the max value prevents the divider from disappearing
                };

                function upHandler() {
                    document.body.style.cursor = '';
                    document.removeEventListener('mousemove', moveHandler);
                    document.removeEventListener('mouseup', upHandler);
                    props.onResize && props.onResize();
                };

                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
            };

            type styleAB = {
                minWidth?: string;
                maxWidth?: string;
                minHeight?: string;
                maxHeight?: string;
            }

            const styleA = reactive<styleAB>({
            });

            function setPosition(x: number) {
                position.value = x;
                const name = vertical ? 'Height' : 'Width'; // top or left
                styleA[`min${name}` as 'minWidth' | 'minHeight'] = styleA[`max${name}` as 'maxWidth' | 'maxHeight'] = position.value + '%';
            }

            return {
                container,
                styleA,
                onMouseDown,
            };
        },
    });
</script>

<style lang="scss">
    .splitpane {
        display: flex;
        flex: 1;
    }

    .splitpane-content {
        display: flex;
        flex: 1;
        min-height: 0; // 'min-height: 0; min-width: 0' for Firefox, otherwise it overflows the parent
        min-width: 0;
    }

    .splitpane-divider {
        //background-color: #ddd;
        flex-grow: 0;
        flex-shrink: 0;
        width: 4px;

        &.vertical {
            height: 4px;
        }

        &:hover {
            background-color: #999;
            cursor: col-resize;
        }

        &.vertical:hover {
            background-color: #999;
            cursor: row-resize;
        }
    }
</style>
