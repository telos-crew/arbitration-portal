export const getUrlParam = (url: string, param: string) => {
  const paramMap = getParamMap(url)
  return paramMap[param]
}

export const getParamMap = (url: string): any => {
  try {
    console.log('getParamMap url: ', url)
    const urlData = new URL(url)
    const params = urlData.search.replace('?', '').split('&')
    const paramMap = {}
    params.forEach(item => {
      const data = item.split('=')
      paramMap[data[0]] = data[1]
    })
    return paramMap
  } catch (err) {
    console.log('getUrlParam err: ', err)
  }
}