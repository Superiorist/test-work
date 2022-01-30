<template>
  <div class="timer_counter">
      <h1> {{time}} </h1>
      <button v-if="time == '00:00:00.000'" @click="start">Начать</button>
  </div>
</template>
<script>
export default {
    props: {
        cardList: Array
    },
    watch: {
        cardList: {
            handler(val, oldVal) {
              
                let amountShown = 0
                for(let i = 0; i < this.cardList.length; i++) {
                    if(this.cardList[i].show) {
                        amountShown++
                    }
                }
                if(amountShown ==36) {
                    this.$store.commit('UPDATE_SCORE', {time: this.time, data: new Date()})
                    this.stop()
                    
                }
            }, deep: true
        }
    },
    data () {
        return{
            time: '00:00:00.000',
            timeBegan: null,
            timeStopped: null,
            stoppedDuration: 0,
            started: null,
            running: false,
            clock:{}
        }
    },
    methods:{
        reset() {
            this.running = false;
            clearInterval(this.started);
            this.stoppedDuration = 0;
            this.timeBegan = null;
            this.timeStopped = null;
            this.time = "00:00:00.000"
        },
        start() {
            if(this.running) return;
            
            if (this.timeBegan === null) {
                this.reset();
                this.timeBegan = new Date();
            }

            if (this.timeStopped !== null) {
                this.stoppedDuration += (new Date() - this.timeStopped);
            }

            this.started = setInterval(this.clockRunning, 10);	
            this.running = true;
        },
        clockRunning(){
            var currentTime = new Date()
            , timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
            , hour = timeElapsed.getUTCHours()
            , min = timeElapsed.getUTCMinutes()
            , sec = timeElapsed.getUTCSeconds()
            , ms = timeElapsed.getUTCMilliseconds();

            this.time = 
                this.zeroPrefix(hour, 2) + ":" + 
                this.zeroPrefix(min, 2) + ":" + 
                this.zeroPrefix(sec, 2) + "." + 
                this.zeroPrefix(ms, 3);
            },

        zeroPrefix(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        stop() {
            this.running = false;
            this.timeStopped = new Date();
            this.time = '00:00:00.000'
            clearInterval(this.started);
        }
    },
}
</script>

<style>
.timer_counter {
    margin-top: 1.5em
}
</style>