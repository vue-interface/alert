<template>
    <div class="alert" :class="classes" role="alert">
        <alert-close v-if="dismissible" @click="dismiss()" />
        <div v-if="title || heading">
            {{ title || heading }}
        </div>
        <slot />
        <progress-bar
            v-if="typeof show === 'number'"
            :variant="variant"
            :height="5"
            :value="dismissCount"
            :max="show"
            class="my-3" />
    </div>
</template>

<script>

import AlertClose from './AlertClose';
// import ProgressBar from 'vue-interface/src/Components/ProgressBar';
import Variant from 'vue-interface/src/Mixins/Variant';
import transition from 'vue-interface/src/Helpers/Transition';
import MergeClasses from 'vue-interface/src/Mixins/MergeClasses';

export default {

    name: 'Alert',

    components: {
        AlertClose,
        // ProgressBar
    },

    mixins: [
        Variant,
        MergeClasses
    ],

    props: {

        /**
         * Is the alert dismissible
         *
         * @property Boolean
         */
        dismissible: Boolean,

        /**
         * The alert's title/heading
         *
         * @property Boolean
         */
        heading: String,

        /**
         * The alert's title/heading
         *
         * @property Boolean
         */
        title: String,

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
            return this.mergeClasses(this.variantClass, {
                fade: this.fade,
                show: this.isVisible,
                'alert-dismissable': this.dismissible,
            });
        }
    },

    mounted() {
        if(typeof this.show === 'number') {
            const el = this.$el.querySelector('.progress-bar');

            this.$emit('dismiss-countdown', this.dismissCount = this.show);

            const interval = setInterval(() => {
                this.$emit('dismiss-countdown', --this.dismissCount);

                if(!this.dismissCount) {
                    clearInterval(interval);

                    if(el) {
                        transition(el).then(delay => this.dismiss());
                    }
                    else {
                        this.dismiss();
                    };
                }
            }, 1000);
        }
    },

    methods: {

        dismiss() {
            this.isVisible = false;

            this.$emit('dismiss-start');
                
            transition(this.$el).then(delay => {
                this.$emit('dismiss');
            });
        }

    }

};
</script>
