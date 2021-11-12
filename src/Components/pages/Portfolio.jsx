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
    console.log(data)
  }

  const getLinkBalance = async () => {
    const data = await fetchERC20Balance(
      props.walletAddress,
      rinkeby.linkContractAddress
    )
    console.log(data)
  }

  const getAllBalances = async () => {
    await getEthBalance()
    await getLinkBalance()
  }

  if (props.walletAddress === null) {
    return <>Please Connect your Metamask Wallet</>
  }
  return (
    <>
      <Button onClick={getAllBalances}>Show Data</Button>
      <h2>Portfolio Value: {usdValue} ETH</h2>
      <div>Ethereum Balance: {ethBalance} LINK</div>
      <div>Chainlink Balance: {linkBalance}</div>
    </>
  )
}

export default Portfolio
