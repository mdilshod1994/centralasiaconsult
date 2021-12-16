<template>
    <div class="request">
        <div class="container">
            <div class="wrapper-request">
                <div class="wrapper-request__content">
                    <h1>
                       {{ changeTitle.title }}
                    </h1>
                    <p>
                        {{ changeTitle.text }}
                    </p>
                </div>
                <button class="btn-req" @click="showModalForm">
                    <div class="wrapper-btns__icons_req">
                        <img class="first-image" :src="firstImg" alt="">
                        <img class="second-image" :src="secondImg" alt="">
                    </div>
                    {{ changeTitle.btnText }}
                </button>
            </div>
        </div>
        <div class="modal-request" :class="{active : isActive}">
            <div class="modal-request-body">
                <form @submit.prevent="submit">
                    <img class="close-request" @click="closeModal" :src="closeBtn" alt="">
                    <h1>
                        {{ changeTitle.leaveReqForm}}
                    </h1>
                    <p>
                        {{ changeTitle.reqTextForm }}
                    </p>
                    <div class="wrapper__request">
                        <input required v-model="name" :placeholder="changeTitle.nameReqForm" type="text">
                    </div>
                    <div class="wrapper__request">
                        <input required v-model="email" :placeholder="changeTitle.emailReqForm" type="email">
                    </div>
                    <div class="wrapper__request">
                        <input required v-model="phone" :placeholder="changeTitle.telReqForm" type="phone">
                    </div>
                    <div class="wrapper__request">
                        <textarea v-model="message" :placeholder="changeTitle.questionReqForm" name="textarea" id="textarea" cols="30" rows="10"></textarea>
                    </div>
                    <button class="btn-request-form" type="submit">{{changeTitle.btnReqForm}}</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(Toaster, {timeout: 5000})


