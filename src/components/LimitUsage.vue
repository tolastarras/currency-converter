<template>
  <div class="conversions">
    <p v-if="hasMore" class="text-white lead limit">{{ limit - count }}</p>
    <p v-else class="text-white lead countdown">{{ $root.formatTime(countdown) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      countdown: ''
    }
  },
  created () {
    if (this.count > 0) {
      const secondsEllapsed = 0
      // this.countdown = this.$root.tickTock(this.secondsToWait - secondsEllapsed)
      this.countdown = this.secondsToWait - secondsEllapsed - 1
      this.startCountdown()
    }
  },
  methods: {
    startCountdown () {
      let timer = setInterval(() => {
        this.countdown--
        console.log(this.countdown)

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
