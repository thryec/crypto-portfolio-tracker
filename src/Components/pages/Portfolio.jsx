import { useState, useEffect } from 'react'
import rinkeby from '../../rinkeby.js'
import { ethers } from 'ethers'
import { fetchEtherBalance, fetchERC20Balance, fetchCoinMarketData } from './fetchData'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const Portfolio = (props) => {
  const [ethBalance, setEthBalance] = useState(0)
  const [linkBalance, setLinkBalance] = useState(0)
  const [ethPrice, setEthPrice] = useState(0)
  const [linkPrice, setLinkPrice] = useState(0)

  const getEthBalance = async () => {
    const data = await fetchEtherBalance(props.walletAddress)
    const balance = ethers.utils.formatUnits(data.result, 'ether')
    const rounded = Math.round(balance * 10) / 10
    setEthBalance(rounded)
  }

  const getLinkBalance = async () => {
    const data = await fetchERC20Balance(props.walletAddress, rinkeby.linkContractAddress)
    const balance = ethers.utils.formatUnits(data.result, 'ether')
    const rounded = Math.round(balance * 10) / 10
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

  const getAllBalances = async () => {
    await getEthBalance()
    await getLinkBalance()
    await getEthPrice()
    await getLinkPrice()
  }

  useEffect(() => {
    // const getData = async () => {
    //   await getAllBalances()
    // }
    // getData()
  }, [])

  if (props.walletAddress === null) {
    return <>Please Connect your Metamask Wallet</>
  }
  return (
    <>
      <Button onClick={getAllBalances}>Show Data</Button>
      <h2>Portfolio Value: {Math.round((ethBalance * ethPrice + linkBalance * linkPrice) * 100) / 100} USD</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>Market Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>ETH</TableCell>
              <TableCell>{ethBalance}</TableCell>
              <TableCell>{ethPrice}</TableCell>
              <TableCell>{Math.round(ethBalance * ethPrice * 100) / 100}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LINK</TableCell>
              <TableCell>{linkBalance}</TableCell>
              <TableCell>{linkPrice}</TableCell>
              <TableCell>{linkBalance * linkPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Portfolio
