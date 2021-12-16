<template>
    <div>
        <div class="container">
            <div class="login">
                <div class="d-flex col-lg-4 align-items-center auth-bg  ">
                    <div class="col-12 col-sm-8 col-md-6 col-lg-12  mx-auto login-wrapper">
                        <h2 class="card-title font-weight-bold mb-1">Welcome to CACG! 👋</h2>
                        <p class="card-text mb-2">Please sign-in to your account and start the adventure</p>
                        <form class="auth-login-form mt-2" action="" @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label class="form-label" for="email">Email</label>
                                <input class="form-control" type="email" v-model="email" placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <div class="d-flex justify-content-between">
                                    <label for="password">Password</label>
                                </div>
                                <div class="input-group input-group-merge form-password-toggle">
                                    <input class="form-control form-control-merge" type="password" v-model="password" placeholder="Password" />
                                </div>
                            </div>
                            <button class="btn btn-primary btn-block">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
var config = require('../../config/prod.env')

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password:'',
        }
    },
    methods:{
        async handleSubmit() {
           const formLogin = new FormData()
            formLogin.append('email', this.email); 
            formLogin.append('password', this.password)
            axios.post(config.BASE_URL + 'login', formLogin)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user_id', res.data.user_id)
                this.$router.push({path: 'dashboard'})
                window.location.reload()
                return 
            }).catch((err) => {
                console.log(`ошибка : ${err.message}`);
            })
        }
    },
    mounted(){
        axios.get(config.BASE_URL + 'user')
        .then(res =>{
            console.log('data', res.data.data);
        })
    }
}
</script>

<style scoped>
    input:focus{
        box-shadow: 1px 1px 9px #7367F0 !important;
    }
    .login{
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrapper{
        border-radius: 20px;
        border: 1px solid rgb(201, 201, 201);
        box-shadow: 2px 2px 8px #7367F0;
        padding: 45px 50px;
    }
    .form-gr{
        text-align: center;
    }
    .form-gr h3{
        margin-top: 50px;
        margin-bottom: 20px;
        color: #7367F0 ;
    }
    .login-btn{
        display: block;
        margin: 0 auto;
        border: 1px solid rgb(187, 187, 187);
        color: rgb(80, 80, 80);
        background: #b6b1ec ;
        padding: 6px 15px ;
        border-radius: 10px ;
        cursor: pointer;
        transition: ease 0.3s;
    }
    .login-btn:hover{
        box-shadow: 0px 0px 6px #7367F0;
        background: #7367F0 ;
        color: #fff;
    }
    .form-group{
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }
    .form-group label{
        margin-bottom: 10px;
    }
</style>