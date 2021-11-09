import { useContext, useState } from 'react'
import CoinRowItem from './CoinRowItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import WatchlistContext from '../context/WatchlistContext'

const Watchlist = (props) => {
  const [watchlistData, setWatchlistData] = useState([])
  const watchlist = useContext(WatchlistContext)

  console.log('watchlist component:', props.watchlist)

  const watchlistItems = props.watchlist.map((el, key) => {
    return (
      <>
        <CoinRowItem
          key={key}
          tokenName={el[0].name}
          tokenId={el[0].id}
          symbol={el[0].symbol}
          currentPrice={el[0].current_price}
          marketCap={el[0].market_cap}
          mCapRank={el[0].market_cap_rank}
          change24h={el[0].price_change_percentage_24h}
          volume={el[0].total_volume}
          circSupply={el[0].circulating_supply}
          watchlist={props.watchlist}
          setWatchlist={props.setWatchlist}
        />
      </>
    )
  })

  return (
    <>
      <div>
        <h1>Watchlist</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Watchlist</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>24h%</TableCell>
                <TableCell>Market Cap</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Circulating Supply</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{watchlistItems}</TableBody>
          </Table>
        </TableContainer>
        {/* {allCoins} */}
      </div>
    </>
  )
}

export default Watchlist
