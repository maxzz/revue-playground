<template>
    <div ref="container" class="splitpane">
        <div :style="styleA">
            <slot name="a">
                default a
            </slot>
        </div>
        <div class="splitpane-divider flex-grow-0 flex-shrink-0" @mousedown="onMouseDown"></div>
        <div :style="styleB">
            <slot name="b">
                default b
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, reactive, ref } from "vue";

    export default defineComponent({
        setup() {
            const position = ref(0);
            let onResize: (() => void) | null = null;
            const container = ref<HTMLElement>();
            const vertical = false;

            const onMouseDown = function(event: MouseEvent) {
                event.preventDefault(); // This is needed to prevent text selection in Safari

                const elContainer = container.value as HTMLElement;
                const offset = vertical ? elContainer.offsetTop : elContainer.offsetLeft;
                const size = vertical ? elContainer.offsetHeight : elContainer.offsetWidth;
                document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';

                function moveHandler(event: MouseEvent) {
                    event.preventDefault();
                    let newPosition = (((vertical ? event.pageY : event.pageX) - offset) / size) * 100;
                    setPosition(Math.floor(Math.min(Math.max(0, newPosition), 99))); // Using 99% as the max value prevents the divider from disappearing
                };

                function upHandler() {
                    document.body.style.cursor = '';
                    document.removeEventListener('mousemove', moveHandler);
                    document.removeEventListener('mouseup', upHandler);
                    onResize&& onResize();
                };

                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
            };

            type styleAB = {
                flex: string;
                minWidth?: string;
                minHeight?: string;
                maxWidth?: string;
                maxHeight?: string;
            }

            const styleA = reactive<styleAB>({
                flex: '1',
            });

            const styleB = reactive<styleAB>({
                flex: '1',
                minWidth: '0',
                minHeight: '0',
            });

            function setPosition(x: number) {
                position.value = x;
                if (vertical) {
                    styleA.minHeight = styleA.maxHeight = position.value + '%'; // top
                } else {
                    styleA.minWidth = styleA.maxWidth = position.value + '%'; // left
                }
            }

            return {
                container,
                styleA,
                styleB,
                onMouseDown,
            };
        },
    });
</script>

<style lang="scss">
    .splitpane {
        display: flex;
    }

    // .splitpane-content {
    //     flex: 1;
    //     /* for Firefox, otherwise it overflows the parent*/
    //     min-height: 0;
    //     min-width: 0;
    // }

    .splitpane-divider {
        //background-color: #ddd;
        width: 4px;

        &.vertical {
            height: 4px;
        }
    }

    .splitpane-divider:hover {
        background-color: #999;
        cursor: col-resize;
    }

    .splitpane-divider.vertical:hover {
        background-color: #999;
        cursor: row-resize;
    }
</style>
