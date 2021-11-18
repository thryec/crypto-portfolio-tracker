import './styles.css'
import Home from './pages/Home'
import Watchlist from './pages/Watchlist'
import Portfolio from './pages/Portfolio'
import CoinInfo from './modules/CoinInfo'
import Newsfeed from './pages/Newsfeed'
import { useState, useEffect } from 'react'
import { Route, Link, Routes, Navigate } from 'react-router-dom'
import { checkStatus, fetchCoinMarketData } from './pages/fetchData'
import Button from '@mui/material/Button'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

const coinIDs = ['bitcoin', 'ethereum', 'cardano', 'solana', 'avalanche-2', 'terra-luna']

const App = () => {
  const [allMarketData, setAllMarketData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [watchlist, setWatchlist] = useState([])
  const [walletAddress, setWalletAddress] = useState(null)
  const [isConnected, setIsConnected] = useState('Connect Wallet')

  localStorage.setItem('watchlist', JSON.stringify(watchlist))

  const fetchAllMarketData = async () => {
    let allData = []
    for (let coin of coinIDs) {
      const data = await fetchCoinMarketData(coin)
      allData.push(data)
    }
    setAllMarketData(allData)
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!')
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const myAddress = await signer.getAddress()
      setWalletAddress(myAddress)
      console.log('my address: ', myAddress)
      setIsConnected('Connected')
    } else {
      alert('Please Install Metamask!')
    }
  }

  useEffect(() => {
    const main = async () => {
      if (await checkStatus()) {
        try {
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
          <h2>🏠 Home</h2>
        </Link>
        <Link to="/watchlist">
          <h2>👀 Watchlist</h2>
        </Link>
        <Link to="/portfolio">
          <h2>🧮 Portfolio</h2>
        </Link>
        <Link to="/news">
          <h2>📰 News</h2>
        </Link>
        <Button onClick={connectWallet} variant="contained">
          {isConnected}
        </Button>
      </nav>
      <hr />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                allMarketData={allMarketData}
                isLoaded={isLoaded}
                watchlist={watchlist}
                setWatchlist={setWatchlist}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
          <Route path="/portfolio" element={<Portfolio walletAddress={walletAddress} />} />
          <Route path="/coin/:name" element={<CoinInfo />} />
          <Route path="/news" element={<Newsfeed />} />
        </Routes>
      </main>
    </>
  )
}

export default App
