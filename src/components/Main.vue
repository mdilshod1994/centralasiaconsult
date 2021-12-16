<template>
    <div id="app" >
        <Index  :emailJSON="emailJSON" :changedAllInfoSecond="changedAllInfoSecond" :key="componentKey" />
        <Banner :emailJSON="emailJSON" :changedAllInfoSecond="changedAllInfoSecond" />
        <Advantage  id="advantage" :class="this.langGB  === 'gb-en' ? '':'advantage-none'" />
        <Aboutcompany :key="componentKey" :changeTitleNews="changeTitleNews" :emailJSON="emailJSON" />
        <Services  :serviceData="serviceData" :key="componentKey"/>
        <Industry  :industryData="industryData"  :key="componentKey"/>
        <News :newsData="newsData" :key="componentKey"/>
        <Achievement :key="componentKey"/>
        <Feedback :key="componentKey"/>
        <Partners :key="componentKey"/>
        <Map :key="componentKey" :emailJSON="emailJSON"  />
        <Request  :key="componentKey"/>
        <Footer :key="componentKey" :emailJSON="emailJSON" />
    </div>
</template>


<script>
import Vue from 'vue'
import Index from './Index.vue'
import Banner from './Banner'
import Aboutcompany from './Aboutcompany'
import Services from './Services'
import Industry from './Industry'
import Feedback from './Feedback'
import Partners from './Partners'
import Map from './Map'
import Footer from './Footer'
import News from './News.vue'
import Achievement from './Achievement.vue'
import Advantage from './Advantage.vue'
import { mapActions, mapGetters } from 'vuex'
var config = require('../../config/prod.env')
import axios from 'axios'
import i18n from 'vue-i18n'
import Request from './Rewquest.vue'
import VueHead from 'vue-head'

Vue.use(VueHead)

export default {
    name: 'Main',
    components: {
        i18n,
        Index,
        Banner,
        Advantage,
        Aboutcompany,
        Services,
        Industry,
        Feedback,
        Partners,
        Map,
        Footer,
        News,
        Achievement,
        Request
    },
    data() {
        const lang = localStorage.getItem('lang') || 'gb-en';
        return{
            lang: lang,
            emailJSON: [],
            industryData: [],
            serviceData:[],
            lang: [],
            newsData: [],
            areSelectVisible: false,
            activeAdvantage: true,
            componentKey: 0,
            ru:'',
            en:''
        }
    },
    computed:{
        ...mapGetters([
            'LANG'
        ]),
        langGB(){
            return localStorage.getItem('lang')
        },
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    head:{
        meta:[
            { property: 'og:title', content: 'Central Asia Consulting Group' },
            { property: 'og:description', content: localStorage.getItem('lang') === 'gb-en' ? 'Everything for the development and expansion of your business according to a single quality standard!' : 'Это широкий спектр услуг - всё необходимое для построения полного цикла ведения бизнеса' },
            { property: 'og:type', content: 'article' },
            { property: 'og:site_name', content: 'Central Asia Consulting Group' },
            { property: 'og:image', content: 'http://cacg.web.bobo.tj/images/logo_global.png' },
        ]
    },
    methods:{
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            localStorage.setItem('lang', el.code);
            let codeFilter = this.LANG.data[0].code
            this.emailJSON = codeFilterSecond
            this.areSelectVisible = false
            axios.get(config.BASE_URL + 'news')
            .then((res) => {
                this.newsData = res.data.data
            })
            let entityIndustry = {"entity": "industry"}
            axios.post(config.BASE_URL + 'category/entity',  entityIndustry )
            .then(response => {
                this.industryData = response.data.data
            })
            let entityService = { "entity": "service"}
            axios.post(config.BASE_URL + 'category/entity',  entityService )
            .then(response => {
                this.serviceData = response.data.data
            })
            let currbg = el.code
            let idAdvantage = document.getElementById('advantage')
            if (currbg === codeFilter) {
                idAdvantage.classList.remove('advantage-none')
            }else{
                idAdvantage.classList.add('advantage-none')
            }
            this.componentKey += 1;
        }
    },
    mounted(){
        this.GET_LANG_FROM_API()
        axios.get( config.BASE_URL +`countries`)
            .then( res =>{
                const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'gb-en';
                let codeFilter = res.data.data.filter(e => e.code === lang)
                this.emailJSON = codeFilter
            })
        axios.get(config.BASE_URL + 'news')
        .then((res) => {
            this.newsData = res.data.data
        })
        let entityIndustry = {"entity": "industry"}
        axios.post(config.BASE_URL + 'category/entity',  entityIndustry )
            .then(response => {
            this.industryData = response.data.data
        })
        let entityService = { "entity": "service"}
        axios.post(config.BASE_URL + 'category/entity',  entityService )
        .then(response => {
            this.serviceData = response.data.data
        })
        let langGB = localStorage.getItem('lang')
        if(langGB === 'gb-en'){
            idAdvantage.classList.remove('advantage-none')
        }else{
            idAdvantage.classList.add('advantage-none')
        }
    }
}
</script>

