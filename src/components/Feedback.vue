<template>
    <div class="section-feedback">
        <div class="container section-container">
            <h2 class="wrapper-inner__title wrapper-inner__title_feedback">
                {{ changeTitle.title }}
            </h2>
            <slick class="wrapper-feedbacks" ref="slick" :options="settings" v-if="FEEDBACKS.data.length > 0">
                <div v-for="feedback in FEEDBACKS.data" :key="feedback.id" :feedback_data="feedback" class="wrapper-feedback" >
                    <!-- <img src="./img/feedback.png" alt="" class="wrapper-feedback__img"> -->
                    <div  class="feedback__content">
                        <p class="wrapper-content__text wrapper-content__text_dash">
                            {{ feedback.description  | truncate(20)  }}
                            <span @click="showPopup(feedback.id)"> {{ changeTitle.btnText }} </span>
                        </p>
                        <div class="wrapper-feedback__content">
                            <img :src="  feedback.image" alt="" class="wrapper-feedback__img">
                            <div class="wrap-feedback__inner">
                                <h5 class="wrap-feedback__title">
                                    {{ feedback.name }}
                                </h5>
                                <p class="wrap-feedback__text">
                                    {{ feedback.prefession }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </slick>
            <transition name="fade" appear>
                <div class="modal-overlay"  v-if="isPopupVisible">
                    <div class="modal-window">
                        <div class="modal-content">
                            <button class="btn-modal" @click="closePopup"><fa class="icon-close" icon="window-close"/></button>
                             <div class="wrap-feedback__inner wrap-feedback__inner_modal">
                                <div class="wrap-feedback__inner_name">
                                        <img :src="  feedbacks.image" alt="" class="wrapper-feedback__img">
                                    <h5 class="wrap-feedback__title  wrap-feedback__text_modal">
                                        {{ feedbacks.name }}
                                    </h5>
                                </div>
                                <p class="wrap-feedback__text wrap-feedback__text_prof wrap-feedback__text_modal">
                                    {{ feedbacks.prefession }}
                                </p>
                            </div>
                            <p class="wrapper-content__text wrapper-content__text_dash modal-window__text">
                                {{ feedbacks.description    }}
                            </p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import {mapActions, mapGetters} from 'vuex'
var config = require('../../config/prod.env')

export default {
    name:'Feedback',
    components:{
        Slick,
    },
    props:{
        feedbacks: {
            typeof:Object,
            default(){
                return{
                }
            }
        },
    },
    data () {
        return {
            en:{
                title: 'Feedbacks',
                btnText: '...read more' 
            },
            ru:{
                title: 'ОТЗЫВЫ',
                btnText: '...ещё' 
            },
            settings: {
            dots: true,
            infinite: true,
            autoplay: true,
            arrows: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                    {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                    },
                    {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 2
                    }
                    },
                    {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                    }
                ]
            },
            isPopupVisible: false,
            feedbacks: [],
        }
    },
    beforeUpdate() {
        if (this.$refs.slick) {
            this.$refs.slick.destroy();
        }
    },
    updated() {
        this.$nextTick(function () {
            if (this.$refs.slick) {
                this.$refs.slick.create(this.slickOptions);
            }
        });
    },
     filters:{
        truncate: function(value){
            if(value && value.length > 20){
                value = value.substring(0, 250) + '';
            }
            return value
        }
    },
    computed:{
        ...mapGetters([
            'FEEDBACKS'
        ]),
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    methods:{
        ...mapActions([
            'GET_FEEDBACKS_FROM_API'
        ]),
        showPopup(id){
                this.isPopupVisible = true;
                fetch( config.BASE_URL + 'feedbacks/' + id)
                    .then(response => response.json())
                    .then(json => {
                    this.feedbacks = json.data
            }) 
            
        },
        closePopup(){
            this.isPopupVisible = false 
        },
    },
    mounted(){
        this.GET_FEEDBACKS_FROM_API()
         
    }
}
</script>

<style scoped>
    .wrapper-content__text_dash span{
        color: blue;
        cursor: pointer;
    }
    button{
        color: red;
        cursor: pointer;
    }
    .modal-overlay{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    .modal-window{
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content{
        position: relative;
        border-radius: 20px;
        background-color: #fff;
        padding: 35px 35px 0;
        width: 700px;
        height: 450px;
        overflow-y: scroll;
        border-bottom: 30px solid #fff;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #22223c; 
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #3f3f61;
    }
    ::-webkit-scrollbar-track-piece{
        margin: 15px;
    }
    .wrap-feedback__inner_name{
        display: flex;
        align-items: center;

    }
    
    .wrap-feedback__inner_modal{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .wrap-feedback__text_modal{
        margin: 0 20px;
        font-size: 17px;
    }
    .btn-modal{
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .icon-close{
        color: #22223c;
        font-size: 20px;
    }


    @media (max-width: 992px) {
        .modal-window__text{
            font-size: 15px !important;
        }
        .modal-content{
            width: 95% !important;
        }
    }
    @media (max-width: 425px) {
        .wrap-feedback__inner_modal{
            flex-direction: column !important;
        }
        .wrap-feedback__text_prof{
            margin-top: 20px;
        }
    }


</style>