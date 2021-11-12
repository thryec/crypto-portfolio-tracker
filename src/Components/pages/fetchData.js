import rinkeby from '../../rinkeby'

// Rinkeby API Calls
export const fetchEtherBalance = async (walletAddress) => {
  const res = await fetch(
    `https://api-rinkeby.etherscan.io/api?address=${walletAddress}&apikey=${rinkeby.apiKey}&module=account&action=balance`
  )
  const data = await res.json()
  console.log('rinkeby data: ', data)
  return data
}

export const fetchERC20Balance = async (walletAddress, contractAddress) => {
  const res = await fetch(
    `https://api-rinkeby.etherscan.io/api?address=${walletAddress}&apikey=${rinkeby.apiKey}&contractaddress=${contractAddress}&module=account&action=tokenbalance&tag=latest`
  )
  const data = await res.json()
  console.log('rinkeby data: ', data)
  return data
}

// CoinGecko API Calls
const coingeckoAPI = 'https://api.coingecko.com/api/v3/'

const coinQueries = {
  checkStatus: '/ping',
  coinList: 'coins/list?include_platform=true',
  coinMarketData: 'coins/markets?vs_currency=usd&ids=',
  coinInfo: 'coins/',
  trending: 'search/trending',
  events: 'events',
}

export const checkStatus = async () => {
  const res = await fetch(coingeckoAPI + coinQueries.checkStatus)
  const data = await res.json()
  if (!data) {
    return false
  }
  return true
}

export const fetchCoinList = async () => {
  const res = await fetch(coingeckoAPI + coinQueries.coinList)
  const data = await res.json()
  return data
}

export const fetchCoinMarketData = async (coin) => {
  const res = await fetch(coingeckoAPI + coinQueries.coinMarketData + coin)
  const data = await res.json()
  return data
}

export const fetchCoinInfo = async (coin) => {
  const res = await fetch(coingeckoAPI + coinQueries.coinInfo + coin)
  const data = await res.json()
  return data
}

export const fetchTrendingCoins = async () => {
  const res = await fetch(coingeckoAPI + coinQueries.trending)
  const data = await res.json()
  return data
}

export const fetchEvents = async () => {
  const res = await fetch(coingeckoAPI + coinQueries.events)
  const data = await res.json()
  return data
}
