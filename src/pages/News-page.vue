<template>
    <div class="section-news-page">
        <IndexAdd  :emailJSON="emailJSON" :changedAllInfoSecond="changedAllInfoSecond"/>
        <div class="container container_card-padding">
            <h1 class="wrapper-inner__title wrapper-inner__title_news" :key="componentKey">
                {{ $t('titleNEWS') }}
            </h1>
            <div class="wrap-news">
                <div class="wrapper-news">
                    <div class="wrapper-cards">
                        <router-link class="wrapper-card" :to="/new/ + item.id"   v-for="item in firstDefaultPage" :key="item.id" >
                            <div class="wrapper-card-content">
                                <div class="wrap-image">
                                    <img :src="item.image" alt="">
                                </div>
                                <div class="wrapper-card-inner">
                                    <span>{{ item.category.created_at | formatDate() }}</span>
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
                    <div class="wrapper-btns">
                        <button class="first-btn btn-icon" @click="firstPage">
                             <fa class="" icon="angle-left" />
                              <fa class="" icon="angle-left" />
                        </button>
                        <button class="prev-btn btn-icon" @click="prevPage">
                             <fa class="" icon="angle-left" />
                        </button>
                        <ul class="list-of-numbers">
                            <li class=" btn-icon"  v-for="page in pagesNumber" :key="page" @click="tocrntPage(page)">
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
        <Footer :key="componentKey" :emailJSON="emailJSON" />
    </div>
    
</template>


<script>
import axios from 'axios';
import IndexAdd from '../components/index-add.vue'
import Footer from '../components/Footer.vue'
import { mapActions, mapGetters } from 'vuex';
import i18n from 'vue-i18n'
import moment from 'moment'
var config = require('../../config/prod.env')



export default {
    name: 'news-page',
    props:{
        emailJSON:{
            typeof:Array
        },
        changedAllInfoSecond: {
            typeof: Function
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
            arrowLeft:require('../assets/img/news/arrow-left.png'),
            titleEn: 'News',
            titleRu: 'Новости'
        }
    },
    computed:{
        ...mapGetters([
            'NEWS'
        ]),
        ...mapGetters([
            'LANG'
        ]),
        changeTitleNews(){
            return localStorage.getItem('lang') === 'gb-en' ? this.titleEn : this.titleRu
        }
    },
    methods:{
        ...mapActions([
            'GET_NEWS_FROM_API'
        ]),
        prevPage(){
           axios.get(this.prvPage)
            .then(response => {
            // JSON responses are automatically parsed.
            this.firstDefaultPage = response.data.data
            this.nxtPage = response.data.links.next
            this.prvPage = response.data.links.prev
            })
            .catch(e => {
            this.errors.push(e)
            })
           
        },
        nextPage(){
         axios.get(this.nxtPage)
            .then(response => {
            // JSON responses are automatically parsed.
            this.firstDefaultPage = response.data.data
            this.nxtPage = response.data.links.next
            this.prvPage = response.data.links.prev
            })
            .catch(e => {
            this.errors.push(e)
            })
        },
         firstPage(){
            axios.get(this.frstPage)
            .then(response => {
            // JSON responses are automatically parsed.
            this.firstDefaultPage = response.data.data
            this.frstPage = response.data.links.first
            this.lstPage = response.data.links.last
            })
            .catch(e => {
            this.errors.push(e)
            })
        },
         lastPage(){
             axios.get(this.lstPage)
            .then(response => {
            // JSON responses are automatically parsed.
            this.firstDefaultPage = response.data.data
            this.frstPage = response.data.links.first
            this.lstPage = response.data.links.last
            })
            .catch(e => {
            this.errors.push(e)
            })
        },
        tocrntPage(el){
            axios.get( config.BASE_URL + `news?page=${el}`)
            .then(response => {
            this.firstDefaultPage = response.data.data
            this.nxtPage = response.data.links.next
            this.prvPage = response.data.links.prev
            })
            .catch(e => {
            this.errors.push(e)
            })

        },
        // changedAllInfo(event){
        //     localStorage.setItem('lang', event.target.value)
        //     const country = localStorage.getItem('lang')
        //     axios.defaults.headers['Accept-Language'] = country
            
        //     axios.get('https://cacg.web.bobo.tj/api/countries')
        //     .then(res => {
        //         let codeFilter = res.data.data.filter(e => e.code === event.target.value)
        //         this.emailJSON = codeFilter
        //     })
        // }
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            this.emailJSON = codeFilterSecond
            this.areSelectVisible = false
            localStorage.setItem('lang', el.code);
            this.componentKey += 1;
            if (this.$i18n.locale !== el.code){
                this.$i18n.locale = el.code
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
        this.GET_NEWS_FROM_API(),
        axios.get(config.BASE_URL + `news`)
        .then(response => {
        // JSON responses are automatically parsed.
        this.firstDefaultPage = response.data.data
        this.frstPage = response.data.links.first
        this.nxtPage = response.data.links.next
        this.prvPage = response.data.links.prev
        this.lstPage = response.data.links.last           
        for (let i = 1 ; i < response.data.meta.last_page +1 ; i++) {
            this.pagesNumber = i
        }
        // this.currentPageFrom = response.data.meta
        })
        .catch(e => {
        this.errors.push(e)
        })
        axios.get( config.BASE_URL + `countries`)
            .then( res =>{
            let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
            this.emailJSON = codeFilter
            console.log('FIRST', res.data.data );
        })
        let currLanguage = localStorage.getItem('lang')
        if(currLanguage === 'gb-en'){
            moment.locale('en')
        } else {
             moment.locale('ru')
        }
    },
   
       
}
</script>

<style scoped>
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
.wrapper-card{
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

@media (max-width: 1440px){
    .wrapper-card{
        width: 22% !important;
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