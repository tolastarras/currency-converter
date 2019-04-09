<template>
  <div class="conversions">
    <p v-if="hasMore" class="text-white lead limit">{{ limit - count }}</p>
    <p v-else class="text-white lead">{{ countdown }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('conversions', ['count', 'limit']),
    ...mapGetters('conversions', ['hasMore'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/limit-usage.scss';
</style>
