import { createStore } from 'vuex'
import cards from './cards'
import timer from './timer'

export default createStore({
  modules: {
    cards, timer
  }
})
