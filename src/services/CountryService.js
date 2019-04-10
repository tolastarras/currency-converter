import Api from '@/classes/ApiClientClass'

export default {
  loadCountriesData () {
    const baseUrl = `https://${process.env.VUE_APP_COUNTRIES_API_URL}`
    const path = '/rest/v2/all?fields=name;flag;currencies'

    return new Api().client(baseUrl).get(path)
  }
}
