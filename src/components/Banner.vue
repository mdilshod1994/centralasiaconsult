<template>
  <div class="banner">
    <div class="wrapper-slider-banner">
      <Sliders @prevBtn="prevBtn"  @nextBtn="nextBtn"  >
        <SliderItem v-for="(item, index) in emailJSON[0].sliders" :key="item.id" :index="index" :class="emailJSON[0].sliders.length" :visibleSide=" slidesLen === 1 ? 0 : visibleSide" v-bind:style="{background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('${item.image}')`}">
          <div class="container">
            <div class="offer" :style="'text-align:'+item.text_align">
                <h1 class="offer__title wrapper-inner__title wrapper-inner__title_c apear-enter-active" :class="'wrapper-inner__title_c_'+item.text_align" >
                  {{ item.title }} <br> <span class="offer__subtitle">  {{ item.title_second }} </span>
                </h1>
                <div class="wrapper-images-banner" >
                  <img class="wrapper-images-banner__image apear-images-enter-active" v-for="img in item.photos" :key="img.id" :src="img.image"  alt="">
                </div>
                <p class="offer__text apear-text-enter-active">
                  {{ item.description }}
                </p>
                <div class="offer-wrapper-link__form" @click="showModalForm(item)">
                  <a :href="item.link" class="offer__btn apear-images-enter-active" v-if="item.button_text" >
                    {{ item.button_text }}
                  </a>
                </div>
              </div>
          </div>
        </SliderItem>
      </Sliders>
      <PopupForm :class="{active : modalForm}" @closeModal="closeModal" />
    </div>
  </div>
</template>

<script>

import Sliders from '../components/slider/sliders.vue'
import SliderItem from '../components/slider/sliderItem.vue'
import PopupForm from './popup-form/PopupForm.vue'


export default {
  name: 'Banner',
  props:{
    emailJSON:{
        typeof:Array
    },
    changedAllInfoSecond: {
        typeof: Function
    },
  },
  components:{
    // vCarousel,
    Sliders,
    SliderItem,
    PopupForm
  },
  data () {
    return {
      emailJSON:[],
      visibleSide: 0,
      modalForm: false
    }
  },
  computed:{
    slidesLen(){
      return this.emailJSON[0].sliders.length
    }
  },
  methods: {
    closeModal(){
      this.modalForm = false
    },
    showModalForm(item){
      const currLink = item.link
      console.log('item', item);
      if(currLink === "#request"){
          this.modalForm = true
      }
    },
    nextBtn(){
      if(this.visibleSide >= this.slidesLen - 1){
        this.visibleSide = 0
      }else{
        this.visibleSide++
      }
    },
    prevBtn(){
      if(this.visibleSide <= 0){
        this.visibleSide = this.slidesLen - 1
      }else{
        this.visibleSide--
      }
    }
  },
  mounted() {
    setInterval(()=>{
      let vm = this
      vm.visibleSide = vm.visibleSide + 1;
      if(vm.visibleSide > 1){
        vm.visibleSide = 0
      }
    }, 4000)
  },

}
</script>


