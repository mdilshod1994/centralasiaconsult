<template>
    <div class="about-company" id="about-company">
        <div class="container section-container">
            <div class="wrapper-company" v-for="text in emailJSON" :key="text.id">
                <div class="wrapper-content">
                    <div class="wrapper-inner">
                        <div class="wrapper-inner__content">
                            <h2 class="wrapper-inner__title" v-bind="changeTitle">
                                ️{{ changeTitle.title }}
                            </h2>
                            <div v-html="text.description"  >
                                {{ text.description | truncate(20)  }}
                            </div>
                        </div>
                        <router-link to="/about-company"  :emailJSON="emailJSON" :changedAllInfoSecond="changedAllInfoSecond" class="wrapper-inner__link">
                            {{ changeTitle.btnText }} 
                        </router-link>
                    </div>
                </div>
                <img :src="text.image" alt="" class="wrapper-img">
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'Aboutcompany',
    props:{
        emailJSON:{
            typeof:Array
        },
        changedAllInfoSecond: {
            typeof: Function
        },
        areSelectVisible:{
            typeof: Function
        },
    },
    data () {
        return {
            en:{
                title: 'About Us',
                btnText: 'Read more' 
            },
            ru:{
                title: 'О Компании',
                btnText: 'Узнать подробнее' 
            }
            
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    filters:{
        truncate: function(value){
            if(value && value.length > 20){
                value = value.substring(0, 100) + '...';
            }
            return value
        }
    }
}
</script>

