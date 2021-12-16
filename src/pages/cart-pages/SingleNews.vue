<template>
    <div class="section-single-news">
        <IndexAdd  :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON"/>
        <div class="container container_card-padding">
            <div class="news-bg" v-bind:style="{ backgroundImage: 'url(' + singleNews.image + ')' }">
                <div class="news-title">
                    <h2 class="wrapper-content__title wrapper-content__title_single-news">
                        {{ singleNews.title }}
                    </h2>
                </div>
            </div>
            <div class="news-content">
                <p>
                    <img :src="singleNews.image" alt="">
                    {{ singleNews.content }}
                </p>
            </div>
        </div>
        <Footer :emailJSON="emailJSON"/>
    </div>
</template>

<script>

import axios from 'axios'
import IndexAdd from '../../components/index-add.vue'
import Footer from '../../components/Footer.vue'
import { mapActions, mapGetters } from 'vuex';
var config = require('../../../config/prod.env')

export default{
    name:'News',
    props:{
        emailJSON:{
            typeof:Array
        },
        changedAllInfoSecond: {
            typeof: Function
        },
    },
    components:{
        IndexAdd,
        Footer
    },
  
    data(){
        return{
            id: this.$route.params.id,
            singleNews: {}
        }
    },
    computed:{
        ...mapGetters([
            'LANG'
        ])
    },
    methods: {
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            this.emailJSON = codeFilterSecond
            localStorage.setItem('lang', el.code);
            axios.get(config.BASE_URL + `news/${this.$route.params.id}`)
            .then(res => {
                this.singleNews = res.data.data
                this.$router.push("/")
            })
            .catch(e => {
                this.errors.push(e)
            })
        }
    },
    mounted(){
         this.GET_LANG_FROM_API();
        axios.get( config.BASE_URL + `news/${this.$route.params.id}`)
        .then(res => {
            this.singleNews = res.data.data
        })
        .catch(e => {
            this.errors.push(e)
        })

         axios.get(config.BASE_URL + `countries`)
        .then( res =>{
            let codeFilter = res.data.data.filter(e => e.name === 'Global')
            this.emailJSON = codeFilter
        })
        axios.get(config.BASE_URL + `countries`)
            .then( res =>{
                let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
                this.emailJSON = codeFilter
            })
        
    }
    
  
    
}
</script>

<style scoped>
    .container_card-padding{
        padding: 0 50px;
    }
    .news-bg{
        background-repeat: no-repeat;
        background-size: cover;
        height: 185px;
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 115px;
    }
    .news-title{
        background-color: #fff;
        width: 94%; 
        display: flex;
        padding: 0 28px;
        justify-content: left;
        align-items: center;
        height: 150px;
        position: absolute;
        bottom: -30%;
        box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.25);
    }
    .wrapper-content__title::after{
        width: 75px;
        height: 4px;
    }
    .wrapper-content__title_single-news{
        font-size: 36px;
        padding-bottom: 13px;
    }
    .news-content{
        margin: 0 auto 50px;
        width: 94%;
    }
    .news-content img{
        width: 493px;
        height: 315px;
        float: left;
        margin: 0 30px 15px 0;
    }
    
    @media (max-width: 768px){
        .wrapper-content__title_single-news{
            font-size: 26px;
        }
        .container_card-padding{
            padding: 0 20px;
        }
    }
    @media (max-width: 768px){
         .wrapper-content__title_single-news{
            font-size: 22px;
        }
    }
    @media (max-width: 375px){
         .wrapper-content__title_single-news{
            font-size: 18px;
        }
    }
</style>