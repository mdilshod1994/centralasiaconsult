<template>
    <div class="Company-cart" >
         <IndexAdd :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON" :key="componentKey"/>
            <div class="banner-company"  v-bind:style="{background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('${banner}')`}">
                <div class="container container_card-padding">
                    <div class="offer-banner">
                        <h1 class="offer-banner__title" v-bind="changeTitle"  > 
                            <!-- {{ $t('titleAbout') }} -->
                            {{ changeTitle.title }}
                        </h1>
                        <p class="offer-banner__text">
                            Central Asia Consulting Group
                        </p>
                    </div>
                </div>
            </div>
            <div class="container container_card-padding">
                <div class="company-content">
                    <p class="company-content__text" >
                        <img :src='contentImg' class='company-content__img' alt=''>
                        <span v-html="changeTitle.textAboutDescr"> 
                            <!-- {{ $t('textAboutDescr') }} -->
                             {{ changeTitle.textAboutDescr }}
                        </span>
                    </p>
                </div>
                <div class="feedback-letters">
                    <h4 class="feedback-letters__title">
                          <!-- {{ $t('tnxGiving') }} -->
                          {{ changeTitle.tnxGiving }}
                    </h4>
                    <div class="feedback-letters-images">
                        <img class="feedback-letters-img" :src="img.image" alt=""  v-for="img in imgsJSON" :key="img.id">
                    </div>
                </div>
                <Achievment :key="componentKey" class="padding-top" />
                <Map :key="componentKey" :emailJSON="emailJSON"/>
            </div>
        <Footer :key="componentKey" :emailJSON="emailJSON" />
    </div>
</template>

<script>
import IndexAdd from '../components/index-add.vue'
import Footer from '../components/Footer.vue'
import Achievment from '../components/Achievement.vue'
import Map from '../components/Map.vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import i18n from 'vue-i18n'
var config = require('../../config/prod.env')

export default {
    components:{
        i18n,
        IndexAdd,
        Footer,
        Achievment,
        Map
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
        }
    },
    data() {
        return {
            banner: require('../assets/img/company-cart/bg.png'),
            contentImg: require('../assets/img/company-cart/content.png'),
            imgsJSON:{
                image:{
                    id:'1',
                    image: require('../assets/img/company-cart/1.jpg')
                },
                image1:{
                    id:'2',
                    image: require('../assets/img/company-cart/2.jpg')
                },
                image2:{
                    id:'3',
                    image: require('../assets/img/company-cart/3.jpg')
                }
            },
            enInfoAboutCompany:{
                title: 'About Us',
                tnxGiving:"Letters of appreciation",
                textAboutDescr: "<span class='company-content__text_fw'>Central Asia Consulting Group</span> has been operating in the Central Asian market since 2012, specializing in providing a wide range of services for business.<br><br>Our services include everything that is necessary for building a full business cycle: creating companies, creating and expanding a legal structure, supporting transactions for the acquisition and sale of assets, real estate, obtaining licenses and work permits for foreign employees, consulting on labor and migration issues on working with personnel and closing a business.<br><br>A thorough analysis with a prompt solution of the problem will be provided at your disposal, as well as a step-by-step strategy for further actions from our professional consultants.<br><br>Our highly qualified professionals of various specializations with practical experience in the field of legal and contract law, registration and consulting services will  manage any tasks regarding your business.<br><br>Using the services of our specialists, you get the opportunity to ensure the development and expansion of your business by one working team according to a single quality standards."
            },
            ruInfoAboutCompany:{
                title: 'О Компании',
                tnxGiving:"Благодарственные письма",
                textAboutDescr: "<span class='company-content__text_fw'>Central Asia Consulting Group</span>работает на рынке Центральной Азии с 2012 года, специализируясь на предоставлении широкого спектра услуг для бизнеса.<br><br>Наши услуги включают в себя все необходимое для построения полного цикла ведения бизнеса: создание компаний, создание и расширение юридической структуры, сопровождение сделок по приобретению и продажи активов, недвижимости, получение лицензий и разрешений на работу иностранным сотрудникам, консультации по трудовым и миграционным вопросам по работе с персоналом и закрытие бизнеса.<br><br>К вашим услугам будет предоставлен тщательный анализ с оперативным решением проблемы, а также пошаговая стратегия по дальнейшим действиям от наших профессиональных консультантов.<br><br>Нашим высококвалифицированным профессионалам различных специализаций, имеющих практический опыт работы в области юридического и договорного права, регистрационных и консалтинговых услуг - любые задачи будут по плечу.<br><br>Воспользовавшись услугами наших специалистов, вы получаете возможность обеспечить развитие и расширение вашего бизнеса одной командой, работающей по единым стандартам качества."
            },
            componentKey: 0,
        }
    },
    computed: {
        ...mapGetters([
            'LANG'
        ]),
        changeTitle(){
            let vm = this
            let currLang = localStorage.getItem('lang')
            return currLang === 'gb-en' ?  vm.enInfoAboutCompany : vm.ruInfoAboutCompany
        },
    },
    methods: {
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            localStorage.setItem('lang', el.code);
            this.emailJSON = codeFilterSecond
            this.componentKey += 1;
            window.location.reload()
        }
    },
    mounted(){
        this.GET_LANG_FROM_API();
        axios.get(config.BASE_URL +  `countries`)
        .then( res =>{
            const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'gb-en';
            let codeFilter = res.data.data.filter(e => e.code === lang)
            this.emailJSON = codeFilter
        })
    }
}
</script>

<style scoped>
.banner-company{
    height: 410px;
    background-position: top !important;
    background-repeat: no-repeat !important;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.container_card-padding{
    width: 100%;
    padding: 50px;
}
.offer-banner{
    width: 100%;
}
.offer-banner__title{
    font-size: 58px;

}
.offer-banner__text{
    font-size: 48px;
}
.company-content__img{
    float: right;
    margin: 0 0 10px 10px;
}
.marg-bottom {
    margin-bottom: 10px;
}
.feedback-letters__title,
.company-content__text{
    font-size: 18px;
}
.company-content__text_fw{
    font-weight: 700;
}
.feedback-letters{
    margin-top: 33px;
}
.feedback-letters-images{
    display: flex;
    margin-top: 30px;
}
.feedback-letters-img{
    margin-right: 117px;
}
.feedback-letters-img:last-of-type{
    margin-right: 0;
}
.padding-top{
    padding-bottom: 50px;
}

@media (max-width: 1024px){
    .feedback-letters-img {
        max-width: 23%;
    }
}

@media (max-width: 992px){
    .feedback-letters-img {
        max-width: 29%;
        margin-right: 39px;
    }
}

@media (max-width: 768px){
    .company-content__img{
        max-width: 59%;
    }
}

@media (max-width: 480px){
    .feedback-letters-images{
        flex-wrap: wrap;
    }
    .feedback-letters-img {
        max-width: 44%;
        margin: 0 10px 15px;
    }
}

@media (max-width: 429px){
    .feedback-letters-images{
        flex-wrap: wrap;
    }
    .feedback-letters-img {
        max-width: 42%;
        margin: 0 10px 15px;
    }
}





</style>