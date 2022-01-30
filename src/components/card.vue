<template>
  <div class="card__container">    
      <div  v-show="card.show"  class="card-front__img" :style="{backgroundImage:`url(${card.url})`}">
      </div>
      <div  v-show="!card.show" class="card-back__box">
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return { 
            turned: false
        }
    },
    computed: {
      matchedCards() {
            try {
                return this.$store.getters.matchedCards
            }
            catch (e){ console.log(e)}
        },
        cards() {
            try {
                return this.$store.getters.cards
            }
            catch (e){ console.log(e)}
        },
    },
    props:{
        card: Object,
       
    },
}
</script>

<style>
.card__container {
    border: 5px solid #ccc;
    position:relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.card-front__img {
    height: 100%;
    
    background-size: cover;
    background-repeat: no-repeat;
}
.card-back__box {
    height: 100%;
    background-color: blueviolet;
}

</style>