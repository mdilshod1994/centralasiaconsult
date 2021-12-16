<template>
    <div class="service-company" id="service">
        <div class="container section-container">
             <router-link  v-bind="changeTitle" to="/service-page" class="wrapper-inner__title wrapper-inner__title_service">
                {{ changeTitle.title }}
            </router-link>
            <slick class="wrapper-services" ref="slick" :options="settings" v-if="serviceData.length > 0" >
                <router-link :to="/service/ + service.id" class="wrapper-service" v-for="service in serviceData" :key="service.id" :serviceData="service">
                    <img :src=" service.image" class="wrapper-service__img" alt="icon">
                    <h4 class="wrapper-service__title">
                        {{ service.title }}
                    </h4>
                    <p class="wrapper-service__text">
                        {{ service.description |truncate(20) }} <span> {{changeTitle.btnText}} </span>
                    </p>
                </router-link>
            </slick>
        </div>
    </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
export default {
  name: 'Services',
    components: {
        Slick
    },
    props:{
        serviceData:{
            typeof: Array
        }
    },
    data () {
        return {
        title: '',
        en:{
            title: 'Services',
            btnText: '...read more' 
        },
        ru:{
            title: 'Услуги',
            btnText: '...ещё' 
        },
        settings: {
            dots: true,
            infinite: true,
            autoplay: true,
            arrows: false,
            speed: 300,
            swipe:true,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                    {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                    },
                    {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                    },
                    {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                    },
                    {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                    },
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                    }
                ]
            }
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    beforeUpdate() {
        if (this.$refs.slick) {
            this.$refs.slick.destroy();
        }
    },
    updated() {
        this.$nextTick(function () {
            if (this.$refs.slick) {
                this.$refs.slick.create(this.slickOptions);
            }
        });
    },
    filters:{
        truncate: function(value){
            if(value && value.length > 20){
                value = value.substring(0, 135) + '';
            }
            return value
        }
    }
}
</script>

