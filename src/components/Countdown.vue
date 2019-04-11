<template>
  <div>
    {{ $root.formatTime(countdown) }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      countdown: ''
    }
  },
  created () {
    // this.tickTock()
  },
  methods: {
    tickTock () {
      // in case the user refreshes the page
      const secondsEllapsed = 0
      this.countdown = this.secondsToWait - secondsEllapsed - 1
      let timer = setInterval(() => {
        this.countdown--
        if (this.countdown < 1) {
          clearInterval(timer)
          this.$store.dispatch('conversions/decrementCount')
        }
      }, 1000)
    }
  },
  computed: {
    ...mapState('conversions', ['count', 'limit', 'timestamp', 'secondsToWait'])
  }
}
</script>
