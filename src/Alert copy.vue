<script>
import { ProgressBar } from '@vue-interface/progress-bar';
import { Variant } from '@vue-interface/variant';

export default {
    name: 'Alert',

    components: {
        ProgressBar
    },

    mixins: [
        Variant
    ],

    props: {
        /**
         * Is the alert dismissible
         *
         * @property Boolean
         */
        dismissible: Boolean,

        /**
         * Should the alert fade when hidden
         *
         * @property Boolean
         */
        fade: {
            type: Boolean,
            default: true
        },

        /**
         * Should the alert be visible by default. If passed a number, alert
         * will be shown for the number of seconds that are passed.
         *
         * @property Boolean
         */
        show: {
            type: [Number, Boolean],
            default: true
        },

        /**
         * The variant name.
         *
         * @param {String}
         */
        variant: {
            type: String,
            default: 'primary'
        }

    },

    data() {
        return {
            dismissCount: this.show,
            isVisible: this.show
        };
    },

    computed: {
        classes() {
            return Object.assign({
                ['alert-dismissable']: this.dismissible,
                [this.variantClass]: !!this.variant,
                fade: this.fade,
                show: this.isVisible,
            });
        }
    },

    mounted() {
        if(typeof this.show === 'number') {
            this.countdown();
        }
    },

    methods: {
        countdown() {
            this.$emit('dismiss-countdown', this.dismissCount = this.show);
            
            const interval = setInterval(() => {
                this.$emit('dismiss-countdown', --this.dismissCount);

                if(!this.dismissCount) {
                    clearInterval(interval);

                    this.dismiss();
                }
            }, 1000);
        },

        dismiss() {
            this.isVisible = false;
            this.$emit('dismissed');
        }
    }

};
</script>

<template>
    <div
        class="alert"
        :class="classes"
        role="alert">
        <slot />

        <button
            v-if="dismissible"
            type="button"
            class="alert-close"
            data-dismiss="alert"
            aria-label="Close"
            @click="dismiss" />
    
        <ProgressBar
            v-if="typeof show === 'number'"
            :variant="variant"
            height="5px"
            :value="dismissCount"
            :max="show"
            class="mt-3" />
    </div>
</template>
