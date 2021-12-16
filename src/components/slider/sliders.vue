<template>
    <div class="v-sliders">
        <slot></slot>
        <button class="asd left" @click="prevSlide">prev</button>
        <button class="asd right" @click="nextSlide">next</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        prevSlide(){
            this.$emit('prevBtn')
        },
        nextSlide(){
            this.$emit('nextBtn')
        }
    },
    
}
</script>

<style >
.asd{
    display: none !important;
    position: absolute;
    left: 20px;
    bottom: -20px;
    display: block;
    background: black;
    padding: 50px;
    z-index: 999;
}
.right{
    left: 60px;
}
</style>