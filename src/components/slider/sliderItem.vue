<template>
    <transition name="fade">
        <div class="v-slider-item" v-show="visibleSide === index">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props:['visibleSide', 'index'],
    data() {
        return {
            
        }
    },
}
</script>
<style>



</style>