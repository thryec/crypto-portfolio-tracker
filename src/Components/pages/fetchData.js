const API = 'https://api.coingecko.com/api/v3/'
const queries = {
  checkStatus: '/ping',
  coinList: 'coins/list?include_platform=true',
  coinMarketData: 'coins/markets?vs_currency=usd&ids=',
  coinInfo: 'coins/',
  trending: 'search/trending',
}

export const checkStatus = async () => {
  const res = await fetch(API + queries.checkStatus)
  const data = await res.json()
  if (!data) {
    return false
  }
  return true
}

export const fetchCoinList = async () => {
  const res = await fetch(API + queries.coinList)
  const data = await res.json()
  return data
}

export const fetchCoinMarketData = async (coin) => {
  const res = await fetch(API + queries.coinMarketData + coin)
  const data = await res.json()
  return data
}

export const fetchCoinInfo = async (coin) => {
  const res = await fetch(API + queries.coinInfo + coin)
  const data = await res.json()
  return data
}

export const fetchTrendingCoins = async (coin) => {
  const res = await fetch(API + queries.trending)
  const data = await res.json()
  return data
}
