<template>
    <div class="advantage">
        <div class="container section-container">
            <ul class="advantage-wrapper__list">
                <li class="advantage-wrapper__item" v-for="advantage in advantages" :key="advantage.id" >
                    <img :src="advantage.image" class="advantage-wrapper__img" alt="">
                    <span class="advantage-wrapper__number">
                        {{ advantage.count }}
                    </span>
                    <p class="advantage-wrapper__text">
                        {{ advantage.title }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>



<script>

var config = require('../../config/prod.env')
import axios from 'axios'

export default {
    data() {
        return {
            advantages:{},
            lang: localStorage.getItem('lang')
        }
    },
    computed:{
        currLang(){
            return  localStorage.getItem('lang')
        }
    },
    mounted(){
        axios.get(config.BASE_URL + 'advantages')
        .then(resp => {
            this.advantages = resp.data.data
        })
        
    },
}
</script>
