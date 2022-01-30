export default {
    state: {
        score: []
    },
    getters: {
        score: s => s.score,
    },
    mutations: {
      UPDATE_SCORE(state, data) {
        state.score.push(data)
      },
    },
  
  
  }
  