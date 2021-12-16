<template>
    <div class="section-news-page">
        <IndexAdd :key="componentKey" :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON"/>
        <div class="container">
            <h1 class="wrapper-inner__title wrapper-inner__title_news">
                {{ $t('tltleServices') }}
            </h1>
            <div class="wrapper-news">
                <div class="wrapper-services">
                    <router-link :to="/service/ + service.id" class="wrapper-service" v-for="service in serviceData" :key="service.id" :serviceData="service">
                        <img :src=" service.image" class="wrapper-service__img" alt="icon">
                        <h4 class="wrapper-service__title">
                            {{ service.title }}
                        </h4>
                        <p class="wrapper-service__text">
                            {{ service.description |truncate(50) }}
                        </p>
                    </router-link>
                </div>
                <div class="wrapper-btns">
                    <button class="first-btn btn-icon" @click="firstPage">
                            <fa class="" icon="angle-left" />
                            <fa class="" icon="angle-left" />
                    </button>
                    <button class="prev-btn btn-icon" @click="prevPage">
                            <fa class="" icon="angle-left" />
                    </button>
                    <ul class="list-of-numbers">
                        <li class=" btn-icon" v-for="page in pagesNumber" :key="page" @click="tocrntPage(page)">
                            {{page}}
                        </li>
                    </ul>
                    <button class="next-btn btn-icon" @click="nextPage">
                        <fa  icon="angle-right" />
                    </button>
                    <button class="last-btn btn-icon"  @click="lastPage">
                        <fa class="" icon="angle-right" />
                        <fa class="" icon="angle-right" />
                    </button>
                </div>
            </div>
        </div>
        <Footer :key="componentKey" :emailJSON="emailJSON"/>
    </div>
</template>


<script>


import IndexAdd from '../components/index-add.vue'
import Footer from '../components/Footer.vue'
import { mapActions, mapGetters } from 'vuex';
let config = require('../../config/prod.env')
import axios from 'axios';
import i18n from 'vue-i18n'



export default {
    name: 'news-page',
    props:{
        emailJSON:{
            typeof:Array
        },
        changedAllInfoSecond: {
            typeof: Function
        },
        areSelectVisible:{
            typeof: Function
        },
        serviceData:{
            typeof:Array
        },
        pageSize: {
                type: Number,
                default: 10
            },

    },
    components:{
        IndexAdd,
        Footer,
        i18n
    },
    data(){
        return{
            title:'УСЛУГИ',
            arrowLeft:require('../assets/img/news/arrow-left.png'),
        }
    },
    computed:{
        ...mapGetters([
            'LANG'
        ]),
         changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }

    },
    // Почему 2 раза?
    // filters:{
    //     truncate: function(value){
    //         if(value && value.length > 20){
    //             value = value.substring(0, 135) + '';
    //         }
    //         return value
    //     }
    // },
    methods:{
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        prevPage(){
            // console.log('asdasdasdasd');
            //  axios.get(`https://cacg.web.bobo.tj/api/news`)
            // .then(response => {
            // // JSON responses are automatically parsed.
            // this.posts = response.data.links.prev
            //  console.log('asd',response.meta);
            // })
            // .catch(e => {
            // this.errors.push(e)
            // })

        },
        nextPage(){
            // console.log('asds');
            //  axios.get(`https://cacg.web.bobo.tj/api/news`,  { params: { page: 3 } })
            // .then(response => {
            // // JSON responses are automatically parsed.
            // this.newsPages = response.data.links.next
            // console.log(response.data.links.next)
            // })
            // .catch(e => {
            // this.errors.push(e)
            // })
        },
         firstPage(){
            //  axios.get(`https://cacg.web.bobo.tj/api/news`)
            // .then(response => {
            // // JSON responses are automatically parsed.
            // this.posts = response.data.links.first
            // console.log(response.data.links.first)
            // })
            // .catch(e => {
            // this.errors.push(e)
            // })
        },
         lastPage(){
            //  axios.get(`https://cacg.web.bobo.tj/api/news`)
            // .then(response => {
            // // JSON responses are automatically parsed.
            // this.posts = response.data.links.last
            // console.log(response.data.links.last)
            // })
            // .catch(e => {
            // this.errors.push(e)
            // })
        },
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            this.emailJSON = codeFilterSecond
            this.areSelectVisible = false
            localStorage.setItem('lang', el.code);
            this.componentKey += 1;
            if (this.$i18n.locale !== el.code){
                this.$i18n.locale = el.code
            }
            let entityService = { "entity": "service"}
            axios.post(config.BASE_URL + 'category/entity',  entityService )
            .then(response => {
                this.serviceData = response.data.data
            })
        }


    },
    filters:{
        truncate: function(value){
            if(value && value.length > 20){
                value = value.substring(0, 65) + '...';
            }
            return value
        }
    },
    mounted(){
        this.GET_LANG_FROM_API();
        axios.get( config.BASE_URL +`countries`)
            .then( res =>{
                let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
                this.emailJSON = codeFilter
            })
        let entityService = {"entity": "service"}
        axios.post(config.BASE_URL + `category/entity`, entityService)
        .then(response => {
            this.serviceData = response.data.data
        })
        let codeFilterSecond = this.LANG.data.filter(e => e.name === 'Global')
        this.emailJSONSecond = codeFilterSecond

    },


}
</script>

<style scoped>
.container_card-padding{
    padding: 0 50px;
}
.wrapper-sliders{
    display: flex;
}

.wrapper-industry{
    width: 24% ;
}

.wrapper-cards{
    flex-wrap: wrap;
}
.wrapper-inner__title_news{
    margin: 55px 0 50px;
}
.wrapper-service{
    width: 18.6% !important;
}
.wrapper-btns{
    margin-top: 100px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper-card{
    width: 23% !important;
}
.wrap-image{
    width: 100%;
    height: 150px !important;
}

.list-of-numbers{
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper-card:nth-child(-n+4){
    margin-bottom: 50px;
}

@media (max-width: 992px){

    .wrapper-service{
        width: 28% !important;
        margin: 0 10px 20px !important;
    }
    .wrapper-services{
        justify-content: start !important;
    }
}
@media (max-width: 768px){

    .wrapper-service{
        width: 45% !important;
    }
}
@media (max-width: 768px){
    .wrapper-service{
        width: 45% !important;
    }
}

@media (max-width: 480px){
    .wrapper-service{
        width: 44% !important;
    }
    .wrapper-service__img{
        width: 52px;
        margin: 0 auto 11px !important;
    }

}
@media (max-width: 375px){
    .wrapper-service__title{
        font-size: 13px;
    }
    .wrapper-service__text{
        font-size: 12px;
    }
}


</style>
