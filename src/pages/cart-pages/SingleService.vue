<template>
    <div class="section-single-service">
        <IndexAdd :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON"/>
            <div class="container container_card-padding">
                <div class="wrapper-single-news">
                    <div class="news-bg" v-bind:style="{ backgroundImage: 'url(' + firstBg + ')' }">
                        <div class="news-title">
                            <h2 class="wrapper-content__title wrapper-content__title_single-news">
                                {{ singleIndustryData.title }}
                            </h2>
                        </div>
                    </div>
                    <div class="news-content">
                        <p> 
                            <img :src="secondBg" alt="">
                            {{ singleIndustryData.description }}
                        </p>
                    </div>
                </div>
            </div>
        <Footer :changedAllInfo="changedAllInfo" :emailJSON="emailJSON"/>
    </div>
</template>

<script>
import IndexAdd from '../../components/index-add.vue'
import Footer from '../../components/Footer.vue'
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'
var config = require('../../../config/prod.env')



export default{
    name:'News',
    props:{
        singleIndustryData:{
            typeof: Array,
        },
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
            singleIndustryData:[],
            firstBg: require("../../assets/img/singleservice/1.png"),
            secondBg: require("../../assets/img/singleservice/2.png"),
            desct: "Бухгалтерский аутсорсинг возможен в разных комбинациях. Чем крупнее бухгалтерская компания, тем больше вариантов мы можем предложить. Перечень бухгалтерских услуг не ограничивается ведением налогового и бухгалтерского учета. Это может быть и функция главного бухгалтера для выполнение только самых ответственных и сложных задач. Кроме того, это могут быть и услуги, не относящиеся напрямую к бухгалтерии (ведение кадров, юридическая поддержка, оптимизация налогов, помощь в смене учетной системы).Какой вид бухгалтерского аутсорсинга выбрать, зависит от финансовых возможностей и специфики деятельности вашей компании. Отдать бухгалтерию на аутсорсинг – это значит полностью или частично передать учетную функцию профессиональной компании. "
            

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
        // changedAllInfo(event, ){
        //     axios.get('https://cacg.web.bobo.tj/api/countries')
        //     .then(res => {
        //         let codeFilter = res.data.data.filter(e => e.code === event.target.value)
        //         this.emailJSON = codeFilter
        //     })

        //     localStorage.setItem('lang', event.target.value)
        //     const country = localStorage.getItem('lang')
        //     axios.defaults.headers['Accept-Language'] = country

        //     axios.get(config.BASE_URL + `category/${this.$route.params.id}`)
        //     .then(response => {
        //         this.singleIndustryData = response.data.data
        //         console.log('dadad', this.singleIndustryData);
        //     })
        // },
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            this.emailJSON = codeFilterSecond
            this.areSelectVisible = false
            localStorage.setItem('lang', el.code);
             this.$router.push("/")
            console.log()
        }
    },
    mounted(){
        this.GET_LANG_FROM_API();

         axios.get(config.BASE_URL + `countries`)
        .then( res =>{
            let codeFilter = res.data.data.filter(e => e.name === 'Global')
            this.emailJSON = codeFilter
        })
        axios.get( config.BASE_URL + `countries`)
            .then( res =>{
                let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
                this.emailJSON = codeFilter
            })

       
        
        let entityIndustry = {"entity": "service"}

        
        axios.get(config.BASE_URL + `category/${this.$route.params.id}`, entityIndustry)
        .then(response => {
            this.singleIndustryData = response.data.data
        })
        .catch(e => {
            this.errors.push(e)
        })  
    }
    
  
    
}
</script>
<style scoped>
    .container_card-padding{
        padding: 0 50px;
    }
    .wrapper-single-news{
        min-height: 750px;
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

@media (max-width: 525px){
    .wrapper-content__title_single-news{
        font-size: 23px;
    }
}


</style>