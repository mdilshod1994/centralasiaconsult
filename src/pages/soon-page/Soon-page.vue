<template>
    <div class="soon-page">
        <div class="soon-wrapper">
            <img :src="logoMulk" alt="">
            <h1>
                Мы скоро вернемся с обновлением
            </h1>
            <p>
                Мы готовим улучшения на нашем сайте, <br> чтобы предоставить вам лучший опыт.
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            logoMulk: require('../../../assets/img/header/logo.png')
        }
    }
}
</script>
<style>
    .soon-page{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .soon-wrapper{
        max-width: 800px;
        text-align: center;
        padding: 0 20px;
    }
    .soon-wrapper img{
        margin-bottom: 20px;
        width: 200px;
    }
    .soon-wrapper h1{
        font-size: 35px;
        margin-bottom: 20px;
    }
    .soon-wrapper p{
        font-size: 20px;
    }
</style>