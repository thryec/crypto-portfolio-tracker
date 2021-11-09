import { useEffect, useState, useContext } from 'react'
import CoinRowItem from './CoinRowItem'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { fetchCoinMarketData } from './fetchData'
import Button from '@mui/material/Button'

const Watchlist = (props) => {
  const [watchlistData, setWatchlistData] = useState()
  const [dataFetched, setDataFetched] = useState(false)

  console.log('watchlist component:', props.watchlist)

  const fetchWatchlistMarketData = async () => {
    let data = []
    for (let coin of props.watchlist) {
      const newData = await fetchCoinMarketData(coin)
      data.push(newData)
      console.log('fetched data: ', coin, data)
    }
    setWatchlistData(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchWatchlistMarketData()
        // await renderWatchlistData()
        setDataFetched(true)
      } catch (err) {
        console.log('failed to fetch watchlist data with error: ', err)
      }
    }
    fetchData()
  }, [])

  const watchlistItems = watchlistData.map((el, key) => {
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
            <TableBody>
              {dataFetched ? watchlistItems : <h1>Loading...</h1>}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {allCoins} */}
      </div>
    </>
  )
}

export default Watchlist
