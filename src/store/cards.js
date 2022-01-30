export default {
  state: {
    cards: [],
    error:'',
    matchedCards: [],
  },
  getters: {
    cards: s => s.cards,
    error: s => s.error,
    matchedCards: s => s.matchedCards,
  },
  mutations: {
    UPDATE_CARDS(state, data) {
      state.cards = data
      
    },
    UPDATE_ERROR(state, data) {
      state.error = data
      
    },
    CLEAR_MATCHED(state) {
      state.matchedCards = []
    },
    PUSH_MATCHED(state, data) {

      state.matchedCards.push(data)
          
      
    }
  },
  actions: {
    async FETCH_CARDS({dispatch, commit}) {

      const headers = { "X-Api-Key": "58abacd7-59e0-437b-8099-239821381837" };
      await fetch("https://api.thecatapi.com/v1/images/search?limit=18", { headers })
       .then(response => response.json())
       .then(data => {
          commit('UPDATE_CARDS', data)
       })
       .catch((err) => {
        commit('UPDATE_ERROR',err )
         setTimeout(() => {
          commit('UPDATE_ERROR','')
         }, 2000)
         
       })
    },
  },

}
