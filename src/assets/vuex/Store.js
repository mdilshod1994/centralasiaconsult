import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";



var config = require('../../../config/prod.env')

Vue.use(Vuex);


const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    industries: [],
    services: [],
    feedbacks: [],
    footerSocial: [],
    servicesForSection: [],
    industriesForSection: [],
    partners: [],
    language: [],
    country: [],
    news:[],
  },
  mutations: {
    SET_INDUSTRIES_TO_STATE: (state, industries) => {
      state.industries = industries;
    },
    SET_SERVICES_TO_STATE: (state, services) => {
      state.services = services;
    },
    SET_FEEDBACK_TO_STATE: (state, feedbacks) => {
      state.feedbacks = feedbacks
    },
    SET_FOOTER_SOCIAL_TO_STATE: (state, footerSocial) => {
      state.footerSocial = footerSocial
    },
    SET_SERVICE_FOR_SECTION_TO_STATE: (state, servicesForSection) => {
      state.servicesForSection = servicesForSection
    },
    SET_INDUSTRY_FOR_SECTION_TO_STATE: (state, industriesForSection) => {
      state.industriesForSection = industriesForSection
    },
    SET_PARTNERS_TO_STATE: (state, partners) => {
      state.partners = partners
    },
    SET_LANG_TO_STATE: (state, language) => {
      state.language = language
    },
    SET_COUNTRY_TO_STATE: (state, country) => {
      state.country = country
    },
    SET_NEWS_TO_STATE:(state, news) => {
      state.news = news
    },
  },
  actions: {
    GET_INDUSTRIES_FROM_API({commit}) {
      return axios(config.BASE_URL + 'category', {
        method: "POST",
        data: {
          "entity": "industry"
        }
      })
        .then((industries) => {
          commit('SET_INDUSTRIES_TO_STATE', industries.data);
          return industries;
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_INDUSTRIES_FOR_SECTION_FROM_API({commit}) {
      return axios(config.BASE_URL + 'category', {
        method: "POST",
        data: {
          "entity": "industry"
        }
      })
        .then((industriesForSection) => {
          commit('SET_INDUSTRY_FOR_SECTION_TO_STATE', industriesForSection.data);
          return industriesForSection
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_SERVICE_FOR_SECTION_FROM_API({commit}) {
      return axios( config.BASE_URL + 'category', {
        method: "POST",
        data: {
          "entity": "service"
        }
      })
        .then((servicesForSection) => {
          commit('SET_SERVICE_FOR_SECTION_TO_STATE', servicesForSection.data);
          return servicesForSection
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_FEEDBACKS_FROM_API({commit}) {
      return axios( config.BASE_URL + 'feedbacks', {
        method: "GET"
      })
        .then((feedbacks) => {
          commit('SET_FEEDBACK_TO_STATE', feedbacks.data);
          return feedbacks
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_PARTNERS_FROM_API({commit}) {
      return axios(config.BASE_URL + 'partners', {
        method: "GET"
      })
        .then((partners) => {
          commit('SET_PARTNERS_TO_STATE', partners.data);
          return partners
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_SERVICES_FROM_API({commit}) {
      return axios( config.BASE_URL + 'category', {
        method: "POST",
        data: {
          "entity": "service"
        }
      })
        .then((services) => {
          commit('SET_SERVICES_TO_STATE', services.data);
          return services
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_FOOTER_SOCIAL_FROM_API({commit}) {
      return axios('http://localhost:3000/footerSocialJSON', {
        method: "GET"
      })
        .then((footerSocial) => {
          commit('SET_FOOTER_SOCIAL_TO_STATE', footerSocial.data);
          return footerSocial
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_LANG_FROM_API({commit}) {
      return axios( config.BASE_URL + 'countries', {
        method: "GET",
      })
        .then((language) => {
          commit('SET_LANG_TO_STATE', language.data);
          return language
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_COUNTRY_FROM_API({commit}) {
      return axios(config.BASE_URL +  'country', {
        method: "GET"
      })
        .then((country) => {
          commit('SET_COUNTRY_TO_STATE', country.data);
          return country
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    },
    GET_NEWS_FROM_API({commit}) {
      return axios( config.BASE_URL + 'news', {
        method: "GET"
      })
        .then((news) => {
          commit('SET_NEWS_TO_STATE', news.data);
          return news
        })
        .catch((error) => {
          console.log(error);
          return error
        })
    }

  },
  getters: {
    INDUSTRIES(state) {
      return state.industries
    },
    SERVICES(state) {
      return state.services
    },
    FEEDBACKS(state) {
      return state.feedbacks
    },
    FOOTER_SOCIAL(state) {
      return state.footerSocial
    },
    SERVICES_FOR_SECTION(state) {
      return state.servicesForSection
    },
    INDUSTRIES_FOR_SECTION(state) {
      return state.industriesForSection
    },
    PARTNERS(state) {
      return state.partners
    },
    LANG(state) {
      return state.language
    },
    COUNTRY(state) {
      return state.country
    },
    NEWS(state){
      return state.news
    }
  }
})

export default store
