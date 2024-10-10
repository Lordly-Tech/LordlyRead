export class Cookie {
  cookies: Map<string, Map<string, string>>
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
    this.cookies = new Map(Object.entries(JSON.parse(await this.getter())))
  }

  async save() {
    if (!this.cookies) console.error("在未初始化 Cookie 类前 save")
    await this.setter(JSON.stringify(Object.fromEntries(this.cookies)))
  }

  getDomain(url: string) {
    return url.replace(/https?:\/\//gi, "").split("/")?.[0]
  }

  getKey(url: string, key: string) {
    url = this.getDomain(url)
    return this.cookies.get(url)?.get(key)
  }

  setKey(url: string, key: string, value: string) {
    url = this.getDomain(url)
    if (!this.cookies.has(url)) this.cookies.set(url, new Map())
    this.cookies.get(url).set(key, value)
  }

  getUrl(url: string) {
    url = this.getDomain(url)
    return this.cookies.get(url)
  }

  setUrl(url: string, value: Map<string, string>) {
    url = this.getDomain(url)
    if (!this.cookies.has(url)) this.cookies.set(url, new Map())
    const urlCookie = this.cookies.get(url)
    value.forEach((v, k) => {
      urlCookie.set(k, v)
    })
  }

  setUrlByHeader(url: string, header: string) {
    const value = new Map()
    header.split(";")?.forEach((item) => {
      value.set(item.split("=")[0].trim(), item.split("=")[1].trim())
    })
    this.setUrl(url, value)
  }
}