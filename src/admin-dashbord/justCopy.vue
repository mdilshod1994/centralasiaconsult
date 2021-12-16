<template>
    <div class="container">
        <h1>Users</h1>
        <button @click="loguot()">
            loguot
        </button>
        <form action="" method="" v-if="!isEditing" @keyup.enter="addUser">
            <input type="text" placeholder="email" v-model="email" >
            <input type="text" placeholder="First Name" v-model="first_name" >
            <input type="text" placeholder="Last Name" v-model="last_name" >
            <input type="password" placeholder="password" v-model="password" >
            <select  v-model="role_id" size="1" name="hero">
                <option value="0" selected disabled>Select</option>
                <option value="1" >Admin</option>
                <option value="2">Manager </option>
            </select>
        </form>
        <form class="form-edit" v-else action="">
            <input type="text" placeholder="email" v-model="todo.email">
            <input type="text" placeholder="First Name" v-model="todo.first_name">
            <input type="text" placeholder="Last Name" v-model="todo.last_name">
            <input type="password" placeholder="password" v-model="todo.password">
            <select  v-model="todo.role_id" size="1" name="hero">
                <option value="0" selected disabled>Select</option>
                <option value="1" >Admin</option>
                <option value="2">Manager </option>
            </select>
            <button type="submit" @click="doneEdit(todo)">
                Done with edit
            </button>
        </form>
        
        
        <hr>
        <div v-for="(todo, index) in users" :key="todo.id" class="toto-list"> 
            <div class="todo-item"  >
                <div class="todo-item-label">
                    {{ todo.first_name }}
                </div>
                <div class="todo-item-label">
                    {{ todo.last_name }}
                </div>
                <div class="todo-item-label">
                    {{ todo.email }}
                </div>
                <div class="todo-item-label">
                    {{ todo.role_id }}
                </div>
                
            </div>
            
            
            <div class="wrapper-butt">
                <div class="remove-item" @click="removeTodo(index)">
                    &times;
                </div>
                <div class="remove-item"  @click="EditUser(todo, index)"> 
                    Edit
                </div>
            </div>
        
        </div>
        <hr>
        <div class="qntty-todo">
            <h3>
                Quantity of lists:
            </h3>
            <span>
                {{ remaining }}
            </span>
        </div>
        <div class="form-modal-asd">
            <div class="form-modal-body-asd">
                
            </div>
        </div>
        <paginate
            :page-count="totalPage"
            :page-range="2"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
        </paginate>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

export default {
    components:{
        Paginate
    },
    name:'Todo',
    data(){
        return{
            selectedIndex:null,
            todo: '',
            users:[],
            isEditing: false
        }
    },
    computed:{
        remaining(){
            return this.users.filter(todo => !todo.completed).length
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
            el.focus()
            }
        }
    },
    methods:{
        clickCallback(pageNum){
            axios.get(`https://cacg.web.bobo.tj/api/users?page=${pageNum}`)
            .then((resp) =>{
                this.users = resp.data.data
                this.totalPage = resp.meta.last_page
            })
            console.log(pageNum)
        },
        addUser(){
            const data = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                role_id: this.role_id,
                password: this.password
            }
            axios.post('https://cacg.web.bobo.tj/api/users', data)
            .then((res) => {
                this.users.push(res.data)
            })
            
        },
        EditUser(todo , index){
            this.todo = todo
            this.selectedIndex = index
            this.isEditing = true
            

        },
        doneEdit(todo){
            this.users.splice(this.selectedIndex, 1, todo)
            this.isEditing = false
            const data = {
                first_name: todo.first_name,
                last_name: todo.last_name,
                email: todo.email,
                role_id: todo.role_id,
                password: todo.password
            }
            axios.put(`https://cacg.web.bobo.tj/api/users/${todo.id}`, data)
            .then((res) => {
                this.users.push(res.data)
            })
        },
        removeTodo(index){
            this.users.splice(index, 1)
        },
        loguot(){
            window.localStorage.removeItem("token")
            this.$router.push("/login")
        }
    },
    mounted(){
        axios.get('https://cacg.web.bobo.tj/api/users')
        .then((resp) =>{
            this.users = resp.data.data
            this.totalPage = resp.data.meta.last_page
            console.log('page', );
        })
        const userToken = window.localStorage.getItem("token")
        if(userToken === null){
            this.$router.push("/login")
        }
    }
    
}
</script>

<style >
.wrapper-butt{
    display: flex;
    align-items: center;
}
    .toto-list{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .remove-item{
        cursor: pointer;
        margin:  0 10px;
    }
    .todo-item{
        display: flex;
        align-items: center;
    }
    .completed{
        text-decoration: line-through;
        color: grey
    }
    .qntty-todo{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .qntty-todo h3{
        margin-right: 15px;
    }
    .todo-item-label{
        margin-right: 20px;
    }
    button{
        color: #fff;
        background: blue;
    }
    /* .wrapper-modal{
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .wrapper-modal.active{
        display: block;
    }
    .wrapper-modal-body{
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
       
    }
    .form-edit{
        width: 500px ;
        height: 300px;
        background: grey;
        padding: 20px 30px;
    } */
.pagination {
}
.page-item {
}

</style>