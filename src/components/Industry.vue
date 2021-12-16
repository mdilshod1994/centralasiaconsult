<template>
    <div class="section-industry" id="industry">
        <div class="container section-container ">
            <router-link to="/industry-page" v-bind="changeTitle" class="wrapper-inner__title wrapper-inner__title_service">
                {{ changeTitle.title }}
            </router-link>

            <slick class="wrapper-industries"  ref="slick" :options="settings" v-if="industryData.length > 0">
                <router-link :to="/industry/ + industry.id"  class="wrapper-sliders"  v-for="industry in industryData" :key="industry.id" v-bind:industry="industry">
                    <div class="wrapper-industry"  v-bind:style="{ backgroundImage: 'url(' + industry.image + ')' }">
                        <div class="industry-content">
                            <h5 class="wrapper-content__title wrapper-content__title_fz">
                                {{ industry.title }}
                            </h5>
                            <p class="wrapper-content__text wrapper-content__text_fz">
                                {{ industry.description }}
                            </p>
                        </div>
                    </div>
                </router-link>
            </slick>
        </div>
    </div>
</template>




<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';

export default {
    name: 'Industry',
    components: {
        Slick
    },
    props:{
        industryData: {
            typeof: Array
        },
        changedAllInfoSecond: {
            typeof: Function
        }
    },
    data () {
        return {
            title: 'ОТРАСЛИ',
            industryData:[],
            settings: {
            dots: true,
            infinite: true,
            autoplay: true,
            arrows: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                    {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
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
            },
            en:{
                title: 'Industries',
            },
            ru:{
                title: 'Отрасли',
            }
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
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
}
</script>

<style scoped>
.container_card-padding{
    padding: 0 50px;
}

</style>
