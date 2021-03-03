export default class UrlParser {
    constructor(url) {
      this.url = url;
    }

    get href() {
      return this.url
    }

    get protocol() {
      return this.url.replace(/:\/\/.*/, '')
    }

    get hostname() {
      return this.url.replace(/.*:\/\//, '').replace(/(\/|\?).*/, '')
    }

    get query() {
      return this.url.match(/\?.*/)[0]
    }

    get params() {
      const splited_query = this.query.replace('?', '').split('&')
      return splited_query.reduce((result, val, i) => {
        const vals = val.split('=')
        result[vals[0]] = vals[1]
        return result
      }, {})
    }
}
