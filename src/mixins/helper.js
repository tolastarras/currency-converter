import LocationService from '@/services/LocationService'

export default {
  methods: {
    formatCountryName (value) {
      if (!value) return
      return value.replace(/(.*)\s\((.*)\)/, '$2 $1').replace(/(.*),(.*)/, '$2 $1')
    },
    isFromCurrency (target) {
      // find parent class of select option
      return target.closest('.form-row').classList.contains('from-currency-js')
    },
    currentDate () {
      const today = new Date()
      const day = (today.getDate() < 10 ? '0' : '') + today.getDate().toString()
      const month = (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1).toString()
      const year = today.getFullYear()

      return year + '-' + month + '-' + day
    }
  },
  getters: {
    async currentLocation () {
      const service = await LocationService.fetchData()
      const data = service.data
      const location = {
        ipv4: data.IPv4,
        city: data.city,
        country_code: data.country_code,
        country_name: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        postal: data.postal,
        state: data.state
      }
      return location
    }
  }
}
