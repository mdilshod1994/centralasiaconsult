<template>
    <div class="section-achievement">
        <div class="container section-container">
            <div class="wrapper-achiev" v-bind:style="{background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${imgBg}')`}">
                <div class="wrapper-achiev-contents">
                    <div class="wrapper-achiev-content wrapper-achiev-content_left">
                        <p class="wrapper-achiev-content__text">
                            {{ changeText.question }}
                        </p>
                        <h4 v-html="changeText.title" class="wrapper-achiev-content__title">
                            {{ changeText.title }}
                        </h4>
                    </div>
                    <div class="wrapper-achiev-content"  >
                        <ul class="wrapper-achiev-content__list">
                            <li class="wrapper-achiev-content__item" v-for="item in changeTitle" :key="item.id">
                                <img :src="item.img" alt="">
                                <span>
                                    {{ item.qntty }}
                                </span>
                                <p>
                                    {{ item.description }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import bgImg from '../assets/img/achievment/bg.jpg'


export default({
    name:'Achievement',
    data() {
        return{
            imgBg: bgImg,
             en:{
                title: 'CA Consulting Group is your reliable <br> business and technology partner!',
                question: 'WHY CHOOSE US?' 
            },
            ru:{
                title: 'CA Consulting Group - Ваш надежный <br> партнер в сфере бизнеса и технологий!',
                question: 'ПОЧЕМУ ИМЕННО МЫ?' 
            },
            achievRuJSON:[
                {
                    id:'1',
                    img: require('../assets/img/achievment/1.svg'),
                    qntty:'100+',
                    description: 'Успешно завершенные кейсы'
                },
                 {
                    id:'2',
                    img:  require('../assets/img/achievment/2.svg'),
                    qntty:'25+',
                    description: 'Высококвалифицированные специалисты'
                },
                 {
                    id:'3',
                    img: require('../assets/img/achievment/3.svg'),
                    qntty:'100%',
                    description: 'Удовлетворенность наших клиентов'
                },
            ],
            achievEnJSON:[
                {
                    id:'1',
                    img: require('../assets/img/achievment/1.svg'),
                    qntty:'100+',
                    description: 'Successfully completed cases'
                },
                 {
                    id:'2',
                    img:  require('../assets/img/achievment/2.svg'),
                    qntty:'25+',
                    description: 'Highly qualified specialists'
                },
                 {
                    id:'3',
                    img: require('../assets/img/achievment/3.svg'),
                    qntty:'100%',
                    description: 'Satisfaction of our customers'
                },
            ],
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.achievEnJSON : this.achievRuJSON
        },
        changeText(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        },
    },
})
</script>

<style scoped>
</style>
