import {helper} from "./index"

export class Cookie {
  cookies: Record<string, Record<string, string>>
  getter: () => Promise<string>
  setter: (data: string) => Promise<void>

  constructor(options: {getter: () => Promise<string>; setter: (data: string) => Promise<void>}) {
    const {getter, setter} = options
    this.getter = getter
    this.setter = setter
    this.refresh().then()
  }

  async refresh() {
    if (this.cookies) await this.save()
    this.cookies = JSON.parse(await this.getter())
  }

  async save() {
    if (!this.cookies) console.error("在未初始化 Cookie 类前 save")
    await this.setter(JSON.stringify(this.cookies))
  }

  getKey(url: string, key: string) {
    url = helper.getDomain(url)
    return this.cookies[url]?.[key]
  }

  setKey(url: string, key: string, value: string) {
    url = helper.getDomain(url)
    if (!this.cookies.hasOwnProperty(url)) this.cookies[url] = {}
    this.cookies[url][key] = value
  }

  getUrl(url: string) {
    url = helper.getDomain(url)
    return helper.record2Map(this.cookies[url] ?? {})
  }

  setUrl(url: string, value: Map<string, string>) {
    url = helper.getDomain(url)
    if (!this.cookies.hasOwnProperty(url)) this.cookies[url] = {}
    value.forEach((v, k) => {
      this.cookies[url][k] = v
    })
  }

  getCookieFromHeader(header: string) {
    const value = new Map()
    header.split(";")?.forEach((item) => {
      value.set(item.split("=")[0]?.trim(), item.split("=")[1]?.trim())
    })
    return value
  }

  setUrlByHeader(url: string, header: string) {
    this.setUrl(url, this.getCookieFromHeader(header))
  }
}
