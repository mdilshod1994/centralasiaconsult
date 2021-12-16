<template>
  <div class="footer">
    <div class="container">
      <div class="footer-wrapper">
        <div class="wrapper-footer-logo" v-for="info in emailJSON" :key="info.id">
          <router-link to="/" >
            <img :src="info.logo" alt="">
          </router-link>
        </div>
        <div class="footer-nav">
          <ul class="footer-nav__list" :key="changeTitle" >
            <li v-for="footerMenu in changeTitle" :key="footerMenu.id" class="footer-nav__item">
              <router-link :to="footerMenu.link">
                {{ footerMenu.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-socials">
          <p class="footer-social__text" :key="changeText" >
            {{ changeText.title }}
          </p>
          <ul class="footer-social__list">
            <li v-for="item in emailJSON[0].social_links" :key="item.id"
                class="footer-social__item">
              <a :href="item.link" target="blank" class="footer-social__link">
                <!-- <img src="./img/fb.svg" alt=""> -->
                <img :src="item.image" alt="item.image">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bttm">
      <div class="container">
        <div class="footer-bttm__wrapper">
          <span class="footer-bttm__text">© All right reserved by CACG</span>
          <a href="https://bobo.tj/" class="logo-bobo" >
            <img :src="imgLogoBobo" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
var config = require('../../config/prod.env')

export default {
  name: 'Footer',
  props: {
    emailJSON: {
      typeof: Array
    },
    changedAllInfoSecond:{
      typeof:Function
    }
  },
  data() {
    return {
      emailJSON: [],
      img: require('../assets/img/Logo-footer.png'),
      imgLogoBobo: require('../assets/img/BOBO.svg'),
      en:{
          title: 'Follow us:',
      },
      ru:{
          title: 'следите за нами в соц сетях:',
      },
      footerEnMenuJSON: [
        {
          id: 1,
          title: 'Main',
          link: '/'
        },
        {
          id: 2,
          title: 'Industries',
          link: '/industry-page'
        },
        {
          id: 3,
          title: 'About us',
          link: '/about-company'
        },
        {
          id: 1,
          title: 'Services',
          link: '/service-page'
        },
        {
          id: 2,
          title: 'Contact us',
          link: '/'
        }
      ],
      footerRuMenuJSON: [
        {
          id: 1,
          title: 'Главная',
          link: '/'
        },
        {
          id: 2,
          title: 'Отрасли',
          link: '/industry-page'
        },
        {
          id: 3,
          title: 'О компании',
          link: '/about-company'
        },
        {
          id: 1,
          title: '️Услуги',
          link: '/service-page'
        },
        {
          id: 2,
          title: 'Контакты',
          link: '/'
        }
      ]
    }
  },
  computed:{ 
      changeTitle(){
          return localStorage.getItem('lang') === 'gb-en' ? this.footerEnMenuJSON : this.footerRuMenuJSON
      },
      changeText(){
          return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
      }
  },
  mounted() { 
    axios.get(config.BASE_URL +  `countries`)
        .then( res =>{
            let codeFilter = res.data.data.filter(e => e.name === 'Global')
            this.emailJSON = codeFilter
        })
  }
  
}
</script>
