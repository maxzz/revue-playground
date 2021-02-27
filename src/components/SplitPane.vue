<template>
    <div ref="container" class="flex px-4">
        <div class="bg-red-200" :style="styleA">
            <slot name="a">
                default a
            </slot>
        </div>
        <div class="devider w-1 flex-grow-0 flex-shrink-0 cursor-col-resize" @mousedown="onMouseDown"></div>
        <div class="bg-green-200" :style="styleB">
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
            const vertical = true;

            const onMouseDown = function(event: MouseEvent) {
                event.preventDefault(); // This is needed to prevent text selection in Safari

                const elContainer = container.value as HTMLElement;
                const offset = vertical ? elContainer.offsetTop : elContainer.offsetLeft;
                const size = vertical ? elContainer.offsetHeight : elContainer.offsetWidth;
                
                document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';

                let moveHandler = (event: MouseEvent) => {
                    event.preventDefault();
                    let newPosition = (((vertical ? event.pageY : event.pageX) - offset) / size) * 100;
                    newPosition = Math.floor(Math.min(Math.max(0, newPosition), 99)); // Using 99% as the max value prevents the divider from disappearing
                    setPosition(newPosition);
                };

                let upHandler = () => {
                    document.removeEventListener('mousemove', moveHandler);
                    document.removeEventListener('mouseup', upHandler);
                    document.body.style.cursor = '';

                    if (onResize) {
                        onResize();
                    }
                };

                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
            };

            function setPosition(x: number) {
                console.log('setpos', x);
                position.value = x;

                if (vertical) {
                    styleA.minHeight = styleA.maxHeight = position + '%'; // top
                } else {
                    styleA.minWidth = styleA.maxWidth = position + '%'; // left
                }
            }

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

            return {
                container,
                styleA,
                styleB,
                onMouseDown,
            };
        },
    });
</script>
