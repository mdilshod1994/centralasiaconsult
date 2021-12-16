<template>
    <nav class="menu-list" :key="changeTitle">
        <div class="menu-item"><router-link v-for="text in changeTitle" :key="text.id" :to="text.link" class="menu-item__link"> {{text.title }} </router-link></div>
    </nav>
</template>


<script>


export default {
    name:'navbar',
    data(){
        return {
            en:[
                {
                    title: 'Main',
                    link: '/',
                    id: 1
                },
                {
                    title: 'About Us',
                    link: '/about-company',
                    id: 1
                },
                 {
                    title: 'Services',
                    link: '/service-page',
                    id: 2
                },
                 {
                    title: 'Industries',
                    link: '/industry-page',
                    id: 3
                },
                 {
                    title: 'Contact us',
                    link: '/#contact',
                    id: 4
                },
            ],  
            ru:[
                {
                    title: 'Главная',
                    link: '/',
                    id: 1
                },
                {
                    title: 'О компании',
                    link: '/about-company',
                    id: 1
                },
                 {
                    title: 'Услуги',
                    link: '/service-page',
                    id: 2
                },
                 {
                    title: 'Отрасли',
                    link: '/industry-page',
                    id: 3
                },
                 {
                    title: 'Контакты',
                    link: '/#contact',
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

}
</script>

<style>

</style>