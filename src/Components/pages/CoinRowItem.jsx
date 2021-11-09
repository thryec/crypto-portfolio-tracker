import { useState } from 'react'
import { Link } from 'react-router-dom'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

const CoinRowItem = (props) => {
  // console.log('CoinRowItem props: ', props)

  const addToWatchlist = () => {
    console.log('watchlist button clicked', props.tokenId)
    if (props.watchlist.includes(props.tokenId)) {
      return
    } else {
      props.setWatchlist([...props.watchlist, props.tokenId])
    }
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <Button onClick={addToWatchlist}>Add</Button>
        </TableCell>
        <TableCell>
          <Link to={'/coin/' + props.tokenId}>{props.tokenName}</Link>
        </TableCell>
        <TableCell>{props.currentPrice}</TableCell>
        <TableCell>{props.change24h}</TableCell>
        <TableCell>{props.marketCap}</TableCell>
        <TableCell>{props.volume}</TableCell>
        <TableCell>
          {Math.floor(props.circSupply).toLocaleString()}{' '}
          {props.symbol.toUpperCase()}
        </TableCell>
      </TableRow>
    </>
  )
}

export default CoinRowItem
