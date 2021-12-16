<template>
  <div class="vue-addmin">
    <div id="profile">
      <button @click="loguot()">
        Light
      </button>
      <div class="profile-info">
        <div class="profile-position">
          <h2>
            Mirzoev Dilshod
          </h2>
          <span>
                        Admin
                    </span>
        </div>
        <img :src="imgProfile" alt="">
      </div>
    </div>
    <Tabnav id="admin" :selected="selected" :tabs="['Dashboards', 'Users', 'profile']" @selected="setSelected">
    </Tabnav>
    <Tab id="tab" :isSelected="selected === 'Dashboards'">

    </Tab>
    <Tab id="tab-user" :isSelected="selected === 'Users'" class="tab-user">
      <div class="filter-user">
        <label>
          Search
          <input id="Search" type="search">
        </label>
        <button @click="fadeInAddUser">
          Add New User
        </button>
      </div>
      <div :class="{ active: isActive }" class="modal-user" @click.stop.prevent.self="fadeOutAddUser">
        <div :class="{ active: isActive }" class="modal-wrap">
          <form action="" method="">
            <p class="form-title">
              Add New User
            </p>
            <label>First Name</label>
            <input id="username" v-model="first_name" name="username" placeholder="First Name" required type="text">
            <label>Last Name</label>
            <input v-model="last_name" placeholder="Last Name" required type="text">
            <label>Email</label>
            <input v-model="email" placeholder="email" required type="text">
            <label>Password</label>
            <input v-model="password" placeholder="password" required type="password">
            <label>Status</label>
            <select v-model="role_id" name="hero" size="1">
              <option disabled selected value="0">Select</option>
              <option value="1">Admin</option>
              <option value="2">Editor</option>
              <option value="3">Viewer</option>
            </select>
            <span class="btn-user" @click.prevent="addUser">
                                Add New User
                            </span>
          </form>
        </div>
      </div>
      <div class="card">
        <div class="card-datatable">
          <table class="user-list-table table">
            <thead class="thead-light">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody :key="keyRender" class="tbody-light">
            <tr v-for="(todo, index) in users" :key="todo.id">
              <td> {{ todo.last_name }} {{ todo.first_name }} {{ todo.id }}</td>
              <td>{{ todo.email }}</td>
              <td>{{ todo.role.name }}</td>
              <td>
                <div class="wrapper-butt">
                  <div class="remove-item" @click="removeTodo(todo, index)">
                    Remove
                  </div>
                  <div class="remove-item" @click="EditUser(todo)">
                    Edit
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <div :class="{ active: isEditing }" class="modal-user" @click.stop.prevent.self="fadeOutAddUser">
            <div :class="{ active: isEditing }" class="modal-wrap">
              <form action="" class="form-edit">
                <p class="form-title">
                  Editing User
                </p>
                <label>First Name</label>
                <input v-model="todo.first_name" placeholder="First Name" type="text">
                <label>Last Name</label>
                <input v-model="todo.last_name" placeholder="Last Name" type="text">
                <label>Email</label>
                <input v-model="todo.email" placeholder="email" type="text">
                <label>Status</label>
                <select v-model="todo.role_id" name="hero" size="1">
                  <option disabled selected value="0">Select</option>
                  <option value="1">Admin</option>
                  <option value="2">Editor</option>
                  <option value="3">Viewer</option>
                </select>
                <button class="btn-user" type="submit" @click="doneEdit(todo)">
                  Done Editing
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <paginate
        :click-handler="clickCallback"
        :container-class="'pagination'"
        :margin-pages="2"
        :next-text="'>'"
        :page-class="'page-items'"
        :page-count="totalPage"
        :page-range="2"
        :prev-text="'<'">
      </paginate>

    </Tab>
    <Tab id="profile_tab" :isSelected="selected === 'profile'">
      hello from tab 3 settings
    </Tab>
    <div id="footer">
      footer
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Paginate from 'vuejs-paginate'
import Tabnav from './TabNav.vue'
import Tab from './tab.vue'

Vue.component('paginate', Paginate)

export default {
  components: {
    Tabnav,
    Tab,
    Paginate
  },
  data() {
    return {
      selected: 'Dashboards',
      imgProfile: require('../assets/img/company-cart/bg.png'),
      selectedIndex: null,
      todo: '',
      users: [],
      isEditing: false,
      isActive: false,
      keyRender: 1

    }
  },
  computed: {
    remaining() {
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
  methods: {
    clickCallback(pageNum) {
      axios.get(`https://cacg.web.bobo.tj/api/users?page=${pageNum}`)
        .then((resp) => {
          this.users = resp.data.data
          this.totalPage = resp.meta.last_page
        })
      console.log(pageNum)
    },
    fadeInAddUser() {
      this.isActive = true
    },
    fadeOutAddUser() {
      this.isActive = false
      this.isEditing = false
    },
    addUser() {
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
          if (res.status === 201) {
            this.isActive = false
            console.log('added');

          }
        })
        .catch(function (error) {
          if (error.response) {
            alert('not added')
          }
        })
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.role_id = ''
      this.password = ''
    },
    EditUser(todo) {
      this.todo = todo
      this.isEditing = true
    },
    doneEdit(todo) {
      this.isEditing = false
      axios.put(`https://cacg.web.bobo.tj/api/users/` + todo.id, {
        first_name: todo.first_name,
        last_name: todo.last_name,
        email: todo.email,
        role_id: todo.role_id
      })
        .then((res) => {
          this.users.push(res.data)
        })
    },
    removeTodo(todo, index) {
      const user_ID = window.localStorage.getItem('user_id')
      if (user_ID == todo.id) {
        alert('yoo are admin')
      } else {
        this.users.splice(index, 1)
        axios.delete(`https://cacg.web.bobo.tj/api/users/` + todo.id)
          .then(response => {
            this.users.splice(todo.id)
            console.log('removed', response);
          })
      }
    },
    setSelected(tab) {
      this.selected = tab
    },
    loguot() {
      window.localStorage.removeItem("token")
      this.$router.push("/login")
    }

  },
  mounted() {
    axios.get('https://cacg.web.bobo.tj/api/users')
      .then((resp) => {
        this.users = resp.data.data
        this.totalPage = resp.data.meta.last_page
      })
    const userToken = window.localStorage.getItem("token")
    if (userToken === null) {
      this.$router.push("/login")
    }

  }

}
</script>

