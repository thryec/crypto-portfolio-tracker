import { useState } from 'react'
import CoinRowItem from './CoinRowItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Home = (props) => {
  const [watchlist, setWatchlist] = useState([])
  console.log('Home watchlist: ', watchlist)

  const fetchedData = props.allMarketData.map((el, key) => {
    console.log('coin data:', el)
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
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        />
      </>
    )
  })

  const filterList = props.coinList.filter((el) => !el.name.includes('%'))
  const allCoins = filterList.map((el, key) => {
    return (
      <div key={key}>
        <CoinRowItem tokenName={el.name} tokenId={el.id} />
      </div>
    )
  })

  return (
    <>
      {props.isLoaded ? (
        <div>
          <h1>All Coins</h1>
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
              <TableBody>{fetchedData}</TableBody>
            </Table>
          </TableContainer>

          {/* {allCoins} */}
        </div>
      ) : (
        <h1> Loading... </h1>
      )}
    </>
  )
}

export default Home
