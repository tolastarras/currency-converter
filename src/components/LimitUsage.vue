<template>
  <div class="conversions">
    <p v-if="hasMore" class="text-white lead limit">{{ limit - count }}</p>
    <p v-else class="text-white lead countdown">
      <countdown />
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Countdown from './Countdown'

export default {
  data () {
    return {
      countdown: '',
      counter: 0
    }
  },
  components: {
    Countdown
  },
  watch: {
    count () {
      if (this.count > 0) {
        const secondsEllapsed = 0
        this.countdown = this.secondsToWait - secondsEllapsed - 1
        this.startCountdown()
      }
    }
  },
  methods: {
    startCountdown () {
      this.counter++
      let timer = setInterval(() => {
        this.countdown--
        console.log('start countdown: ' + this.countdown)

        if (this.countdown < 1) {
          clearInterval(timer)
          this.$store.dispatch('conversions/decrementCount')
        }
      }, 1000)
    }
  },
  computed: {
    ...mapState('conversions', ['count', 'limit', 'timestamp', 'secondsToWait']),
    ...mapGetters('conversions', ['hasMore'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/limit-usage.scss';
</style>
