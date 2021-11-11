const API = 'https://api.coingecko.com/api/v3/'
const queries = {
  checkStatus: '/ping',
  coinList: 'coins/list?include_platform=true',
  coinMarketData: 'coins/markets?vs_currency=usd&ids=',
  coinInfo: 'coins/',
  trending: 'search/trending',
}

export const checkStatus = async () => {
  console.log('checking API status')
  const res = await fetch(API + queries.checkStatus)
  const data = await res.json()
  if (!data) {
    console.log('Server is down')
    return false
  }
  console.log('Server is up')
  return true
}

export const fetchCoinList = async () => {
  console.log('fetching coin list')
  const res = await fetch(API + queries.coinList)
  const data = await res.json()
  return data
}

export const fetchCoinMarketData = async (coin) => {
  console.log('fetching coin market data')
  const res = await fetch(API + queries.coinMarketData + coin)
  const data = await res.json()
  return data
}

export const fetchCoinInfo = async (coin) => {
  console.log('fetching coin market info')
  const res = await fetch(API + queries.coinInfo + coin)
  const data = await res.json()
  return data
}

export const fetchTrendingCoins = async (coin) => {
  console.log('fetching trending coins')
  const res = await fetch(API + queries.trending)
  const data = await res.json()
  return data
}
