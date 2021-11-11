import { useState } from 'react'
import { Link } from 'react-router-dom'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'

const CoinRowItem = (props) => {
  const [checked, setChecked] = useState(false)

  const addToWatchlist = (event) => {
    console.log('watchlist button clicked', props.tokenId)
    if (event.target.checked) {
      console.log('is checked ', event.target.checked)
      setChecked(true)
    } else {
      setChecked(false)
      console.log('is not checked ', event.target.checked)
    }

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
          <Checkbox onClick={addToWatchlist} checked={checked} />
        </TableCell>
        <TableCell>{props.mCapRank}</TableCell>
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
