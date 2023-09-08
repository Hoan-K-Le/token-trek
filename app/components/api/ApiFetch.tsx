import axios from 'axios'

async function Api(url: string, search: string) {
  const base = 'https://api.coingecko.com/api/v3'
  const fullUrl = `${base}${url}?${search}`
  const fileName = url
    .split('/')
    .filter(s => s)
    .join('.')
  const file = await import(`../DataFile/${fileName}.json`)

  if (process.env.NODE_ENV === 'development') {
    return new Promise((acc, rejected) => {
      setTimeout(() => (acc({ data: file.default }), 1000))
    })
  } else {
    const response = await axios(fullUrl)
    return response
  }
}

export default Api
