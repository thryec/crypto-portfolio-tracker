import { useState, useEffect } from 'react'
import rinkeby from '../../rinkeby.js'
import { ethers } from 'ethers'
import { fetchEtherBalance, fetchERC20Balance } from './fetchData'
import Button from '@mui/material/Button'

const Portfolio = (props) => {
  const [ethBalance, setEthBalance] = useState(0)
  const [linkBalance, setLinkBalance] = useState(0)
  const [usdValue, setUsdValue] = useState(0)

  const getEthBalance = async () => {
    const data = await fetchEtherBalance(props.walletAddress)
    const balance = ethers.utils.formatUnits(data.result, 'ether')
    console.log('eth balance:', balance)
    setEthBalance(balance)
  }

  const getLinkBalance = async () => {
    const data = await fetchERC20Balance(
      props.walletAddress,
      rinkeby.linkContractAddress
    )
    const balance = ethers.utils.formatUnits(data.result, 'ether')
    console.log('link balance: ', balance)
    setLinkBalance(balance)
  }

  const getEthPrice = async () => {}

  const getLinkPrice = async () => {}

  const getAllBalances = async () => {
    await getEthBalance()
    await getLinkBalance()
    await getEthPrice()
    await getLinkPrice()
  }

  if (props.walletAddress === null) {
    return <>Please Connect your Metamask Wallet</>
  }
  return (
    <>
      <Button onClick={getAllBalances}>Show Data</Button>
      <h2>Portfolio Value: {usdValue} USD </h2>
      <div>Ethereum Balance: {ethBalance} ETH</div>
      <div>Chainlink Balance: {linkBalance} LINK</div>
    </>
  )
}

export default Portfolio
