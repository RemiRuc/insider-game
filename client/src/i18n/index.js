import { createI18n } from 'vue-i18n'
import fr from './fr'
import rs from './rs'
import en from './en'

export default createI18n({
    locale: 'fr',
    fallbackLocale: 'fr',
    messages: {fr, rs, en},
  })