<template>
    <div class="section-news">
        <div class="container section-container ">
            <router-link to="/news-page-test"  class="wrapper-inner__title wrapper-inner__title_news">
                {{ changeTitle.title }}
            </router-link>

            <slick class="wrapper-cards" v-bind:class="classObject" ref="slick" :options="settings" v-if="newsData.length > 0">
                <router-link :to="/new/ + item.id"   class="wrapper-card wrapped-card-news" v-for="item in newsData" :key="item.id">
                    <div class="wrapper-card-content">
                        <div class="wrap-image">
                             <img :src="item.image" alt="">
                        </div>
                        <div class="wrapper-card-inner">
                            <span>{{ item.category.created_at | formatDate()}}</span>
                            <h4 class=" wrapper-card__title wrapper-service__title">
                            {{ item.title }}
                            </h4>
                            <p >
                                {{ item.content |truncate(20) }} <span class="dots"> {{changeTitle.btnText}}</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </slick>

        </div>
    </div>
</template>



<script>
import { mapActions, mapGetters } from 'vuex';
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import moment from 'moment'




export default ({
    name: 'News',
    components: {
        Slick
    },
    props:{
        newsData: {
            typeof: Array,
            default(){
                return{

                }
            }
        }
    },
    data(){
        return {
            title: '',
            arrowLeft:require('../assets/img/news/arrow-left.png'),
            settings: {
                dots: true,
                infinite: true,
                autoplay: false,
                arrows: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 3,
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
                        breakpoint: 769,
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
            },
            en:{
                title: 'News',
                btnText: '...read more'
            },
            ru:{
                title: 'Новости',
                btnText: '...eщё'
            },
            moment: moment.locale('ru')
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
                value = value.substring(0, 120) + '';
            }
            return value
        },
        formatDate: function(value){
            if (value){
                return moment(String(value)).format(`LL`)
            }
        }
    },
    computed:{
        ...mapGetters([
            'NEWS'
        ]),
        classObject() {
            return this.NEWS.meta.total >= 4 ? 'control-width' : 'control-width1'
        },
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    methods:{
        ...mapActions([
            'GET_NEWS_FROM_API'
        ]),
    },
    mounted(){
        this.GET_NEWS_FROM_API()
        let currLanguage = localStorage.getItem('lang')
        if(currLanguage === 'gb-en'){
            moment.locale('en')
        } else {
             moment.locale('ru')
        }
    }

})
</script>

<style scoped>
.wrapper-card-inner .dots{
    display: inline-block;
    color: #2f2fff;
}



</style>
