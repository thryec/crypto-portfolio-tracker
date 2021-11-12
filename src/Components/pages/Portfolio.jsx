import { useState, useEffect } from 'react'
import rinkeby from '../../rinkeby.js'
import { ethers } from 'ethers'
import {
  fetchEtherBalance,
  fetchERC20Balance,
  fetchCoinMarketData,
} from './fetchData'
import Button from '@mui/material/Button'

const Portfolio = (props) => {
  const [ethBalance, setEthBalance] = useState(0)
  const [linkBalance, setLinkBalance] = useState(0)
  const [ethPrice, setEthPrice] = useState(0)
  const [linkPrice, setLinkPrice] = useState(0)
  const [usdValue, setUsdValue] = useState(0)

  const getEthBalance = async () => {
    const data = await fetchEtherBalance(props.walletAddress)
    const balance = ethers.utils.formatUnits(data.result, 'ether')
    const rounded = Math.round(balance * 10) / 10
    console.log('eth balance:', rounded)
    setEthBalance(rounded)
  }

  const getLinkBalance = async () => {
    const data = await fetchERC20Balance(
      props.walletAddress,
      rinkeby.linkContractAddress
    )
    const balance = ethers.utils.formatUnits(data.result, 'ether')
    const rounded = Math.round(balance * 10) / 10
    console.log('link balance: ', rounded)
    setLinkBalance(rounded)
  }

  const getEthPrice = async () => {
    const data = await fetchCoinMarketData('ethereum')
    const ethPrice = data[0].current_price
    setEthPrice(ethPrice)
  }

  const getLinkPrice = async () => {
    const data = await fetchCoinMarketData('chainlink')
    const linkPrice = data[0].current_price
    setLinkPrice(linkPrice)
  }

  const calculateTotalValue = async () => {
    const ethValue = ethBalance * ethPrice
    const linkValue = linkBalance * linkPrice
    const totalValue = ethValue + linkValue
    const rounded = Math.round(totalValue * 10) / 10
    console.log('total: ', rounded)
    setUsdValue(rounded)
  }

  const getAllBalances = async () => {
    await getEthBalance()
    await getLinkBalance()
    await getEthPrice()
    await getLinkPrice()
    await calculateTotalValue()
  }

  if (props.walletAddress === null) {
    return <>Please Connect your Metamask Wallet</>
  }
  return (
    <>
      <Button onClick={getAllBalances}>Show Data</Button>
      <Button onClick={calculateTotalValue}>Get Total</Button>
      <h2>Portfolio Value: {usdValue} USD </h2>
      <div>Ethereum Balance: {ethBalance} ETH</div>
      <div>Ethereum Price: {ethPrice} USD</div>
      <div>Chainlink Balance: {linkBalance} LINK</div>
      <div>Chainlink Price: {linkPrice} USD</div>
    </>
  )
}

export default Portfolio
