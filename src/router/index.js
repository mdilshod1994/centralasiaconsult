import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main'
import NewsPage from '../pages/News-page'
import ServicePage from '../pages/Service-page'
import Industrypage from '../pages/Industry-page'
import singleNews from '../pages/cart-pages/SingleNews'
import singleService from '../pages/cart-pages/SingleService'
import singleIndustry from '../pages/cart-pages/SingleIndust'
import DashBoard from '../admin-dashbord/Admin-DashBoard'
import Login from '../login/authentication'
import CompanCart from '../pages/About-company'
import NewsPageTest from '../pages/NewsTestPage.vue'
import NotFound from '../pages/error-page/Not-found.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            name: 'Main',
            component: Main
        },
        {
            path:'/about-company',
            name: 'About-Company',
            component: CompanCart,
            props: true
        },
        {
            path:'/news-page',
            name: 'NewsPage',
            component: NewsPage
        },
        {
            path:'/news-page-test',
            name: 'NewsPageTest',
            component: NewsPageTest
        },
        {
            path:'/new/:id',
            name: 'singleNew',
            component: singleNews
        },
        {
            path:'/service-page',
            name: 'Servicepage',
            component: ServicePage
        },
        {
            path:'/service/:id',
            name: 'singleService',
            component: singleService
        },
        {
            path:'/industry-page',
            name: 'Industrypage',
            component: Industrypage
        },
        {
            path:'/industry/:id',
            name: 'singleIndustry',
            component: singleIndustry
        },
        {
            path:'/dashboard',
            name: 'Admin Dashboard',
            component: DashBoard
        },
        {
            path:'/login',
            name: 'Login',
            component: Login
        },
        {
            path:'*',
            component: NotFound
        }
    ]
})
