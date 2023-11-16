<script setup lang="ts">
import { ProgressBar } from '@vue-interface/progress-bar';
import { computed, onMounted, ref, watchEffect, type Component } from 'vue';
import CheckCircleIcon from './CheckCircleIcon.vue';
import ExclamationTriangleIcon from './ExclamationTriangleIcon.vue';
import ICircleIcon from './ICircleIcon.vue';
import QuestionMarkCircleIcon from './QuestionMarkCircleIcon.vue';
import XCircleIcon from './XCircleIcon.vue';

const props = withDefaults(defineProps<{
    accent?: boolean,
    closeable?: boolean,
    dismiss?: number,
    rounded?: boolean,
    show?: boolean,
    size?: 'sm' | 'md' | 'lg',
    type?: 'warning' | 'success' | 'critical' | 'info' | 'question'
    icon?: Component | false
}>(), {
    dismiss: undefined,
    icon: undefined,
    show: true,
    size: 'md',
    type: 'critical'
});

const icon = computed(() => {
    if(props.icon) {
        return icon;
    }

    if(props.icon === false) {
        return undefined;
    }

    switch (props.type) {
    case 'warning':
        return ExclamationTriangleIcon;
    case 'success':
        return CheckCircleIcon;
    case 'critical':
        return XCircleIcon;
    case 'info':
        return ICircleIcon;
    default:
        return QuestionMarkCircleIcon;
    }
});

function createTimer() {
    const count = ref(0);
    const running = ref(false);
    const percent = computed(() => {
        return Math.max(0, Math.min(100, count.value / props.dismiss * 100));
    });
    
    const complete = ref(false);

    watchEffect(() => {
        if(percent.value === 100) {
            complete.value = true;
        }
    });
    
    function interval() {
        const start = Date.now();

        window.requestAnimationFrame(() => {
            if(!running.value) {
                return;
            }

            count.value += Date.now() - start;
            
            if(count.value >= props.dismiss) {
                stop();
            }
            else {
                interval();
            }
        });
    }

    function start() {
        running.value = true;

        interval();
        
        return promise().then(() => {
            reset();
            
            window.requestAnimationFrame(() => {
                show.value = false;
            });
        }, () => {
            //
        });

    }

    function stop() {
        running.value = false;
    }

    function reset() {
        count.value = 0;
        running.value = false;
        complete.value = false;
    }

    function promise() {
        return new Promise((resolve, reject) => {
            watchEffect(() => {
                if(complete.value) {
                    resolve(true);
                }

                if(!running.value) {
                    reject();
                }
            });
        });
    }

    return {
        promise,
        percent,
        running,
        start,
        stop,
        reset
    }
}

const { start, stop, percent, running } = createTimer();

const show = ref(props.show);

watchEffect(() => {
    show.value = props.show;
});

function onMouseEnter() {
    if(running.value && props.dismiss) {
        stop();
    }
}

function onMouseLeave() {
    if(show.value && props.dismiss) {
        start();
    }
}

onMounted(() => {
    if(props.show) {
        start();
    }
});

defineExpose({
    show() {
        show.value = true;
    },
    hide() {
        show.value = false;
    }
})
</script>

<template>
    <Transition
        enter-active-class="transition duration-250 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-500 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="show" class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <div v-if="dismiss" class="absolute bottom-[1px] translate-y-[1px] left-0 w-full rounded-b-full overflow-hidden">
                <ProgressBar
                    :value="percent"
                    :height="3"
                    :duration="100"
                    :class="{
                        'bg-rose-500': type === 'critical',
                        'bg-yellow-500': type === 'warning',
                        'bg-green-500': type === 'success',
                        'bg-sky-500': type === 'info',
                        'bg-neutral-500': type === 'question'
                    }"
                />
            </div>
            
            <div
                class="flex items-center gap-2 rounded p-4"
                :class="{
                    'border-l-4': accent,
                    'bg-rose-100 text-red-800': type === 'critical',
                    'border-red-500': type === 'critical' && accent,
                    'bg-amber-100 text-amber-600': type === 'warning',
                    'border-amber-500': type === 'warning' && accent,
                    'bg-emerald-100 text-emerald-600': type === 'success',
                    'border-emerald-500': type === 'success' && accent,
                    'bg-blue-100 text-blue-600': type === 'info',
                    'border-blue-500': type === 'info' && accent,
                    'bg-neutral-100 text-neutral-600': type === 'question',
                    'border-neutral-500': type === 'question' && accent,
                    'p-3 text-sm': size === 'sm',
                    'p-4': size === 'md',
                    'p-5 text-lg': size === 'lg',
                    // 'leading-4': size === 'sm',
                    // 'leading-5': size === 'md',
                    // 'leading-6': size === 'lg',
                }">
                <div class="self-start leading-normal">
                    <Component
                        :is="icon"
                        v-if="icon"
                        class="mt-[.125rem]"
                        :class="{
                            // 'leading-5': size === 'sm',
                            // 'leading-6': size === 'md',
                            // 'leading-7': size === 'lg',
                            'text-rose-500': type === 'critical',
                            'text-yellow-500': type === 'warning',
                            'text-green-500': type === 'success',
                            'text-sky-500': type === 'info',
                            'text-neutral-500': type === 'question',
                            'h-4 w-4': size === 'sm',
                            'h-5 w-5': size === 'md',
                            'h-10 w-10': size === 'lg' 
                        }" />
                </div>
                <div
                    class="flex flex-1 flex-col gap-4">
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <slot />
                        </div>

                        <div
                            v-if="$slots.action"
                            class="flex gap-4">
                            <slot name="action" />
                        </div>

                        <div
                            v-if="closeable"
                            class="absolute right-0 top-0 flex -translate-y-1/3 translate-x-1/3 items-center justify-center">
                            <button
                                type="button"
                                :class="{
                                    'text-red-500/75 hover:text-red-500/90 active:text-red-500': type === 'critical',
                                    'text-amber-500/75 hover:text-amber-500/90 active:text-amber-500': type === 'warning',
                                    'text-emerald-500/75 hover:text-emerald-500/90 active:text-emerald-500': type === 'success',
                                    'text-blue-500/75 hover:text-blue-500/90 active:text-blue-500': type === 'info',
                                    'text-neutral-500/75 hover:text-neutral-500/90 active:text-neutral-500': type === 'question',
                                }">
                                <XCircleIcon class="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div
                        v-if="$slots.buttons"
                        class="flex gap-2"
                        :class="{
                            'text-xs ': size === 'sm',
                            'text-sm': size === 'md',
                            'text-base': size === 'lg'
                        }">
                        
                        <slot name="buttons" />
                    </div> 
                </div>
            </div>
        </div>
    </Transition>
</template>