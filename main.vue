<template>
    <alert v-bind="$attrs">
        <slot />
    </alert>
</template>
<script>
import './src/css/alert.css';

import Alert from './src/Alert';

export default {
    components: {
        Alert
    },
    inheritAttrs: false
};
</script>