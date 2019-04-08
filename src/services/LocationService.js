import Api from '@/classes/ApiClientClass'

export default {
  fetchData () {
    const baseUrl = process.env.VUE_APP_GEOIP_API_URL
    const path = `/json/`

    return new Api().client(baseUrl).get(path)
  }
}
