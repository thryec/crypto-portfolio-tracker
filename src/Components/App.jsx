import './styles.css'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Portfolio from './pages/Portfolio'
import Charts from './pages/Charts'
import CoinInfo from './modules/CoinInfo'
import Newsfeed from './pages/Newsfeed'
import { useState, useEffect } from 'react'
import { Route, Link, Routes, Navigate } from 'react-router-dom'
import {
  checkStatus,
  fetchCoinMarketData,
  fetchCoinList,
} from './pages/fetchData'

const dummyList = ['bitcoin', 'ethereum', 'cardano']

const App = () => {
  const [coinList, setCoinList] = useState([])
  const [allMarketData, setAllMarketData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [watchlist, setWatchlist] = useState([])

  const fetchInitialData = async () => {
    try {
      const coinList = await fetchCoinList()
      setCoinList(coinList)
    } catch (err) {
      console.log('failed to fetchInitalData with error: ', err)
    }
  }
  const extractIDs = async () => {
    await fetchInitialData()
    console.log('extracting ids...')
    console.log('coinlist: ', coinList)
    let idArr = []
    for (let coin of coinList) {
      console.log('coin: ', coin)
    }
  }
  const fetchAllMarketData = async () => {
    console.log('fetching market data')
    let allData = []
    for (let coin of dummyList) {
      const data = await fetchCoinMarketData(coin)
      allData.push(data)
    }
    setAllMarketData(allData)
    console.log('done fetching market data')
  }

  useEffect(() => {
    const main = async () => {
      if (await checkStatus()) {
        try {
          // await fetchInitialData()
          await extractIDs()
          await fetchAllMarketData()
          setIsLoaded(true)
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('API is down')
      }
    }
    main()
  }, [])

  return (
    <>
      <nav>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/watchlist">
          <h2>Watchlist</h2>
        </Link>
        <Link to="/portfolio">
          <h2>Portfolio</h2>
        </Link>
        <Link to="/charts">
          <h2>Charts</h2>
        </Link>
        <Link to="/news">
          <h2>News</h2>
        </Link>
      </nav>
      <hr />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                coinList={coinList}
                allMarketData={allMarketData}
                isLoaded={isLoaded}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} />}
          />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/coin/:name" element={<CoinInfo />} />
          <Route path="/news" element={<Newsfeed />} />
        </Routes>
      </main>
    </>
  )
}

export default App
