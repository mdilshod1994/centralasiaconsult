<template>
    <nav class="menu-list"  >
        <ul class="menu-item" >
            <li v-for="text in changeTitle" :key="text.id">
                <a  :href="text.link"  class="menu-item__link">{{ text.title }}</a>
            </li>
        </ul>
    </nav>
</template>


<script>

import $ from 'jquery'

export default {
    name:'navbar',
    data(){
        return {
            en:[
                {
                    title: 'About Us',
                    link: '#about-company',
                    id: 1
                },
                 {
                    title: 'Services',
                    link: '#service',
                    id: 2
                },
                 {
                    title: 'Industries',
                    link: '#industry',
                    id: 3
                },
                 {
                    title: 'Contact us',
                    link: '#contact',
                    id: 4
                },
            ],  
            ru:[
                {
                    title: ' О компании',
                    link: '#about-company',
                    id: 1
                },
                 {
                    title: 'Услуги',
                    link: '#service',
                    id: 2
                },
                 {
                    title: 'Отрасли',
                    link: '#industry',
                    id: 3
                },
                 {
                    title: 'Контакты',
                    link: '#contact',
                    id: 4
                },
            ]
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        },
    },
    mounted(){
        $('.menu-item__link').on('click', function(){ $('#nav__list').removeClass('show');
        });
        $('.menu-item__link').on('click', function(){ $('body').removeClass('no-scroll');
        });
    }

}
</script>

<style>

</style>