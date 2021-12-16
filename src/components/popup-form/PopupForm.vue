<template>
    <div class="modal-request" >
        <div class="modal-request-body">
            <form @submit.prevent="submit">
                <img class="close-request" @click="closeModal" :src="closeBtn" alt="">
                <h1>
                    {{ changeTitle.leaveReqForm }}
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
                    <textarea v-model="message" :placeholder="changeTitle.questionReqForm" name="textarea" id="changeTitle." cols="30" rows="10"></textarea>
                </div>
                <button class="btn-request-form" type="submit">{{ changeTitle.btnReqForm }}</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name: '',
            email: '',
            phone: '',
            message: '',
            closeBtn: require('../../assets/img/request/close.png'),
            en:{
                leaveReqForm: 'Leave a request',
                reqTextForm: 'Fill out the application below and we will contact you as soon as possible',
                nameReqForm: 'Name',
                emailReqForm: 'E-Mail',
                telReqForm: 'Telephone Number',
                questionReqForm: 'Your Question',
                btnReqForm: 'Send',
                changeAlertForRequest: 'Your request has been sent successfully',
                changeAlertForRequestError: 'Your request has not been sent'
            }
        }
    },
    computed:{
        changeTitle(){
            return localStorage.getItem('lang') === 'gb-en' ? this.en : this.ru
        }
    },
    methods:{
        closeModal(){
            this.$emit('closeModal')
        },
        async submit() {
            this.$emit('closeModal')
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
            .catch(error =>this.$toaster.error(this.changeTitle.changeAlertForRequestError) );
            this.name = '',
            this.email = '',
            this.phone = '',
            this.message = ''
            
        },
    }
}
</script>

<style>
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
    z-index: 9999;
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
    .close-request{
        top: 10px;
        right: 10px;
    }
}
@media (max-width: 460px){
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
    .btn-request-form{
        margin: 20px auto 0;
    }
}
@media (max-width: 429px){
    .modal-request-body form{
        max-width: 400px;
        padding: 18px 28px;
    }
}
@media (max-width: 375px){
     .modal-request-body form{
        max-width: 350px;
        padding: 18px 28px;
    }
    .modal-request-body form h1{
        width: 200px;
        margin: 0 auto 10px;
    }
}
</style>

