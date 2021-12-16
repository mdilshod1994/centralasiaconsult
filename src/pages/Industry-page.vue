<template>
    <div class="section-news-page">
        <IndexAdd  :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON" />
        <div class="container container_card-padding">
            <h1 class="wrapper-inner__title wrapper-inner__title_news" :key="componentKey">
                {{ $t('titleIndustry') }}
            </h1>
            <div class="wrap-news">
                <div class="wrapper-news">
                    <div class="wrapper-sliders" >
                        <router-link :to="/industry/ + industry.id"  class="wrapper-industry"   v-for="industry in industryData" :key="industry.id" v-bind:style="{ backgroundImage: `url(${industry.image})` }">
                            <div class="industry-content">
                                <h5 class="wrapper-content__title wrapper-content__title_fz">
                                    {{ industry.title }}
                                </h5>
                                <p class="wrapper-content__text wrapper-content__text_fz">
                                    {{ industry.description }}
                                </p>
                            </div>
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
        </div>
        <Footer :key="componentKey" :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON" />
    </div>
    
</template>


<script>

import IndexAdd from '../components/index-add.vue'
import Footer from '../components/Footer.vue'
var config = require('../../config/prod.env')
import axios from 'axios';
const lang = localStorage.getItem('lang') || 'gb-en';
import { mapActions, mapGetters } from 'vuex'
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
        industryData:{
            typeof:Array
        },
        firstDefaultPage:{
            typeof: Object,
            default(){
                return{

                }
            }
        },
        nxtPage:{
            typeof:Array,
            default(){
                return{

                }
            }
        },
        prvPage:{
            typeof: Array,
            default(){
                return{

                }
            }
        },
        frstPage:{
            typeof:Array,
            default(){
                return{

                }
            }
        },
        lstPage:{
            typeof:Array,
            default(){
                return{

                }
            }
        },
        pagesNumber:{
            typeof: Array,
            default(){
                return{

                }
            }
        }
      
       
        
    },
    components:{
        IndexAdd,
        Footer,
        i18n
    },
    data(){
        return{
            lang: lang,
            title:'ОТРАСЛИ',
            arrowLeft:require('../assets/img/news/arrow-left.png'),
            industryData:null,
        }
    },
    computed: {
        ...mapGetters([
            'LANG'
        ]),
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.footerEnMenuJSON : this.footerRuMenuJSON
        },
        changeText(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
        
    },
    methods:{
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        prevPage(){
        //     console.log('asd');
        //    axios.get(this.prvPage)
        //     .then(response => {
        //     // JSON responses are automatically parsed.
        //     this.firstDefaultPage = response.data.data
        //     this.nxtPage = response.data.links.next
        //     this.prvPage = response.data.links.prev
        //     })
        //     .catch(e => {
        //     this.errors.push(e)
        //     })
           
        },
        nextPage(){
        //  axios.get(this.nxtPage)
        //     .then(response => {
        //     // JSON responses are automatically parsed.
        //     this.firstDefaultPage = response.data.data
        //     this.nxtPage = response.data.links.next
        //     this.prvPage = response.data.links.prev
        //     })
        //     .catch(e => {
        //     this.errors.push(e)
        //     })
        },
         firstPage(){
            // axios.get(this.frstPage)
            // .then(response => {
            // // JSON responses are automatically parsed.
            // this.firstDefaultPage = response.data.data
            // this.frstPage = response.data.links.first
            // this.lstPage = response.data.links.last
           
            // })
            // .catch(e => {
            // this.errors.push(e)
            // })
        },
         lastPage(){
            //  axios.get(this.lstPage)
            // .then(response => {
            // // JSON responses are automatically parsed.
            // this.firstDefaultPage = response.data.data
            // this.frstPage = response.data.links.first
            // this.lstPage = response.data.links.last
            // })
            // .catch(e => {
            // this.errors.push(e)
            // })
        },
        tocrntPage(el){
            // axios.get(`https://cacg.web.bobo.tj/api/news?page=${el}`)
            // .then(response => {
            // this.firstDefaultPage = response.data.data
            // this.nxtPage = response.data.links.next
            // this.prvPage = response.data.links.prev
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
            let entityIndustry = {"entity": "industry"}
            axios.post(config.BASE_URL + 'category/entity',  entityIndustry )
            .then(response => {
                this.industryData = response.data.data
            })
        }
 
        
    },
   
    // filters:{
    //     truncate: function(value){
    //         if(value && value.length > 20){
    //             value = value.substring(0, 65) + '...';
    //         }
    //         return value
    //     }
    // },
    
    mounted(){
        this.GET_LANG_FROM_API()
        axios.get(config.BASE_URL +  `countries`)
            .then( res =>{
                let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
                this.emailJSON = codeFilter
            })
        let entityIndustry = {"entity": "industry"}
        axios.post(config.BASE_URL + `category/entity`, entityIndustry)
        .then(response => {
            this.industryData = response.data.data
        })
        let codeFilterSecond = this.LANG.data.filter(e => e.name === 'Global')
        this.emailJSONSecond = codeFilterSecond
       
    }
    
       
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
    transition: .2s ease-in;
    color: #000;
}

.wrapper-industry:hover{
    filter: drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.25));
    transform: scale(1.006);
}


.wrapper-cards{
    flex-wrap: wrap;
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

@media (max-width: 1024px){
    .wrapper-sliders{
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .wrapper-industry{
        width: 28.3%;
        margin: 10px 20px 166px;
    }
}

@media (max-width: 992px){
    .wrapper-industry{
        width: 43.3%;
        margin: 10px 20px 166px;
    }
}

@media (max-width: 768px){
    .wrapper-industry{
        width: 41.3%;
        margin: 10px 20px 173px;
    }
}

@media (max-width: 480px){
    .wrapper-industry{
        width: 100%;
    }
}



</style>