export default {
    data(){
        return{
            firstImg: require('../assets/img/request/1.svg'),
            secondImg: require('../assets/img/request/2.svg'),
            name: '',
            email: '',
            phone: '',
            message: '',
            closeBtn: require('../assets/img/request/close.png'),
            isActive: false,
            en:{
                title: 'Need a consultation?',
                text: 'Please, leave a request and we will contact you soon',
                btnText: 'LEAVE A REQUEST' ,
                leaveReqForm: 'Leave a request',
                reqTextForm: 'Fill out the application below and we will contact you as soon as possible',
                nameReqForm: 'Name',
                emailReqForm: 'E-Mail',
                telReqForm: 'Telephone Number',
                questionReqForm: 'Your Question',
                btnReqForm: 'Send',
                changeAlertForRequest: 'Your request has been sent successfully',
                changeAlertForRequestError: 'Your request has not been sent'
            },
            ru:{
                title: 'Требуется консультация специалиста?',
                text: 'Оставьте заявку и проконсультируем Вас по любому интересующему вопросу',
                btnText: 'Оставить заявку' ,
                leaveReqForm: 'ОСТАВИТЬ ЗАЯВКУ',
                reqTextForm: 'Заполните заявку ниже и мы свяжемся с Вами в ближайшее время',
                nameReqForm: 'ФИО',
                emailReqForm: 'E-Mail',
                telReqForm: 'Номер телефона',
                questionReqForm: 'Ваш вопрос',
                btnReqForm: 'Отправить',
                changeAlertForRequest: 'Ваша заявка успешно отправлено',
                changeAlertForRequestError: 'Ваша заявка не отправлено'
            }
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    methods:{
        async submit() {
            var formdata = new FormData();
            formdata.append("phone", this.phone);
            formdata.append("email", this.email);
            formdata.append("name", this.name);
            formdata.append("message", this.message);

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };
            fetch("https://bobo.tj/api/cacg/sendMessage.php", requestOptions)
            .then(response => {
                response.text()
                this.$toaster.success(this.changeTitle.changeAlertForRequest)
            })
            .catch(error => 
                    this.$toaster.error(this.changeTitle.changeAlertForRequestError)
                );
            this.name = '',
            this.email = '',
            this.phone = '',
            this.message = '',
            this.isActive = false
        },
        showModalForm(){
            this.isActive = true
        },
        closeModal(){
            this.isActive = false
        }
    },
    mounted(){
        
    }
    
}
</script>

<style scoped>
.request{
    background: #FFFFFF;
    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.25);
}
.wrapper-request{
    height: 170px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.wrapper-request__content h1{
    font-size: 29px;
    margin-bottom: 9px;
}
.wrapper-request__content p{
    font-size: 17px;
}
.btn-req{
    width: 287px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.20);
    border-radius: 39px;
    color: #4D4E62;
    font-size: 20px;
    font-weight: 700;
    transition: 0.4s ease-in-out;
}
.wrapper-btns__icons_req{
    position: relative;
    width: 49px;
    height: 21px;
    overflow: hidden;
    margin-right: 5px;
}
.btn-req:hover{
    background: #22223C;
    color: #fff;
}
.first-image,
.second-image{
    position: absolute;
    top: 0;
    transition: 0.4s ease-in-out;
}
.first-image{
    left: 0;
}
.btn-req:hover .first-image{
    right: -100%;
}
.second-image{
    left: -100%;
}
.btn-req:hover .second-image{
    left: 0;
    margin-right: 5px;
}
.modal-request{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.20);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.4s ease-in-out;
    visibility: hidden;
    opacity: 0;
}
.modal-request.active{
    visibility: visible;
    opacity: 1;
}
.modal-request-body form{
    background: #22223C;
    max-width: 693px;
    padding: 30px 70px;
    text-align: center;
    color: #fff;
    position: relative;
}
.modal-request-body form h1{
    color: #fff;
    font-size: 28px;
    padding-bottom: 20px;
    position: relative;
    margin-bottom: 10px;
}
.modal-request-body form h1::after{
    content: '';
    position: absolute;
    bottom: 0;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 107px;
    height: 4px;
    border-radius: 40px;
    background:#FF6501;
}
.modal-request-body form p{
    font-size: 24px;
    margin-bottom: 20px;
}
.wrapper__request{
    width: 100%;
    margin-bottom: 30px;
}
.wrapper__request:last-of-type{
    margin-bottom: 0;
}
.wrapper__request textarea,
.wrapper__request input{
    width: 100%;
    height: 40px;
    padding-left: 25px;
    font-size: 24px;
    outline: none;
    border: none;
}
.wrapper__request textarea{
    height: 120px;
}
.btn-request-form{
    background: transparent;
    border: 2px solid #fff;
    border-radius: 28px;
    font-size: 24px;
    display: block;
    width: 236px;
    margin: 50px auto 0;
    height: 65px;
    color: #fff;
}
.close-request{
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
}
@media (max-width: 1440px){
    .modal-request-body form{
        max-width: 560px;
    }
    .wrapper__request textarea,
    .wrapper__request input{
        height: 30px;
        font-size: 18px;
    }
    .wrapper__request textarea{
        height: 100px;
    }
    .btn-request-form{
        font-size: 21px;
        height: 51px;
        margin: 30px auto 0;
    }
}

@media (max-width: 768px){
    .wrapper-request{
        flex-direction: column;
        text-align: center;
        height: 210px;
        padding: 20px 0;
    }
    .close-request{
        top: 10px;
        right: 10px;
    }
}
@media (max-width: 460px){
    .wrapper-request__content h1{
        font-size: 22px;
    }
    .modal-request-body form{
        max-width: 430px;
    }
    .modal-request-body form h1{
        font-size: 23px;
        padding: 12px;
    }
    .modal-request-body form p{
        font-size: 19px;
        margin-bottom: 16px;
    }
    .wrapper__request{
        margin-bottom: 10px;
    }
    .btn-request-form{
        margin: 20px auto 0;
    }
}
@media (max-width: 429px){
    .wrapper-request{
        padding: 20px 0;
    }
    .wrapper-request__content h1{
        font-size: 20px;
    }
    .modal-request-body form{
        max-width: 400px;
        padding: 18px 28px;
    }
}
@media (max-width: 375px){
    .wrapper-request{
        height: 225px;
    }
    .btn-req{
        height: 50px;
    }
     .modal-request-body form{
        max-width: 350px;
        padding: 18px 28px;
    }
    .close-request{
        top: 10px;
        right: 10px;
    }
    .modal-request-body form h1{
        width: 200px;
        margin: 0 auto 10px;
    }
}

</style>
