import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './translations/en.json'
import ru from './translations/ru.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
    locale: localStorage.getItem('lang'),
    messages: {
        "gb-en": en,
        "tj-ru": ru,
        "kg-ru": ru,
        "uz-ru": ru
    }
    
})

// const loadedLanguages = []

// function setI18nLanguage (lang) {
//     i18n.locale = lang
//     axios.defaults.headers.common['Accept-Language'] = lang
//     document.querySelector('html').setAttribute('lang', lang)
//     return lang
// }

// export function loadLanguageAsync (lang) {
//     if (loadedLanguages.includes(lang)) {
//       if (i18n.locale !== lang) setI18nLanguage(lang)
//       return Promise.resolve()
//     }
//     return axios.get(`/api/lang/${lang}`).then(response => {
//       let msgs = response.data
//       loadedLanguages.push(lang)
//       i18n.setLocaleMessage(lang, msgs.default)
//       setI18nLanguage(lang)
//     })
// }

// // // router.js
// // router.beforeEach((to, from, next) => {
// //   const lang = to.params.lang
// //   loadLanguageAsync(lang).then(() => next())
// // })