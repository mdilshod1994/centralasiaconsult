<template>
    <div class="header">
        <div class="top-header">
            <div class="container">
                <div class="header-wrapper_top" v-for="info in emailJSON" :key="info.id">
                    <div class="address" >
                        <div class="address-block">
                            <a :href="`tel:${info.phone_number}`" class="phone-block__text">
                                <img :src="imgTel" alt="" class="address-block__icon">
                                <span>{{ info.phone_number }}</span>
                            </a>
                        </div>
                        <div class="address-block">
                            <a :href="`mailto:${info.email}`" class="phone-block__text phone-block__text_fz">
                                <img :src="imgEnvel" alt="" class="address-block__icon">
                                <span>{{ info.email }}</span>
                            </a>
                        </div>
                    </div>
                    <v-select name="option">
                        <div class="v-select"  >
                            <p @click="areSelectVisible = !areSelectVisible" >
                                <img :src="info.country_flag" class="v-select__img" alt="">
                                {{ info.name }}
                                <fa   class="menu-item-icon" icon="angle-down"/>
                            </p>
                            <div class="options" v-if="areSelectVisible"  >
                                <p v-for="lang in LANG.data" :key="lang.id" :value="lang.code"  @click="changedAllInfoSecond(lang)" >
                                    <img :src="lang.country_flag" class="v-select__img" alt="" >
                                    {{ lang.name }}
                                </p>
                            </div>
                        </div>
                    </v-select>
                </div>
            </div>
        </div>
        <div class="bottom-header ">
            <div class="header-wrapper_bottom"   id="header-wrapper_bottom" >
                <div class="container">
                    <div class="header-wrapper_bottom1 " v-for="info in emailJSON" :key="info.id">
                        <router-link to="/" >
                            <!-- <img src="./img/Logo.png" alt="" > -->
                            <img :src="info.logo" alt="">
                        </router-link>
                        <Navbar class="nav__list" @scroll="stickyHeaderMenu()" id="nav__list"/>
                        <span @click="toogleMenu" class="bar">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import $ from 'jquery'
import Navbar from './Navbar'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Index',
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
    components: {
        Navbar,
    },
    data () {
        const lang = localStorage.getItem('lang') || 'gb-en';
        return {
            lang: lang,
            imgTel: require('../assets/img/phone.svg'),
            imgEnvel: require('../assets/img/envelop.svg'),
            areSelectVisible: false,
            imgGlobal: require('../assets/img/global.png'),
        }
    },
    computed: {
        ...mapGetters([
            'LANG'
        ])
    },
    created (){
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed (){
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
        toogleMenu(){
            $('.nav__list').toggleClass('show')
        },
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        hideSelect(){
            this.areSelectVisible = false
        },
        handleScroll() {
            const headerSticky = document.getElementById('header-wrapper_bottom');
            const navSticky = document.getElementById('nav__list')
            const topOfHeader = 60
            function fixHeader(){
                if(window.scrollY >= topOfHeader){
                    headerSticky.classList.add('sticky')
                    navSticky.classList.add('follow')
                }else{
                    headerSticky.classList.remove('sticky')
                    navSticky.classList.remove('follow')
                }

            }
            window.addEventListener('scroll', fixHeader);
        }
    },
    mounted(){
        this.GET_LANG_FROM_API();

        $('.bar').on('click', function(){ $('body').toggleClass('no-scroll');
        });
        $('.hamburger-close').on('click', function(){ $('body').removeClass('no-scroll');
        });


        document.addEventListener('click', this.hideSelect.bind(this), true)
    },

    beforeDestroy(){
        document.removeEventListener('click', this.hideSelect)
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.v-select{
    position: relative;
    width: 145px;
}
.v-select p{
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-transform: uppercase;
    font-size: 16px;
}
.menu-item-icon{
    margin-left: 10px;
    transform: rotate(270deg);
    transition: all .4s ease;
}

.v-select p:hover .menu-item-icon{
    transform: rotate(0deg);
}

.options{
    width: 166px;
    position: absolute;
    top: 40px;
    left: -20px;
    border-radius: 7px;
    display: block;
    z-index: 9999;
    background: #fff;
    padding: 10px;
}
.options p {
    color: black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px;
    font-weight: 400;
    border-bottom: 1px solid grey;
}
.options p:last-of-type{
    border-bottom: none;
}
.v-select__img{
    width: 18px;
    margin-right: 10px;
}

</style>
