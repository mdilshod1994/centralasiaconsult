<template>
  <div class="section-partners section-container_partners">
    <div class="container section-container">
      <slick ref="slick" :options="settings" v-if="PARTNERS.data.length > 0" >
        <img class="partners__img" v-for="slide in PARTNERS.data" :key="slide.id" :partners_data="slide"
             :src="slide.image" alt="">
      </slick>
    </div>
  </div>
</template>
<script>

import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Partners',
  components: {
    Slick
  },
  data() {
    return {
      settings: {
          dots: false,
          infinite: true,
          autoplay: true,
          arrows: true,
          speed: 300,
          slidesToShow: 5,
          slidesToScroll: 1,
          responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    arrows:true,
                    
                   }
                },
                {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true,
                    dots: true,
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                     dots: true,
                }
                }
            ]
        },
    }
  },
  computed: {
    ...mapGetters([
      'PARTNERS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PARTNERS_FROM_API'
    ]),
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },

    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
  },
  mounted() {
    this.GET_PARTNERS_FROM_API()
  }

}
</script>
