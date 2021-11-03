import './styles.css'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Portfolio from './pages/Portfolio'
import Charts from './pages/Charts'
import CoinInfo from './modules/CoinInfo'
import Newsfeed from './pages/Newsfeed'
import { useState, useEffect } from 'react'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import { fetchCoinMarketData, fetchCoinList } from './pages/fetchData'

const dummyList = ['cardano', 'bitcoin', 'ethereum']

const App = () => {
  const [coinList, setCoinList] = useState([])
  const [allMarketData, setAllMarketData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchAllMarketData = async () => {
    let allData = []
    for (let coin of dummyList) {
      const data = await fetchCoinMarketData(coin)
      allData.push(data)
    }
    setAllMarketData(allData)
  }

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const coinList = await fetchCoinList()
        setCoinList(coinList)
        await fetchAllMarketData()
        setIsLoaded(true)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSample()
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
        <Switch>
          <Route exact path="/">
            <Home
              coinList={coinList}
              allMarketData={allMarketData}
              isLoaded={isLoaded}
            />
          </Route>
          <Route exact path="/watchlist">
            <Watchlist />
          </Route>
          <Route exact path="/portfolio">
            <Portfolio />
          </Route>
          <Route exact path="/charts">
            <Charts />
          </Route>
          <Route path="/coin/:name">
            <CoinInfo />
          </Route>
          <Route exact path="/news">
            <Newsfeed />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  )
}

export default App
