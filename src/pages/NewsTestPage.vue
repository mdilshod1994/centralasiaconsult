<template>
    <div class="test-news-page">
        <IndexAdd  :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON" />
            <div class="container container_card-padding">
            <h1 class="wrapper-inner__title wrapper-inner__title_news" :key="componentKey">
                {{ $t('titleNEWS') }}
            </h1>
            <div class="wrap-news">
                <div class="wrapper-news">
                    <div class="wrapper-cards">
                        <router-link class="wrapper-card wrapper-card_cart" :to="/new/ + item.id"   v-for="item in newsData" :key="item.id" >
                            <div class="wrapper-card-content">
                                <div class="wrap-image">
                                    <img :src="item.image" alt="">
                                </div>
                                <div class="wrapper-card-inner">
                                    <span :key="componentKey">{{ item.category.created_at | formatDate() }}</span>
                                    <h4 class=" wrapper-card__title wrapper-service__title">
                                        {{ item.title |truncateForTitle(20) }}
                                    </h4>
                                    <p >
                                        {{ item.content |truncateForText(20)   }}
                                    </p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <paginate
                :click-handler="clickCallback"
                :container-class="'pagination'"
                :margin-pages="2"
                :next-text="'>'"
                :page-class="'page-items'"
                :page-link-class="'page-items__link'"
                :page-count="totalPage"
                :page-range="2"
                :prev-text="'<'"
                :active-class="'page-items__link_active'"
                :disabled-class="'page-items__link_disabled'"
                >
            </paginate>
        </div>
         <Footer :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON" />
    </div>
</template>
<script>
import Vue from 'vue'
import IndexAdd from '../components/index-add.vue'
import Footer from '../components/Footer.vue'
var config = require('../../config/prod.env')
import axios from 'axios';
const lang = localStorage.getItem('lang') || 'gb-en';
import { mapActions, mapGetters } from 'vuex'
import i18n from 'vue-i18n'
import moment from 'moment'
import Paginate from 'vuejs-paginate'



Vue.component('paginate', Paginate)

export default {
    name: "NewsTestPage",
     components:{
        IndexAdd,
        Footer,
        i18n,
        Paginate
    },
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
        newsData: {
            typeof: Array,
        }
    },
    data(){
        return{
            lang: lang,
            newsData: [],
            componentKey: 0,
        }
    },
    computed:{
        ...mapGetters([
            'LANG'
        ]),
    },
    methods:{
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            this.emailJSON = codeFilterSecond
            this.areSelectVisible = false
            localStorage.setItem('lang', el.code);
             this.componentKey += 1;
             if (this.$i18n.locale !== el.code){
                this.$i18n.locale = el.code
            }
            axios.get(config.BASE_URL + 'news')
            .then((res) => {
                this.newsData = res.data.data
            })
            let currLanguage = localStorage.getItem('lang')
            if(currLanguage === 'gb-en'){
                moment.locale('en')
            } else {
                moment.locale('ru')
            }
        }
    },
    filters:{
        truncateForText: function(value){
            if(value && value.length > 20){
                value = value.substring(0, 85) + '...';
            }
            return value
        },
        truncateForTitle: function(value){
            if(value && value.length > 20){
                value = value.substring(0, 45) + '...';
            }
            return value
        },
        formatDate: function(value){
            if (value){
                return moment(String(value)).format(`LL`)
            }
        }

    },
    mounted(){
        this.GET_LANG_FROM_API()
        axios.get(config.BASE_URL + `countries`)
            .then( res =>{
                let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
                this.emailJSON = codeFilter
            })
        axios.get(config.BASE_URL + 'news')
        .then((res) => {
            this.newsData = res.data.data
            this.totalPage = res.data.meta.last_page
            console.log(' this.totalPage',  this.totalPage);
        })
        let codeFilterSecond = this.LANG.data.filter(e => e.name === 'Global')
        this.emailJSONSecond = codeFilterSecond
        let currLanguage = localStorage.getItem('lang')
        if(currLanguage === 'gb-en'){
            moment.locale('en')
        } else {
            moment.locale('ru')
        }
    }
}
</script>
<style>
.container_card-padding{
    padding: 0 50px;
}

.wrapper-cards{
    flex-wrap: wrap;
    justify-content: flex-start;
}
.wrapper-inner__title_news{
    margin: 50px 0 40px;
}
.wrapper-btns{
    margin-top: 100px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper-card_cart{
    width: 23% !important;
    margin: 6px 13px !important;
    color: #000;
}
.wrap-image{
    width: 100%;
    height: 211px !important;
}

.list-of-numbers{
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper-card:nth-child(-n+4){
    margin-bottom: 50px;
}

.pagination{
    display: flex;
    justify-content: center;
    margin: 70px 0 35px;
}

.pagination li {
    margin: 10px;
}
.pagination li a {

    display: block;
    padding: 12px 21px;
    background: #22223C;
    border-radius: 50%;
    color: #fff;
    font-weight: 700;
    font-size: 24px;
}


.pagination  a.active {
    background-color: #C4C4C4;
    color: #22223C;
}

.pagination  a:hover {
    background-color: #C4C4C4;
    color: #22223C;
}



@media (max-width: 1440px){
    .wrapper-card{
        width: 22%;
    }
}

@media (max-width: 1024px){
    .wrapper-card{
        width: 30% !important;
    }
}

@media (max-width: 992px){
    .wrapper-card{
        width: 47% !important;
        margin: 0 auto 15px !important;
    }
    .wrapper-card:nth-child(-n+6){
        margin-bottom: 50px;
    }
}

@media (max-width: 768px){

    .wrapper-btns .btn-icon{
        width: 40px;
        height: 40px;
    }
}

@media (max-width: 600px){
    .container_card-padding {
        padding: 0 10px;
    }
}

@media (max-width: 480px){
    .wrapper-card{
        width: 90% !important;
    }
    .wrapper-card:nth-child(-n+7){
        margin-bottom: 50px;
    }
}

</style>
