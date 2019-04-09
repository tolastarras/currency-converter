<template>
  <div class="conversions">
    <p v-if="limit === 3" class="text-white lead limit">{{ limit }}</p>
    <p v-else class="text-white lead">{{ countdown }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
       limit: 3,
       countdown: '09:38'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/limit-usage.scss';
</style>
