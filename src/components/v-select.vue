<template >
    <div class="v-select">
        <p>
            Global
            {{ selected }}
        </p>
        <div class="options"  >
            <p v-for="lang in langs.data" :key="lang.id" :value="lang.code" @click="changedAllInfo(lang.code)">
                <img :src="imgEnvel" alt="" class="address-block__icon">{{ lang.name }}
            </p>
        </div>
    </div>
</template>

<script>


export default {
    props:{
        langs:{
            typeof: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            imgEnvel: require('../assets/img/envelop.svg'),
        }
    },
    methods: {
        changedAllInfo(lang){
            console.log(lang);
        }
    }
}
</script>

<style >
.v-select{
    position: relative;
    width: 200px;
    cursor: pointer;
    background: #000;
}
.options{
    border: 1px solid rgb(235, 0, 0);
    position: absolute;
    display: block;
    z-index: 9999;
    background: #000;
}
</style>