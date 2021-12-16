<template>
    <div class="section-map" id="contact">
        <div class="container section-container">
            <div class="wrapper-map" v-for="info in emailJSON" :key="info.id">
                <div class="wrapper-map__content"  >
                    <h3 class="wrapper-inner__title" >
                        {{ changeTitle.title }}
                    </h3>
                    <p class="wrapper-map__text ">
                        {{ changeTitle.btnText }}
                    </p>
                    
                    <a :href="`tel:${info.phone_number}`" class="wrapper-map__text wrapper-map__text_weight">
                        <img :src="iconPhone" alt="" style="margin-right: 5px">
                        {{ info.phone_number }}
                    </a>
                    <p class="wrapper-map__text wrapper-map__text_weight" style="align-items: self-start">
                        <img :src="iconLocation" alt="" style="margin-right: 5px">
                       {{ info.address }}
                    </p>
                </div>
                
                <div class="map-dushanbe"  v-html="info.map">{{ info.map }}</div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
var config = require('../../config/prod.env')

export default {
    name:'Map',
    props:{
        emailJSON:{
          typeof:Array
      }
  },
    data(){
        return{
            emailJSON: [],
            iconPhone: require('../assets/img/phones.svg'),
            iconLocation: require('../assets/img/location.svg'),
            en:{
                title: 'CONTACTS',
                btnText: 'Contact us!' 
            },
            ru:{
                title: 'КОНТАКТЫ',
                btnText: 'Звоните прямо сейчас!' 
            }
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    mounted(){
        axios.get(config.BASE_URL +  `countries`)
        .then( res =>{
            let codeFilter = res.data.data.filter(e => e.name === 'Global')
            this.emailJSON = codeFilter
        })
    }
}
</script>

<style scoped>
    
</style>