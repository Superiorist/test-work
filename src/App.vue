<template>
<div>
  <div v-if="error.length != 0" class="card-error__container">
    {{error}} 
  </div>
  <div>
    <timer :cardList="cardList"/>
  </div>
  <div class="cards-field__container">
    <div class="cards__list">
      <div v-for="card in cardList" :key="card.uid" > 
        <card @click="chooseCard({id: card.uid})"  :card="card" />
      </div>
     </div>
  </div>
 
  <div class="score-main__box">
    <div class="score__container" v-for="item in score">
      <h2 class="score-date__title">{{item.data}}</h2>
      <h2 class="score-time__title">{{item.time}}</h2>
    </div>
  </div>
</div>
</template>


<script>
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import card from './components/card.vue'
import timer from './components/timer.vue'

export default ({
  name: "app",
  components:{
    card,
    timer
  },
  data() {
    return{
      cardList: [],
      trusted: false
    };
  },
  watch: {
    matchedCards: {
       handler(val, oldVal) {
        if(this.matchedCards.length == 1) {
          setTimeout(() => {
            if(this.matchedCards.length == 1) {
              for(let i = 0; i < this.cardList.length; i++) {
                if(this.cardList[i] == this.matchedCards[0]) {
                   this.cardList[i].show = false
                   this.$store.commit('CLEAR_MATCHED')
                }
              }
            }
          }, 5000)
        }
      }, deep: true
    },
    cards () {
      let j = 0
      let k = 0
      for(let i = 0; i < this.cards.length; i++) {
        while(j < 2) {
          this.cardList.push({})
          this.cardList[k].uid = uuidv4();
          this.cardList[k].url = this.cards[i].url
          this.cardList[k].show = false
          j++
          k++
        }
        j = 0
        
      }
      this.cardList = _.shuffle(this.cardList)
    }
  },
  computed: {
    cards() {
        try {
            return this.$store.getters.cards
        }
        catch (e){ console.log(e)}
    },
    score() {
      try {
          return this.$store.getters.score
      }
      catch (e){ console.log(e)}
          
    },
    matchedCards() {
        try {
            return this.$store.getters.matchedCards
        }
        catch (e){ console.log(e)}
    },
     error() {
        try {
            return this.$store.getters.error
        }
        catch (e){ console.log(e)}
    },
  },
  methods: {
    chooseCard (data){
      if(this.matchedCards.length != 2 && !this.trusted) {
        for(let i = 0; i < this.cardList.length; i++) {
          if(this.cardList[i].uid == data.id) {      
            if(this.cardList[i].show == false) {
              this.cardList[i].show = true
              if(this.matchedCards.length < 2) {
                 this.$store.commit('PUSH_MATCHED', this.cardList[i])                  
              }    
              if(this.matchedCards.length == 2) {
                if (this.matchedCards[0].url == this.matchedCards[1].url) {
                  this.$store.commit('CLEAR_MATCHED')
                }
                else {
                  this.trusted = true
                  setTimeout(()=> {
                    for(let i = 0; i < this.cardList.length; i++) {
                      for(let j = 0; j < this.matchedCards.length; j++) {
                        if(this.cardList[i].uid == this.matchedCards[j].uid) {
                          this.cardList[i].show = false
                        }


                      }
                    }
                    this.$store.commit('CLEAR_MATCHED')
                    this.trusted = false
                  },1500)
                }        
              }
            }
          }
        }
      }
    }
  },
  async mounted () {
    this.$store.dispatch('FETCH_CARDS')
  }
})
</script>

<style>
* {
  padding: 0;
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

.card-error__container {
    z-index: 2000;
    background-color: #f95e5e;
    position: fixed;
    width: calc(100% - 1em);
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3em;
    margin: 0.5em;
}
.cards__list {
  margin-top: 3em;
  display: grid;
  grid-template-columns: 6em 6em 6em 6em 6em 6em;
  grid-template-rows: 6em 6em 6em 6em 6em 6em;
  grid-gap: 3em;
  grid-row-gap: 3em;
  justify-content: center;
}
.cards-field__container {
  display: flex;
  justify-content: center;
}
.score-main__box {
  margin-top: 4em;
}
.score__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    align-content: center;
}
.score-date__title {
    border: grey solid 0.1em;
    width: calc(50% - 1em);
    padding: 0.5em;
    height: 3em;
}
.score-time__title {
    border: grey solid 0.1em;
    width: calc(50% - 1em);
    padding: 0.5em;
    height: 3em;
}
</style>
