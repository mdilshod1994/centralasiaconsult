<template>
    <div class="section-single-industry">
        <IndexAdd :changedAllInfoSecond="changedAllInfoSecond" :emailJSON="emailJSON"/>
        <div class="container container_card-padding">
            <div class="wrapper-single-ind" >
                <div class="wrapper-ind-imgs">
                    <img :src="require('../../assets/img/singleIndustry/1.png')" class="first" alt="">
                    <img :src="singleIndustryData.image" class="second" alt="">
                </div>
                <div class="wrapper-ind-content">
                    <h2 class="wrapper-ind__title">
                        {{ singleIndustryData.title }}
                    </h2>
                    <p class="wrapper-ind__text">
                        {{ singleIndustryData.description }}
                    </p>
                </div>
            </div>
        </div>
        <Footer  :emailJSON="emailJSON"/>
    </div>
</template>

<script>
import IndexAdd from '../../components/index-add.vue'
import Footer from '../../components/Footer.vue'
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios'
var config = require('../../../config/prod.env')


export default{
    name:'News',
    props:{
        singleIndustryData:{
            typeof: Array,
        },
        emailJSON:{
            typeof:Array
        },
        changedAllInfo: {
            typeof: Function
        },
    },
    components:{
        IndexAdd,
        Footer
    },
  
    data(){
        return{
            id: this.$route.params.id,
            singleIndustryData:[]
        }
    },
    computed:{
        ...mapGetters([
            'LANG'
        ])
    },
    methods:{
        ...mapActions([
            'GET_LANG_FROM_API'
        ]),
        changedAllInfoSecond(el){
            let codeFilterSecond = this.LANG.data.filter(e => e.code === el.code)
            this.emailJSON = codeFilterSecond
            this.areSelectVisible = false
            localStorage.setItem('lang', el.code);
            this.$router.push("/")
            console.log()
        }
    },
    mounted(){
        this.GET_LANG_FROM_API();
          axios.get(config.BASE_URL + `countries`)
        .then( res =>{
            let codeFilter = res.data.data.filter(e => e.name === 'Global')
            this.emailJSON = codeFilter
        })
        axios.get(config.BASE_URL + `countries`)
            .then( res =>{
                let codeFilter = res.data.data.filter(e => e.code === localStorage.getItem('lang'))
                this.emailJSON = codeFilter
            })

       
        
        let entityIndustry = {"entity": "industry"}

        
        axios.get(config.BASE_URL + `category/${this.$route.params.id}`, entityIndustry)
        .then(response => {
            this.singleIndustryData = response.data.data
            console.log('data', this.singleIndustryData);
        })
        .catch(e => {
            this.errors.push(e)
        })  
    }
    
  
    
}
</script>

<style scoped>
    .container_card-padding{
        padding: 160px 70px;
    }
    .wrapper-single-ind{
       
        display: flex;
        justify-content: space-between;
        max-width: 100%;
    }
    .wrapper-ind-imgs{
        position: relative;
        width: 37%;
        height: 620px;
    }

    .wrapper-ind-imgs img{
        position: absolute;
    }

    .wrapper-ind-imgs .first{
        width: 350px;
        right: 0;
        top: 0;
        filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25));
    }
    .wrapper-ind-imgs .second{
        left: 0;
        bottom: 0;
    }
    .wrapper-ind-content{
        max-width: 55%;
    }
    .wrapper-ind__title{
        font-size: 36px;
        position: relative;
        padding-bottom: 18px;
        margin-bottom: 21px;
    }
    .wrapper-ind__title::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        background: #FF6501;
        width: 73px;
        height: 4px;
    }
    @media (max-width: 1280px){
        .wrapper-ind-imgs{
            height: 400px;
        }
        .wrapper-ind-imgs .first{
            width: 239px;
        }
        .second{
            max-width: 70%;
        }
        .container_card-padding{
            padding: 70px;
        }
    }
    @media (max-width: 992px){
        .container_card-padding{
            padding: 70px 0;
        }
        .wrapper-ind__title{
            font-size: 28px;
        }
        .wrapper-ind-imgs{
            height: 350px;
        }
        .wrapper-ind-imgs .first{
            width: 197px;
        }
    }
    @media (max-width: 768px){
        .container_card-padding{
            padding: 70px 15px;
        }
        .wrapper-ind-imgs{
            height: 259px;
        }
        .wrapper-ind-imgs .first{
            width: 126px;
        }
        .wrapper-ind__title{
            font-size: 16px;
        }
    }
    @media (max-width: 375px){
        .wrapper-ind-imgs{
            height: 191px;
        }
    }

</style>