<style scoped>
.vue-addmin {
  background: #161d31 !important;
  display: grid;
  min-height: 100vh;
  grid-template-columns: 260px 1fr 1fr 1fr;
  grid-template-rows: 83px 1.5fr 0.2fr;
  grid-template-areas:
    "admin profile profile profile"
    "admin tab tab tab"
    "admin footer footer footer";
  grid-gap: 30px;
  color: #D0D2D6;
}

#admin {
  background: #283046;
  grid-area: admin;
}

#profile {
  display: flex;
  justify-content: space-between;
  background: #283046;
  grid-area: profile;
  padding: 0 15px;
  margin: 20px 30px 0 0;
  border-radius: 6px;
  align-items: center;
}

#tab {
  background: #283046;
  grid-area: tab;
  margin-right: 30px;
  border-radius: 6px;
}

#footer {
  background: #283046;
  grid-area: footer;
  margin-right: 30px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.profile-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.profile-info h2 {
  font-size: 17px;
  font-weight: 600;
}

.profile-position {
  text-align: end;
}

.profile-info img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-left: 15px;
  cursor: pointer;
}

.todo-item,
.toto-list {
  display: flex;
}

.user-list-table {
  width: 100%;

}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.thead-light {
  background: #343D55;
}

.thead-light tr th {
  padding: 12px 20px;
  text-align: start;
  text-transform: uppercase;
  font-size: 0.857rem;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.tbody-light tr td {
  padding: 5px 20px;
}

.wrapper-butt {
  display: flex;
  align-items: center;
}

.remove-item {
  margin: 0 3px;
  cursor: pointer;
}

.filter-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 30px 0;
}

.filter-user input {
  height: 35px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid #d0d2d67a;
  width: 400px;
  outline: none;
  color: #D0D2D6;
  padding: 0 2px 0 10px;
}

.filter-user button {
  border-color: #7367F0 !important;
  background-color: #7367F0 !important;
  color: #FFFFFF !important;
  letter-spacing: 0.5px;
  border-radius: 6px;
  padding: 7px 15px;
  font-size: 17px;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: space-around;
  padding: 10px 15px;
  margin: 20px 20px 20px auto;
  border-radius: 6px;
  background: #161d31;
  width: 170px;

}

.page-items {
  background: #FFFFFF;
  padding: 10px;
  display: block;
}

.btn-user {
  border-color: #7367F0 !important;
  background-color: #7367F0 !important;
  color: #FFFFFF !important;
  letter-spacing: 0.5px;
  border-radius: 6px;
  padding: 7px 15px;
  font-size: 17px;
  margin: 20px 17px 0 !important;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s ease;
}

.btn-user:hover {
  box-shadow: 2px 2px 15px #7367F0;
}

.modal-user-edit,
.modal-user {
  position: fixed;
  top: 0;
  right: -100%;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-wrap-edit,
.modal-wrap {
  position: fixed;
  top: 0;
  right: -100%;
  bottom: 0;
  left: auto;
  margin: 0;
  width: 392px;
  background: #283046;
  transition: 0.4s ease;
}

.modal-user-edit.actived,
.modal-wrap-edit.actived,
.modal-wrap.active,
.modal-user.active {
  right: 0 !important;
}

.modal-wrap form {
  display: flex;
  flex-direction: column;
}

.modal-wrap form label,
.modal-wrap form input,
.modal-wrap form select {
  margin-right: 17px;
  margin-left: 17px;
}

.modal-wrap .form-title {
  width: 100%;
  padding: 10px 17px;
  background: #161D31;
  font-size: 19px;
}

.modal-wrap form label {
  margin: 20px 17px 10px;
  font-size: 18px;
  font-family: inherit;
  font-weight: 300;
}

.modal-wrap form input {
  padding: 10px;
  background: transparent;
  outline: none;
  color: #D0D2D6;
  border: 1px solid #3B4253;
  border-radius: 6px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 300;
}

.modal-wrap form select {
  padding: 10px;
  border-radius: 6px;
  background-color: #283046;
  color: #B4B7BD;
  border-color: #3B4253;
  outline: none;
}

.modal-wrap form select option {
  padding: 20px;
  margin: 10px 0;
  height: 10px;
}


#Search::-webkit-search-cancel-button {
  cursor: pointer;
  -webkit-appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 1px;
  background: #D0D2D6;
}

</style>
