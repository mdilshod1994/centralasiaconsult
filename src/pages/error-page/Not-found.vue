<template>
    <div class="error-page-404">
        <IndexAdd :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON" :key="componentKey"/>
        <div class="containaer container-error-page">
            <div class="wrapper-404">
                <div class="flex-wrapper-404">
                    <div class="wrapper-404-title">
                        <img :src="imgBg" alt="">
                    </div>
                    <div class="wrapper-404-title">
                        <p>
                            {{ changeText.title }}
                        </p>
                    </div>
                </div>
                <router-link to="/">{{ changeText.btnText }}</router-link>
            </div>
        </div>
        <Footer :key="componentKey" :emailJSON="emailJSON" />
    </div>
</template>

<script>
import IndexAdd from '../../components/index-add.vue'
import Footer from '../../components/Footer.vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
var config = require('../../../config/prod.env')


export default {
    components:{
        IndexAdd,
        Footer,
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
    data(){
        return{
            componentKey: 0,
            // imgBg: require('../../assets/img/error-page/1.png'),
            en:{
                title: 'Welcome to the 404 page! You are here because you entered the address of a page that no longer exists or has been moved to a different address',
                btnText: 'Back to main'
            },
            ru:{
                title: 'Добро пожаловать на страницу 404! Вы находитесь здесь, потому что ввели адрес страницы, которая уже не существует или была перемещена по другому адресу',
                btnText: 'Вернуться на главную'
            },
        }
    },
    computed: {
        ...mapGetters([
            'LANG'
        ]),
        changeText(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
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
<style>
.container-error-page{
    padding: 0 20px;
}
.error-page-404{

}
.wrapper-404{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 100px 0 140px;
}
.flex-wrapper-404{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.wrapper-404-title{
    max-width: 1390px;
    margin-top: 60px;
}
.wrapper-404-title p{
    font-size: 33px;
    font-weight: 700;
}
.wrapper-404 a{
    display: block;
    width: 355px;
    padding: 6px 0;
    background: #22223C;
    border: 2px solid #22223C;
    box-sizing: border-box;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    margin-top: 70px;
    font-size: 25px;
}
@media (max-width: 992px){
    .wrapper-404-title p{
        font-size: 26px;
    }
}
@media (max-width: 768px){
    .wrapper-404{
        margin: 40px 0 70px;
    }
}
@media (max-width: 992px){
    .wrapper-404-title p{
        font-size: 19px;
    }
}
</style>