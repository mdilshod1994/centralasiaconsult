<template>
    <div v-if="isSelected">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        isSelected:{
            typeof:Boolean
        }
    }
}
</script>


<style scoped>
            
</style>