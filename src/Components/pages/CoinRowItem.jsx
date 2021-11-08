import { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const CoinRowItem = (props) => {
  // console.log('CoinRowItem props: ', props)

  const addToWatchlist = () => {
    console.log('watchlist button clicked', props.tokenId)
    props.setWatchlist([...props.watchlist, props.tokenId])
  }

  return (
    <>
      <Link to={'/coin/' + props.tokenId}>
        <tr>
          <td>
            <button onClick={addToWatchlist}>Add</button>
          </td>
          <td>{props.tokenName} </td>|<td> {props.currentPrice} </td>|
          {props.change24h} |{props.marketCap} | {props.volume} |
          {props.circSupply} {props.symbol.toUpperCase()}
        </tr>
      </Link>
    </>
  )
}

export default CoinRowItem
